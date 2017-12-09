<template>
  <div class="AdminPhotos" >
    <div class="AdminPhotos-Actions">
      <md-button class="md-accent" v-on:click="openUpload" :disabled="blocked" >Загрузить Фото</md-button>
    </div>
    <div class="AdminPhotos-Container">
      <md-card class="AdminPhotos-Photo" v-for="photo in photos" :key="photo">
        <md-card-media-cover md-text-scrim>
          <md-card-media md-ratio="16:9">
            <img :src="PHOTOS_FOLDER_URL+photo" alt="Skyscraper">
          </md-card-media>

          <md-card-area>
            <md-card-actions>
              <md-button class="md-primary md-cornered" v-on:click="removePhoto(photo)" :disabled="blocked" >Delete</md-button>
            </md-card-actions>
          </md-card-area>
        </md-card-media-cover>
      </md-card>
    </div>
    <upload-photo-modal :on-upload="onUpload" :show="uploadOpened" :close="cancelUpload" />
  </div>

</template>

<script>

  import { mapActions, mapState } from 'vuex';

  import UploadPhotoModal from './UploadPhotoModal';
  import { PHOTOS_FOLDER_URL } from '../../constants';

  export default {
    name: 'AdminPhotos',
    data() {
      return {
        blocked: false,
        uploadOpened: false,
        PHOTOS_FOLDER_URL
      }
    },
    components: {
      UploadPhotoModal
    },
    methods: {
      ...mapActions(['loadAllPhotos', 'uploadPhoto', 'deletePhoto']),
      updateCroppedImage() {
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      },
      openUpload() {
        this.uploadOpened = true;
      },
      cancelUpload() {
        this.uploadOpened = false;
      },
      onUpload(data) {
        return new Promise((resolve, reject) => {
          this.uploadPhoto(data).then(response => {
            if (response.error) {
              reject(response);
            } else {
              resolve(response);
            }
          });
        });
      },
      removePhoto(id) {
        this.blocked = true;
        this.deletePhoto(id).then(()=> {
          this.blocked = false;
        });
      }
    },
    computed: {
      ...mapState(['photos'])
    },
    created() {
      this.loadAllPhotos();
    }
  }
</script>

<style lang="scss">
  .AdminPhotos {
    display: flex;
    flex-direction: column;
    overflow: auto;
    .AdminPhotos-Actions {
      display: flex;
      justify-content: flex-end;
      padding: 8px;
    }
    .AdminPhotos-Container {
      width: 100%;
      height: 100%;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
    }
    .AdminPhotos-Photo {
      width: 33%;
      padding: 4px;
    }
  }
</style>
