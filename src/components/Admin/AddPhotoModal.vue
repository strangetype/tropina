<template>
  <md-dialog :md-active="opened">
    <md-dialog-content >
      <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
      <div style="position: relative; flex-shrink: 0;" v-for="photo in photos">
        <img :src="PHOTOS_MINI_FOLDER_URL+photo" v-on:click="selectedPhoto = photo" />
        <i  v-if="photo === selectedPhoto" class="fa fa-check fa-3x"></i>
      </div>
      </div>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-default" v-on:click="close" >Отмена</md-button>
      <md-button class="md-primary" v-on:click="select" :disabled="!selectedPhoto" >Выбрать</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>

  import { mapState } from 'vuex';

  import { PHOTOS_MINI_FOLDER_URL } from '../../constants';

  export default {
    name: 'AddPhotoModal',
    props: ['opened', 'close', 'onSelect'],
    computed: mapState(['photos']),
    data() {
      return {
        selectedPhoto: null,
        PHOTOS_MINI_FOLDER_URL: PHOTOS_MINI_FOLDER_URL
      }
    },
    methods: {
      select() {
        this.onSelect(this.selectedPhoto);
        this.close();
      }
    }
  }

</script>

<style scoped lang="scss">
  .fa-check {
    text-shadow: 0 0 5px #000;
    margin: .2em;
    position: absolute; right: 0; bottom: 0;
  }
</style>
