import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/configs/axios';

import type User from '@/interfaces/user';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null);
    let isSessionVerified = false;

    const loadUser = (data: User) => {
      user.value = data;
      isSessionVerified = true;
    } 

    const verifySession = async () => {
      if (user.value && !isSessionVerified) {
        isSessionVerified = true;

        try {
          const { data } = await axios.get('users/me');
          loadUser(data);
        } catch {
          user.value = null;
        }
      }
    };

    const register = async (name: string, email: string, password: string) => {
      try {
        const { data } = await axios.post('/register', {
          name,
          email,
          password,
        });
        loadUser(data);

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
        const { data } = await axios.post('/login', { email, password });
        loadUser(data);

        return { success: true };
      } catch (error) {
        return { success: false, error: error };
      }
    };

    const loginOAuth = async (provider: string) => {
      const { data } = await axios.get(`/authorize/${provider}/redirect`);

      if (data.redirect) {
        location.href = data.redirect;
      }
    };

    const loginOAuthCallback = async (provider: string, code: string) => {
      try {
        const { data } = await axios.get(`/authorize/${provider}/callback`, {
          params: { code },
        });
        loadUser(data);

        return { success: true, message: 'success' };
      } catch (error) {
        return { success: false, message: 'error' };
      }
    };

    const logout = async () => {
      await axios.post('/logout');
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
