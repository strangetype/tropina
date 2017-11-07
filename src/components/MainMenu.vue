<template>
  <ul class="MainMenu md-hide-small md-hide-xsmall">
    <li v-for="item in menu" class="MainMenu-Item" v-bind:class="{'MainMenu-Item--active': item.state === current}" v-on:click="goTo(item.state)">
      <span >{{item.label}}</span>
      <div class="MainMenu-Separator"></div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'MainMenu',
    data() {
      return {
        menu: [
          { label: 'Главная', state: 'main' },
          { label: 'Галлерея', state: 'gallery' },
          { label: 'Услуги', state: 'service' },
        ]
      }
    },
    computed: {
      current() {
        return this.$router.currentRoute.name;
      }
    },
    methods: {
      goTo(state) {
        this.$router.push(state);
      }
    }
  }
</script>

<style lang="scss">
    .MainMenu {
      position: absolute;
      top: 60px;
      left: 60px;
      color: #fff;
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
        &.MainMenu-Item--active {
          text-shadow: 0 0 10px #fff;
          list-style: circle;
        }
      }
      .MainMenu-Separator {
        height: 1px;
        width: 8em;
        background: linear-gradient(to right,rgba(255,255,255,0),#fff,rgba(255,255,255,0));
        margin-left: -1em;
      }
    }
</style>
