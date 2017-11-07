<template>
  <div id="app">
    <Background>
      <router-view/>
    </Background>
  </div>
</template>

<script>

  import Background from './components/Background.vue';

  export default {
    name: 'app',
    components: {
      Background
    }
  }
</script>

<style lang="scss">

@import 'style/general.scss';

</style>
