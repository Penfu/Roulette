import { createRouter, createWebHistory, type RouteLocation } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const lazyLoad = (view: string) => {
  return () => import(`../views/${view}.vue`);
};

const auth = (to: RouteLocation, from: RouteLocation, next: any) => {
  const auth = useAuthStore();
  return auth.user ? next() : next({ name: 'login' });
}

const guest = (to: RouteLocation, from: RouteLocation, next: any) => {
  const auth = useAuthStore();
  return !auth.user ? next() : next({ name: 'home' });
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      meta: { title: '404' },
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
      meta: { title: 'Leaderboard' },
      component: lazyLoad('LeaderboardView'),
    },
    {
      path: '/profile/:name',
      name: 'profile',
      meta: { title: 'Profile' },
      props: true,
      component: lazyLoad('ProfileView'),
    },
    {
      path: '/settings/:tab(game)?',
      name: 'settings',
      meta: { title: 'Settings' },
      props: true,
      beforeEnter: auth,
      component: lazyLoad('SettingsView'),
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: 'Login' },
      beforeEnter: guest,
      component: lazyLoad('LoginView'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: 'Register' },
      beforeEnter: guest,
      component: lazyLoad('RegisterView'),
    },
    {
      path: '/authorize/:provider(github|google)/callback',
      name: 'oauth',
      meta: { title: 'OAuth' },
      props: true,
      beforeEnter: guest,
      component: lazyLoad('OAuthView'),
    },
    {
      path: '/terms',
      name: 'terms',
      meta: { title: 'Terms' },
      component: lazyLoad('TermsView'),
    },
    {
      path: '/privacy',
      name: 'privacy',
      meta: { title: 'Privacy' },
      component: lazyLoad('PrivacyView'),
    },
  ],
});

router.beforeEach( async (to, from, next) => {
  document.title = to.meta.title ? `Roll • ${to.meta.title}` : 'Roll';

  await useAuthStore().verifySession();

  next();
});

export default router;
