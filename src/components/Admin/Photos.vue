<template>
  <div class="AdminPhotos" >
    <div class="AdminPhotos-Actions">
      <md-button class="md-fab" v-on:click="openUpload" :disabled="blocked" >
        <i class="fa fa-upload fa-2x"></i>
      </md-button>
    </div>
    <div class="AdminPhotos-Container">
      <md-card class="AdminPhotos-Photo" v-for="photo in photos" :key="photo">
        <md-card-media-cover md-text-scrim>
          <md-card-media >
            <img :src="PHOTOS_FOLDER_URL+photo" alt="Skyscraper">
          </md-card-media>

          <md-card-area>
            <md-card-actions>
              <md-button class="md-primary md-cornered" v-on:click="openDeleteModal(photo)" :disabled="blocked" >
                <i class="fa fa-times"></i>
              </md-button>
            </md-card-actions>
          </md-card-area>
        </md-card-media-cover>
      </md-card>
    </div>
    <upload-photo-modal :on-upload="onUpload" :show="uploadOpened" :close="cancelUpload" ></upload-photo-modal>
    <md-dialog-confirm
      :md-active.sync="deleteModal"
      md-title="Удаление фото"
      md-content="Уверена, что хочешь удалить ?"
      md-confirm-text="Конечно"
      md-cancel-text="Неа"
      @md-cancel="closeDeleteModal"
      @md-confirm="removePhoto" >
    </md-dialog-confirm>
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
        deleteModal: false,
        PHOTOS_FOLDER_URL,
        selectedPhoto: null
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
      removePhoto() {
        this.blocked = true;
        this.deletePhoto(this.selectedPhoto).then(()=> {
          this.blocked = false;
          this.closeDeleteModal();
        });
      },
      openDeleteModal(id) {
        this.deleteModal = true;
        this.selectedPhoto = id;
      },
      closeDeleteModal() {
        this.deleteModal = false;
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

  @import '../../style/mixins';

  .AdminPhotos {
    display: flex;
    flex-direction: column;
    overflow: auto;
    .AdminPhotos-Actions {
      display: flex;
      justify-content: flex-end;
      padding: 16px;
    }
    .AdminPhotos-Container {
      width: 100%;
      height: 100%;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
    }
    .AdminPhotos-Photo {
      @include desktop {
        width: 33%;
      }
      @include mobile {
        width: 100%;
      }
      .md-card-media img {
        max-width: 100%!important;
        max-height: 100%!important;
        width: auto!important;
      }
    }
  }
</style>
