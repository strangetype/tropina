<template>
  <div id="app">
    <Background>
      <router-view/>
    </Background>
    <MainMenu />
  </div>
</template>

<script>

  import Background from './components/Background.vue';
  import MainMenu from './components/MainMenu.vue';
  import generalStyle from './style/general.scss';

  export default {
    name: 'app',
    components: {
      Background,
      MainMenu,
    },
    created() {
      this.$store.dispatch('loadData');
    }
  }
</script>
