<template>
  <div id="app">
    <transition name="fade">
      <div v-if="!loaded" class="absolute-fill-container" style="display: flex; justify-content: center; align-items: center;">
        <md-progress-spinner class="md-primary" md-mode="indeterminate"></md-progress-spinner>
      </div>
    </transition>
    <transition name="fade">
      <router-view v-if="loaded" />
    </transition>
  </div>
</template>

<script>

  import { mapState } from 'vuex';

  export default {
    name: 'app',
    computed: mapState(['loaded']),
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
