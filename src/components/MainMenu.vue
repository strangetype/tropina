<template>
  <div class="MainMenu" v-bind:class="{'MainMenu--Opened': opened, 'MainMenu--Hidden': hidden}">
    <i v-on:click="open"  class="MainMenu-Icon MainMenu-Open fa fa-bars"></i>
    <ul class="MainMenu-Menu">
      <li v-for="item in menu" class="MainMenu-Item" v-bind:class="{'MainMenu-Item--active': item.state === current}" v-on:click="goTo(item)">
        <span >{{item.label}}</span>
        <div class="MainMenu-Separator"></div>
      </li>
      <i class="MainMenu-Pointer fa fa-angle-right" :style="pointerStyle" ></i>
      <i v-on:click="close" class="MainMenu-Icon MainMenu-Close fa fa-angle-left"></i>
    </ul>
  </div>

</template>

<script>

  import { findIndex, find } from 'lodash';

  export default {
    name: 'MainMenu',
    data() {
      return {
        menu: [
          { label: 'Главная', state: 'main' },
          { label: 'Галлерея', state: 'gallery', hidden: true },
          { label: 'Услуги', state: 'service' },
          { label: 'Контакты', state: 'contacts' },
        ],
        opened: false,
        current: 'main',
        hidden: false
      }
    },
    methods: {
      goTo(route) {
        this.close();
        this.$router.push({ name: route.state });
      },
      open() {
        this.opened = true;
      },
      close() {
        this.opened = false;
      }
    },
    computed: {
      pointerStyle() {
        return {
          top: (findIndex(this.menu, {state: this.current})*53.8 + 14) +'px'
        }
      }
    },
    created() {
      this.$router.afterEach(()=> {
        this.current = this.$router.currentRoute.name;
        let currentItem = find(this.menu, { state: this.$router.currentRoute.name });
        currentItem ? this.hidden = currentItem.hidden : this.hidden = false;
      });
    }
  }
</script>

<style lang="scss">

  @import "../style/mixins";

  .MainMenu {

    .MainMenu-Menu {
      position: absolute;
      @include desktop {
        top: 60px;
        left: 60px;
      }

      @include mobile {
        left: -100%;
        top: 0;
        transition: left 0.5s, top 0.5s, opacity 0.5s;
        width: 100%;
        background: #000;
        opacity: 0;
      }

      color: #fff;
    }

    .MainMenu-Item {
      font-size: 15px;
      font-family: Taurus;
      letter-spacing: .1em;
      line-height: 3;
      text-transform: uppercase;
      transition: color .5s,text-shadow .5s;
      cursor: pointer;
      font-weight: 700;
      list-style: none;

      @include mobile {
        width: 100%;
        text-align: center;
      }

      &.MainMenu-Item--active {
        text-shadow: 0 0 10px #fff;
        @include mobile {
          color: #f05;
          text-shadow: 0 0 10px #f05;
        }
      }
      &:hover {
        text-shadow: 0 0 10px #fff;
      }
    }
    .MainMenu-Separator {
      height: 1px;
      @include desktop {
        width: 8em;
        margin-left: -1em;
      }
      @include mobile {
        width: 100%;
        margin-left: 0;
      }
      background: linear-gradient(to right,rgba(255,255,255,0),#fff,rgba(255,255,255,0));
    }

    .MainMenu-Icon {
      position: absolute;
      top: 0;
      color: #fff;
      padding: 20px;
      text-shadow: 0 0 5px #fff;
      @include desktop {
        display: none;
      }
    }

    .MainMenu-Open {
      left: 0;
    }

    .MainMenu-Close {
      left: 0;
    }

    &.MainMenu--Opened {
      .MainMenu-Menu {
        @include mobile {
          left: 0;
          opacity: 1;
        }
      }
    }

    &.MainMenu--Hidden {
      @include desktop {
        display: none;
      }
    }

    .MainMenu-Pointer {
      @include mobile {
        display: none;
      }
      position: absolute;
      transition: top .5s;
      margin-left: -2em;
    }

  }


</style>
