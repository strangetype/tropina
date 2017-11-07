<template>
  <div class="Main md-row absolute-fill-container">
    <MainMenu />
  </div>
</template>

<script>
  import MainMenu from './MainMenu';

  export default {
    name: 'Main',
    components: {
      MainMenu
    }
  }
</script>

<style lang="scss">
  .Main {
    color: #fff;
  }
</style>
