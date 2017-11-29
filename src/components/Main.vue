<template>
  <div class="Main md-row absolute-fill-container">
    <div class="Main-LogoContainer">
      <div class="Main-Logo">
        <h2 class="Main-Logo-Job">семейный фотограф</h2>
        <h1 class="Main-Logo-Name">Мария Тропина</h1>
        <h3 class="Main-Logo-Caption">подберу ключик к каждому ребенку</h3>
        <img class="Main-Logo-Image" v-bind:src="LOGO_IMAGE_URL" />
      </div>
    </div>
    <BackgroundNavigationArrows />
  </div>
</template>

<script>
  import BackgroundNavigationArrows from './BackgroundNavigationArrows';

  import { LOGO_IMAGE_URL } from '../constants';

  export default {
    name: 'Main',
    data: ()=> {
      return {
        LOGO_IMAGE_URL
      }
    },
    components: {
      BackgroundNavigationArrows
    }
  }
</script>

<style lang="scss" scoped>

  @import "../style/mixins";

  .Main-LogoContainer {
    @include mobile {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
    }
  }

  .Main {

    color: #fff;

    .Main-Logo {
      @include desktop {
        position: absolute;
        right: 60px;
        top: 60px;
      }
      @include mobile {
        padding: 20px;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: Taurus;
      text-shadow: 0 0 2px rgba(0,0,0,.5);
      line-height: 1;
      text-align: center;
    }

    .Main-Logo-Job {
      @include desktop {
        font-size: 20px;
      }
      @include mobile {
        font-size: 10px;
      }
      margin-bottom: 5px;
      font-weight: 400;
      letter-spacing: .1em;
    }

    .Main-Logo-Name {
      @include desktop {
        font-size: 40px;
      }
      @include mobile {
        font-size: 20px;
      }
      margin-bottom: 10px;
      font-weight: 400;
      font-family: Taurus;
    }

    .Main-Logo-Caption {
      @include desktop {
        font-size: 17px;
      }
      @include mobile {
        font-size: 10px;
      }
      margin-bottom: 10px;
      font-weight: 400;
      letter-spacing: .1em;
    }

    .Main-Logo-Image {
      width: 70px;
    }

  }
</style>
