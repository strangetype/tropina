<template>
  <div class="BackgroundNavigation">
    <div v-on:click="prevBackgroundPhoto" class="BackgroundNavigation-Arrow BackgroundNavigation-Arrow--left"></div>
    <div v-on:click="nextBackgroundPhoto" class="BackgroundNavigation-Arrow BackgroundNavigation-Arrow--right"></div>
  </div>
</template>

<script>

  import { mapActions } from 'vuex';

  export default {
    name: 'BackgroundNavigationArrows',
    methods: mapActions(['nextBackgroundPhoto', 'prevBackgroundPhoto'])
  }
</script>

<style lang="scss" >

  @import "../style/mixins";

  .BackgroundNavigation {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @include desktop {
      align-items: center;
    }

    @include mobile {
      align-items: flex-end;
    }

    .BackgroundNavigation-Arrow {
      display: flex;
      line-height: 1;
      font-size: 50px;
      height: 1em;
      @include desktop {
        margin: 60px;
      }
      @include mobile {
        margin: 20px;
      }
      cursor: pointer;
      color: #ccc;
      text-shadow: 0 0 2px #000;
      transition: text-shadow .5s,color .5s;

      &:hover {
        color: #fff;
        text-shadow: 0 0 10px #fff;
      }
      &:before {
        font-family: consolas;
      }
      &.BackgroundNavigation-Arrow--left {
        @include desktop {
         // margin-left: 80px;
        }
        @include mobile {
         // margin-left: 20px;
        }
        &:before {
          content: '<'
        }
      }
      &.BackgroundNavigation-Arrow--right {
        @include desktop {
          //margin-right: 80px;
        }
        @include mobile {
          //margin-right: 20px;
        }
        &:before {
          content: '>'
        }
      }
    }

  }
</style>
