import Vue from 'vue';
import Router from 'vue-router';
import Client from '../components/Client';
import Admin from '../components/Admin';
import Main from '../components/Client/Main';
import Gallery from '../components/Client/Gallery';
import Contacts from '../components/Client/Contacts';
import Service from '../components/Client/Service';
import Feedbacks from '../components/Client/Feedbacks.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'client',
      redirect: { name: 'main' },
      component: Client,
      children: [
        {
          path: '/main',
          name: 'main',
          component: Main
        },
        {
          path: '/gallery',
          name: 'gallery',
          component: Gallery
        },
        {
          path: '/services',
          name: 'service',
          component: Service
        },
        {
          path: '/contacts',
          name: 'contacts',
          component: Contacts
        },
        {
          path: '/feedbacks',
          name: 'feedbacks',
          component: Feedbacks
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: '/admin/photos',
          name: 'admin.photos'
        },
        {
          path: '/admin/categories',
          name: 'admin.categories'
        }
      ]
    },
  ]
})
