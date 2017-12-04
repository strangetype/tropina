<template>
  <div id="client-app">
    <Background>
      <router-view/>
    </Background>
    <MainMenu />
  </div>
</template>

<script>

  import Background from './Client/Background.vue';
  import MainMenu from './Client/MainMenu.vue';
  import generalStyle from '../style/general.scss';

  export default {
    name: 'Client',
    components: {
      Background,
      MainMenu
    }
  }
</script>
