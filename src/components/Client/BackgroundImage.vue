<template>
  <div class="BackgroundImage" v-bind:class="{ 'BackgroundImage--Blured': paused }" >
    <transition name="fade">
      <img v-if="even" ref="image1" v-bind:src="url1" class="BackgroundImage-Image" />
    </transition>
    <transition name="fade">
      <img v-if="!even" ref="image2" v-bind:src="url2" class="BackgroundImage-Image" />
    </transition>

    <transition name="fade">
      <img v-if="even" v-bind:src="url1" class="BackgroundImage-ImageMobile"  />
    </transition>
    <transition name="fade">
      <img v-if="!even" v-bind:src="url2" class="BackgroundImage-ImageMobile"  />
    </transition>

    <div class="BackgroundImage-Shadow"></div>
  </div>
</template>

<script>

  import { mapActions, mapGetters, mapState } from 'vuex';

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
    computed: {
      ...mapGetters(['currentPhoto']),
      ...mapState(['paused'])
    },
    methods: {
      ...mapActions(['nextBackgroundPhoto', 'resetBackgroundPresentationInterval'])
    },
    watch: {
      currentPhoto(url) {
        this.even ? this.url2 = url: this.url1 = url;
        this.even = !this.even;
      }
    },
    created() {
      this.resetBackgroundPresentationInterval();
      this.__updateStyleInterval = setInterval(this.calcImageStyles, 10);
    },
    destroyed() {
      clearInterval(this.__updateStyleInterval);
    }
  }

</script>

<style scoped lang="scss">

  @import "../../style/mixins";

  .BackgroundImage {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.BackgroundImage--Blured {
      .BackgroundImage-Image, .BackgroundImage-ImageMobile {
        filter: blur(5px) grayscale(0.5);
      }
    }
  }

  .BackgroundImage-Image {
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    max-width: none;
    max-height: none;
    @include mobile {
      filter: blur(10px) grayscale(0.5);
    }
  }

  .BackgroundImage-ImageMobile {
    @include desktop {
      position: absolute;
      display: none;
    }
    @include mobile {
      position: absolute;
      max-width: 100vw;
      max-height: 100vh;
    }
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
      box-shadow: inset 0 0 250px #000;
    }

  }

</style>
