import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/configs/axios';

import type User from '@/interfaces/user';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null);
    let isSessionVerified = false;

    const loadUser = async () => {
      isSessionVerified = true;
      
      const { data } = await axios.get('users/me');
      user.value = data;
    } 

    const verifySession = async () => {
      if (user.value && !isSessionVerified) {
        try {
          await loadUser();
        } catch {
          user.value = null;
        }
      }
    };

    const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
      try {
        await axios.post(import.meta.env.VITE_APP_URL + '/register', {
          name,
          email,
          password,
          'password_confirmation': passwordConfirmation
        });
        await loadUser();

        return { success: true };
      } catch (error: any) {
        const name = error.response.data.errors?.name || [];
        const email = error.response.data.errors?.email || [];
        const password = error.response.data.errors?.password || [];

        return { success: false, errors: { name, email, password } };
      }
    };

    const login = async (email: string, password: string) => {
      try {
        await axios.post(import.meta.env.VITE_APP_URL + '/login', { email, password });
        await loadUser();

        return { success: true };
      } catch (error) {
        return { success: false, error: error };
      }
    };

    const loginOAuth = async (provider: string) => {
      const { data } = await axios.get(import.meta.env.VITE_APP_URL + `/authorize/${provider}/redirect`);

      if (data.redirect) {
        location.href = data.redirect;
      }
    };

    const loginOAuthCallback = async (provider: string, code: string) => {
      try {
        await axios.get(import.meta.env.VITE_APP_URL + `/authorize/${provider}/callback`, {
          params: { code },
        });
        await loadUser();

        return { success: true, message: 'success' };
      } catch (error) {
        return { success: false, message: 'error' };
      }
    };

    const logout = async () => {
      await axios.post(import.meta.env.VITE_APP_URL + '/logout');
      user.value = null;

      location.reload();
    };

    return {
      user,
      verifySession,
      register,
      login,
      loginOAuth,
      loginOAuthCallback,
      logout,
    };
  },
  { persist: true },
);
