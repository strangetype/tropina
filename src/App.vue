<template>
  <div id="app">
    <Background>
      <router-view/>
    </Background>
  </div>
</template>

<script>

  import Background from './components/Background.vue';
  import generalStyle from './style/general.scss';

  export default {
    name: 'app',
    components: {
      Background
    }
  }
</script>
