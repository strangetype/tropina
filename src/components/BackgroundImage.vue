<template>
  <div ref="container" class="BackgroundImage" >
    <transition name="fade">
      <img v-if="even" ref="image1"  v-bind:src="url1" class="BackgroundImage-Image" v-bind:style="imageStyle1" />
    </transition>
    <transition name="fade">
      <img v-if="!even" ref="image2" v-bind:src="url2" class="BackgroundImage-Image" v-bind:style="imageStyle2" />
    </transition>
    <div class="BackgroundImage-Shadow"></div>
  </div>
</template>

<script>

  import { mapActions, mapGetters } from 'vuex';

  const { ceil } = Math;

  export default {
    name: 'BackgroundImage',
    data () {
      return {
        url1: '',
        url2: '',
        even: false,
        imageStyle1: {},
        imageStyle2: {},
      }
    },
    computed: mapGetters(['currentPhoto']),
    methods: {
      calcImageStyles() {
        if (this.$refs.image1) this.imageStyle1 = { left: ceil((this.$refs.container.offsetWidth - this.$refs.image1.offsetWidth)/2) + 'px', top: ceil((this.$refs.container.offsetHeight - this.$refs.image1.offsetHeight)/2) + 'px'  };
        if (this.$refs.image2) this.imageStyle2 = { left: ceil((this.$refs.container.offsetWidth - this.$refs.image2.offsetWidth)/2) + 'px', top: ceil((this.$refs.container.offsetHeight - this.$refs.image2.offsetHeight)/2) + 'px'  };
      },
      ...mapActions(['nextBackgroundPhoto', 'startBackgroundPresentation'])
    },
    watch: {
      currentPhoto(url) {
        this.even ? this.url2 = url: this.url1 = url;
        this.even = !this.even;
        this.calcImageStyles();
      }
    },
    created() {
      this.startBackgroundPresentation();
      this.__updateStyleInterval = setInterval(this.calcImageStyles, 10);
    },
    destroyed() {
      clearInterval(this.__updateStyleInterval);
    }
  }

</script>

<style scoped lang="scss">

  @import "../style/mixins";

  .BackgroundImage {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .BackgroundImage-Image {
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    max-width: none;
    max-height: none;
  }

  .BackgroundImage-Shadow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    @include desktop {
      background: -webkit-radial-gradient(transparent 50%,rgba(0,0,0,.3) 75%,rgba(0,0,0,.6) 100%);
      background: radial-gradient(transparent 50%,rgba(0,0,0,.3) 75%,rgba(0,0,0,.6) 100%);
    }

    @include mobile {
      background: rgba(0,0,0,0.5);
    }

  }

</style>
