import { createRouter, createWebHistory } from 'vue-router';
import AdminLogin from '@/views/admin/AdminLogin.vue';
import AdminHome from '@/views/admin/AdminHome.vue';
import AdminRequests from '@/views/admin/AdminRequests.vue';
import AdminCategories from '@/views/admin/AdminCategories.vue';
import StaffSignup from '@/views/staff/StaffSignup.vue'
import StaffSignin from '@/views/staff/StaffSignin.vue'
import StaffHome from '@/views/staff/StaffHome.vue'


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
    path: '/staff/home',
    name: 'StaffHome',
    component: StaffHome
  },
  // Other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;