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
      meta: { title: "404" },
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
      meta: { title: "Leaderboard" },
      component: lazyLoad("LeaderboardView"),
    },
    {
      path: "/profile/:name",
      name: "profile",
      meta: { title: "Profile" },
      component: lazyLoad("ProfileView"),
      props: true,
    },
    {
      path: "/settings/:tab(game)?",
      name: "settings",
      meta: { title: "Settings" },
      component: lazyLoad("SettingsView"),
      props: true,
      beforeEnter: [authGuard],
    },
    {
      path: "/login",
      name: "login",
      meta: { title: "Login" },
      component: lazyLoad("LoginView"),
      beforeEnter: [guestGuard],
    },
    {
      path: "/register",
      name: "register",
      meta: { title: "Register" },
      component: lazyLoad("RegisterView"),
      beforeEnter: [guestGuard],
    },
    {
      path: "/authorize/:provider(github|google)/callback",
      name: "oauth",
      meta: { title: "OAuth" },
      component: lazyLoad("OAuthView"),
      props: true,
      beforeEnter: [guestGuard],
    },
    {
      path: "/avatar/editor",
      name: "avatar-editor",
      meta: { title: "Avatar Editor" },
      component: lazyLoad("AvatarEditorView"),
    }
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `Roll • ${to.meta.title}` : "Roll";
  next();
});

export default router;
