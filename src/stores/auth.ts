import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/configs/axios';

import type User from '@/interfaces/user';

export const useAuthStore = defineStore('auth', () => {
  const user = ref({} as User);

  const isAuth = computed(() => !!user.value.id);
  const loading = computed(() => isAuth.value && !user.value.id);

  const autoLogin = async () => {
    const response = await axios.get('/users/me');
    user.value = response.data;
  };

  autoLogin();

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post('/register', {
        name,
        email,
        password,
      });
      user.value = response.data;

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
      const response = await axios.post('/login', { email, password });
      user.value = response.data;

      return { success: true };
    } catch (error) {
      return { success: false, error: error };
    }
  };

  const loginOAuth = async (provider: string) => {
    const response = await axios.get(`/authorize/${provider}/redirect`);

    if (response.data.redirect) {
      location.href = response.data.redirect;
      return;
    }
  };

  const loginOAuthCallback = async (provider: string, code: string) => {
    try {
      const response = await axios.get(`/authorize/${provider}/callback`, {
        params: { code },
      });
      user.value = response.data;

      return { success: true, message: 'success' };
    } catch (error) {
      return { success: false, message: 'error' };
    }
  };

  const logout = async () => {
    user.value = {} as User;
    await axios.post('/logout');

    location.reload();
  };

  return {
    user,
    isAuth,
    loading,
    register,
    login,
    loginOAuth,
    loginOAuthCallback,
    logout,
  };
});
