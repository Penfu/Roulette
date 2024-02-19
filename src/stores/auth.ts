import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/configs/axios';
import router from '@/router';

import type User from '@/interfaces/user';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null);

    const isPending = ref(false);
    const isGithubPending = ref(false);
    const isGooglePending = ref(false);

    const isSessionVerified = ref(false);

    const loadUser = async () => {
      isSessionVerified.value = true;

      try {
        const { data } = await axios.get('users/me');
        user.value = data;
      } catch {
        user.value = null;
      }
    };

    const verifySession = async () => {
      if (user.value && !isSessionVerified.value) {
        isPending.value = true;

        await loadUser();

        isPending.value = false;
      }
    };

    const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
      try {
        isPending.value = true;

        await axios.post(import.meta.env.VITE_APP_URL + '/register', {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          remember: true,
        });
        await loadUser();

        return { success: true };
      } catch (error: any) {
        const name = error.response.data.errors?.name || [];
        const email = error.response.data.errors?.email || [];
        const password = error.response.data.errors?.password || [];

        return { success: false, errors: { name, email, password } };
      } finally {
        isPending.value = false;
      }
    };

    const login = async (email: string, password: string) => {
      try {
        isPending.value = true;

        await axios.post(import.meta.env.VITE_APP_URL + '/login', {
          email,
          password,
          remember: true,
        });
        await loadUser();

        return { success: true };
      } catch (error) {
        return { success: false, error: error };
      } finally {
        isPending.value = false;
      }
    };

    const loginGithub = async () => {
      isGithubPending.value = true;
      await loginOAuth('github');
    };

    const loginGoogle = async () => {
      isGooglePending.value = true;
      await loginOAuth('google');
    };

    const loginOAuth = async (provider: 'github' | 'google') => {
      isPending.value = true;

      const { data } = await axios.get(import.meta.env.VITE_APP_URL + `/authorize/${provider}/redirect`);

      if (data.redirect) {
        location.href = data.redirect;
      }
    };

    const loginOAuthCallback = async (provider: 'github' | 'google', code: string) => {
      try {
        isPending.value = true;

        await axios.get(import.meta.env.VITE_APP_URL + `/authorize/${provider}/callback`, {
          params: { code },
        });
        await loadUser();

        return { success: true, message: 'success' };
      } catch (error) {
        return { success: false, message: 'error' };
      } finally {
        isPending.value = false;
        isGithubPending.value = false;
        isGooglePending.value = false;
      }
    };

    const logout = async () => {
      isPending.value = true;

      await axios.post(import.meta.env.VITE_APP_URL + '/logout');

      user.value = null;
      isPending.value = false;

      if (router.currentRoute.value.meta.auth) {
        router.push({ name: 'login' });
      }
    };

    return {
      verifySession,
      isPending,
      isGithubPending,
      isGooglePending,
      register,
      login,
      loginGithub,
      loginGoogle,
      loginOAuthCallback,
      logout,
      user,
    };
  },
  { persist: { paths: ['user'] } },
);
