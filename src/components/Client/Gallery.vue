<template>
  <div class="Gallery md-row absolute-fill-container">
    <div class="Gallery-PhotoContainer">
      <img class="Gallery-Photo" v-bind:src="photo"  />
      <transition name="fade">
        <img class="Gallery-PhotoSecondary" v-bind:src="photo" :key="photo" />
      </transition>
      <div class="Gallery-ArrowLeft" v-on:click="previous" v-show="showPreviousButton">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="Gallery-ArrowRight" v-on:click="next" v-show="showNextButton">
        <i class="fa fa-angle-right"></i>
      </div>
      <div class="Gallery-MiniBar">
        <div class="Galery-MiniPhotosContainer" ref="miniPhotosContainer">
          <div class="Gallery-MiniPhoto" v-for="(miniPhoto, index) in miniPhotos" v-on:click="set(index)" v-bind:class="{ 'Gallery-MiniPhoto--Active': index === selectedIndex }" >
            <img class="Gallery-MiniPhotoImg" v-bind:src="miniPhoto" />
            <div class="Gallery-MiniPhotoShadow"></div>
          </div>
        </div>
        <div class="Gallery-MiniBarLeftArrow" v-on:click="scrollLeft" ><i class="fa fa-angle-left"></i></div>
        <div class="Gallery-MiniBarRightArrow" v-on:click="scrollRight" ><i class="fa fa-angle-right"></i></div>
      </div>
    </div>
    <router-link class="Gallery-Close" :to="{ name: 'main' }">
      <i class="fa fa-times"></i>
    </router-link>
  </div>
</template>

<script>

  import { mapState, mapActions, mapGetters } from 'vuex';
  import { get } from 'lodash';

  export default {
    name: 'Gallery',
    computed: {
      ...mapState({
        miniPhotos: state => get(state, 'categories[0].miniPhotos') || [],
        selectedIndex: 'galleryPhotoIndex'
      }),
      ...mapGetters({ photo: 'galleryPhoto' }),
      showPreviousButton() {
        return this.selectedIndex > 0;
      },
      showNextButton() {
        return this.selectedIndex < this.miniPhotos.length - 1;
      }
    },
    methods: {
      ...mapActions({
        next: 'nextGalleryPhoto',
        previous: 'previousGalleryPhoto',
        set: 'setGalleryPhoto'
      }),
      scrollLeft() {
        this.scroll(-1);
      },
      scrollRight() {
        this.scroll(1);
      },
      scroll(speed) {
        let iteration = 0;
        const interval = setInterval(()=> {
          this.$refs.miniPhotosContainer.scrollLeft += speed;
          iteration++;
          if (iteration>100) clearInterval(interval);
        },1);
      }
    }
  }

</script>

<style lang="scss">

  @import "../../style/mixins";

  $minibar-size-desktop: 100px;
  $minibar-size-mobile: 50px;

  .Gallery {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.8);
    .Gallery-PhotoContainer {
      position: relative;
    }
    .Gallery-Photo, .Gallery-PhotoSecondary {
      max-width: 100vw;
      max-height: 100vh;
      @include desktop {
        padding-bottom: $minibar-size-desktop;
      }
      @include mobile {
        padding-bottom: $minibar-size-mobile;
      }
    }
    .Gallery-Photo {
      visibility: hidden;
    }
    .Gallery-PhotoSecondary {
      position: absolute;
      top: 0;
    }
    .Gallery-MiniBar {
      position: absolute;
      overflow: hidden;
      bottom: 0;
      left: 0;
      width: 100%;
      @include desktop {
        height: $minibar-size-desktop;
      }
      @include mobile {
        height: $minibar-size-mobile;
      }
    }
    .Galery-MiniPhotosContainer {
      width: 100%;
      height: 100%;
      @include mobile {
        overflow-x: scroll;
        overflow-y: hidden;
        @include scrollbars(5px, rgba(255,255,255,.2), rgba(0,0,0,.2));
      }
      @include desktop {
        overflow: hidden;
      }
      display: flex;
      flex-direction: row;
    }
    .Gallery-MiniPhoto {
      position: relative;
      flex-shrink: 0;
      padding: 2px 1px;
      transition: background .3s;
      background: transparent;
      @include desktop {
        width: $minibar-size-desktop;
        height: $minibar-size-desktop;
      }
      @include mobile {
        width: $minibar-size-mobile;
        height: $minibar-size-mobile;
      }
      &:hover, &.Gallery-MiniPhoto--Active {
        .Gallery-MiniPhotoShadow {
          opacity: 0;
        }
      }
    }
    .Gallery-MiniPhotoShadow, .Gallery-MiniPhotoImg {
      width: 100%;
      height: 100%;
    }
    .Gallery-MiniPhotoShadow {
      position: absolute;
      left: 0; top: 0;
      background: #000;
      opacity: 0.2;
      transition: opacity .3s;
    }
    .Gallery-Close {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 32px;
      opacity: .3;
      &:hover {
        opacity: 1;
      }
      @include mobile {
        display: none;
      }
      color: #fff!important;
      padding: 1em;
      transition: opacity .3s;
    }
    .Gallery-MiniBarLeftArrow, .Gallery-MiniBarRightArrow {
      position: absolute;
      bottom: 0;
      color: #aaa;
      text-align: center;
      padding: .25em .5em;
      background: rgba(0,0,0,.5);
      cursor: pointer;
      transition: color .3s;
      font-size: 32px;
      @include mobile {
        display: none;
      }
      &:hover {
        color: #fff;
      }
    }
    .Gallery-MiniBarLeftArrow {
      left: 0;
    }
    .Gallery-MiniBarRightArrow {
      right: 0;
    }
    .Gallery-ArrowLeft, .Gallery-ArrowRight {
      position: absolute;
      min-width: 30%;
      height: 100%;
      top: 0;
      color: #fff;
      font-size: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1em;
      opacity: 0;
      transition: opacity .3s;
      cursor: pointer;
      @include mobile {
        opacity: 0;
      }
      &:hover {
        @include desktop{
          opacity: 1;
        }
      }
    }
    .Gallery-ArrowLeft {
      left: 0;
      text-align: left;
    }
    .Gallery-ArrowRight {
      right: 0;
      text-align: right;
    }
  }

</style>
