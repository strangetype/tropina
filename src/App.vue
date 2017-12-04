<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'app',
    created() {
      this.$store.dispatch('loadData');
    }
  }
</script>

<style lang="scss">
  #app {
    overflow: hidden;
  }
</style>
