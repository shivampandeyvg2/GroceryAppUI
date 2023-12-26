import { createRouter, createWebHistory } from 'vue-router';
import AdminLogin from '@/views/admin/AdminLogin.vue';
import AdminHome from '@/views/admin/AdminHome.vue';
import AdminRequests from '@/views/admin/AdminRequests.vue';
import AdminCategories from '@/views/admin/AdminCategories.vue';
import StaffSignup from '@/views/staff/StaffSignup.vue'
import StaffSignin from '@/views/staff/StaffSignin.vue'
import StaffHome from '@/views/staff/StaffHome.vue'
import UserSignin from '@/views/user/UserSignin.vue'
import UserSignup from '@/views/user/UserSignup.vue'
import UserHome from '@/views/user/UserHome.vue'
import UserCart from '@/views/user/UserCart.vue'


const routes = [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin/home',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/admin/requests',
    name: 'AdminRequests',
    component: AdminRequests
  },
  {
    path: '/admin/categories',
    name: 'AdminCategories',
    component: AdminCategories
  },
  {
    path: '/staff/signup',
    name: 'StaffSignup',
    component: StaffSignup
  },
  {
    path: '/staff/login',
    name: 'StaffSignin',
    component: StaffSignin
  },
  {
    path: '/staff/home/:userid',
    name: 'StaffHome',
    component: StaffHome
  },
  {
    path: '/user/login',
    name: 'UserSignin',
    component: UserSignin
  },
  {
    path: '/user/signup',
    name: 'UserSignup',
    component: UserSignup
  },

  {
    path: '/user/home/:userid',
    name: 'UserHome',
    component: UserHome
  },

  {
    path: '/user/cart/:userid',
    name: 'UserCart',
    component: UserCart
  },
  // Other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;