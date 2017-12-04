<template>
  <div class="Background">
    <BackgroundImage />
    <div class="Background-Content">
      <transition name="fade">
        <slot></slot>
      </transition>
    </div>
  </div>
</template>

<script>

import BackgroundImage from './BackgroundImage';

export default {
  name: 'Background',
  data () {
    return {
      data: {}
    }
  },
  components: {
    BackgroundImage
  },
}
</script>

<style lang="scss" scoped>

  .Background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .Background-Content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

  }

</style>
