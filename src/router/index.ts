import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

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
      component: lazyLoad("NotFoundView"),
    },
    {
      path: "/",
      name: "home",
      component: lazyLoad("GameView"),
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: lazyLoad("LeaderboardView"),
    },
    {
      path: "/profile/:name",
      name: "profile",
      component: lazyLoad("ProfileView"),
      props: true,
    },
    {
      path: "/settings/:tab(game)?",
      name: "settings",
      component: lazyLoad("SettingsView"),
      props: true,
      beforeEnter: [authGuard],
    },
    {
      path: "/login",
      name: "login",
      component: lazyLoad("LoginView"),
      beforeEnter: [guestGuard],
    },
    {
      path: "/register",
      name: "register",
      component: lazyLoad("RegisterView"),
      beforeEnter: [guestGuard],
    },
    {
      path: "/authorize/:provider(github|google)/callback",
      name: "oauth",
      component: lazyLoad("OAuthView"),
      props: true,
      beforeEnter: [guestGuard],
    },
  ],
});

export default router;
