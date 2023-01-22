import { createRouter, createWebHistory } from "vue-router";

import NotFoundViewVue from "@/views/NotFoundView.vue";

import LeaderboardView from "@/views/LeaderboardView.vue";
import ProfileView from "@/views/ProfileView.vue";

import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

const lazyLoad = (view: string) => {
  return () => import(`../views/${view}.vue`);
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundViewVue,
    },
    {
      path: "/",
      name: "game",
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
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
  ],
});

export default router;
