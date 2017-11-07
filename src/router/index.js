import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Gallery from '@/components/Gallery';
import Contacts from '@/components/Contacts';
import Service from '@/components/Service';
import Feedbacks from '@/components/Feedbacks';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
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
      path: '/service',
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
    },
  ]
})
