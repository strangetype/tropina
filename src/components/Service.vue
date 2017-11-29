<template>
  <div class="Service md-row absolute-fill-container Content">
    <div class="Content-Container">
      <iframe class="Service-IFrame" v-bind:src="src" ref="iframe" ></iframe>
    </div>
  </div>
</template>

<script>

  import { SERVICE_IFRAME_URL } from '../constants';

  export default {
    name: 'Service',
    data() {
      return {
        src: SERVICE_IFRAME_URL
      }
    },
    mounted() {
      const iframe = this.$refs.iframe;
      iframe.addEventListener('load', ()=> {
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const style = innerDoc.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = "*{color: #fff; font-family: calibri, arial; text-shadow: 0 0 5px #000;} ul{margin: 0;} p{margin: 0.3em;}";
        innerDoc.getElementsByTagName('head')[0].appendChild(style);
      });
      /*
      $('iframe').load( function() {
        $('iframe').contents().find("head")
          .append($("<style type='text/css'>  *{color: #fff; font-family: calibri, arial; text-shadow: 0 0 5px #000;} body{padding: 2em} ul{margin: 0;} p{margin: 0.3em;} </style>"));
      });
      */
    }
  }
</script>

<style lang="scss">

  @import "../style/mixins";

  .Service {
    .Service-IFrame {
      width: 100%;
      height: 100%;
      overflow: auto;
      border: none;
      @include desktop {
        padding: 2em;
      }
      @include mobile {
        padding: 0.5em;
      }
    }
  }
</style>
