import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
    },
  },

  {
    path: '/zxing/camera',
    name: 'ZxingCameraReaderCode',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/CameraReaderCode/index.vue'
      ),
    meta: {
      title: 'Reader QrCode',
    },
  },
  {
    path: '/zxing/qrcode',
    name: 'ZxingQrcode',
    component: () => import('../views/Qrcode/index.vue'),
    meta: {
      title: 'Create Qrcode',
    },
  },
  {
    path: '/marked',
    name: 'Marked',
    component: () => import('../views/Marked/index.vue'),
    meta: {
      title: 'Marked.js',
    },
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/test.vue'),
    meta: {
      title: 'Test',
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'Contact',
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
