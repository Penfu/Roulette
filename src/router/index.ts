import { capitalize } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const lazyLoad = (view: string) => {
  return () => import(`../views/${view}.vue`);
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: lazyLoad('NotFoundView'),
    },
    {
      path: '/',
      name: 'home',
      component: lazyLoad('GameView'),
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: lazyLoad('LeaderboardView'),
    },
    {
      path: '/profile/:name',
      name: 'profile',
      props: true,
      component: lazyLoad('ProfileView'),
    },
    {
      path: '/settings/:tab(game)?',
      name: 'settings',
      props: true,
      meta: { auth: true },
      component: lazyLoad('SettingsView'),
    },
    {
      path: '/login',
      name: 'login',
      meta: { guest: true },
      component: lazyLoad('LoginView'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { guest: true },
      component: lazyLoad('RegisterView'),
    },
    {
      path: '/authorize/:provider(github|google)/callback',
      name: 'oauth',
      meta: { guest: true },
      props: true,
      component: lazyLoad('OAuthView'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  // Guards
  if (to.meta.guest && auth.user) {
    return next({ name: 'home' });
  }

  if (to.meta.auth && !auth.user) {
    return next({ name: 'login' });
  }

  // Title
  document.title = to.name ? `Roll • ${capitalize(to.name.toString())}` : 'Roll';

  // Verify session
  await auth.verifySession();

  next();
});

export default router;
