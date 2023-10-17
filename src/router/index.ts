import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/auth";

import NotFoundViewVue from "@/views/NotFoundView.vue";

import LeaderboardView from "@/views/LeaderboardView.vue";
import ProfileView from "@/views/ProfileView.vue";

import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import OAuthView from "@/views/auth/OAuthView.vue";

const lazyLoad = (view: string) => {
  return () => import(`../views/${view}.vue`);
};

const authGuard = (to: any, from: any, next: any) =>
  useAuthStore().isAuth ? next() : next({ name: "login" });
const guestGuard = (to: any, from: any, next: any) =>
  !useAuthStore().isAuth ? next() : next({ name: "home" });

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundViewVue,
    },
    {
      path: "/",
      name: "home",
      component: lazyLoad("GameView"),
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: LeaderboardView,
    },
    {
      path: "/profile/:name?",
      name: "profile",
      component: ProfileView,
      props: true,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: [guestGuard],
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      beforeEnter: [guestGuard],
    },
    {
      path: "/authorize/:provider/callback",
      name: "oauth",
      component: OAuthView,
      props: true,
      beforeEnter: [guestGuard],
    },
  ],
});

export default router;
