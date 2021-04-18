import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenu from '../utils';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import Register from '../views/layout/Register.vue';
import ChangePwd from '../views/layout/ChangePwd.vue';
import ChangeInfo from '../views/layout/ChangeInfo.vue';
import ChangeCategory from '../views/layout/ChangeCategory.vue';

Vue.use(VueRouter);

const asyncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    icon: 'inbox',
    hidden: false,
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      icon: 'unordered-list',
      hidden: false,
    },
    component: () => import('@/views/page/productList.vue'),
  },
  {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '添加商品',
      icon: 'file-add',
      hidden: false,
    },
    component: () => import('@/views/page/productAdd.vue'),
  },
  {
    path: 'edit/:id',
    name: 'ProductEdit',
    meta: {
      title: '编辑商品',
      icon: 'file-add',
      hidden: true,
    },
    component: () => import('@/views/page/productAdd.vue'),
  },
  {
    path: 'categoryAdd',
    name: 'CategoryAdd',
    meta: {
      title: '新增类目',
      icon: 'project',
      hidden: false,
    },
    component: () => import('@/views/page/categoryAdd.vue'),
  }],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home',
      hidden: false,
    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        icon: 'form',
        hidden: false,
      },
      component: () => import('../views/page/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '注册',
      hidden: true,
    },
  },
  {
    path: '/changePassword',
    name: 'ChangePwd',
    component: ChangePwd,
    meta: {
      title: '修改密码',
      hidden: true,
    },
  },
  {
    path: '/changeInformation',
    name: 'ChangeInfo',
    component: ChangeInfo,
    meta: {
      title: '修改信息',
      hidden: true,
    },
  },
  {
    path: '/changeCatgory',
    name: 'ChangeCategory',
    component: ChangeCategory,
    meta: {
      title: '类目管理',
      hidden: true,
    },
  },
  {
    path: '*',
    redirect: '/',
    meta: {
      title: '',
      hidden: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

let isAddRoutes = false;

router.beforeEach((to, from, next) => {
  if (to.name === 'Home' || to.name === 'Index' || to.name === 'ChangeInfo') {
    if (document.cookie) {
      if (!isAddRoutes) {
        const role = document.cookie.split(';')[1].split('=')[1];
        const menuRoutes = getMenu(role, asyncRouterMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next({ name: 'Login' });
  }
  return next();
});

export default router;
