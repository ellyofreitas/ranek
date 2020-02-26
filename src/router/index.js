import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// import Product from '../views/Product.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('@/views/Product.vue'),
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/user',
    component: () => import('@/views/User/User.vue'),
    meta: {
      isPrivate: true,
    },
    children: [
      {
        path: '',
        name: 'user',
        component: () => import('@/views/User/UserProducts.vue'),
      },
      {
        path: 'purchases',
        name: 'purchases',
        component: () => import('@/views/User/UserPurchases.vue'),
      },
      {
        path: 'edit',
        name: 'user-edit',
        component: () => import('@/views/User/UserEdit.vue'),
      },
      {
        path: 'sales',
        name: 'sales',
        component: () => import('@/views/User/UserSales.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
});

router.beforeEach((to, from, next) => {
  const isPrivate = to.matched.some(record => record.meta.isPrivate);
  const isAuthenticated = localStorage.token && true;

  if (isPrivate) {
    if (!isAuthenticated) {
      next({ name: 'login' });
    } else {
      next();
    }
  }

  next();
});

export default router;
