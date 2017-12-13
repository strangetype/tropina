<template>
  <md-content >
    <div class="md-layout md-alignment-center-right" >
      <md-button class="md-fab" v-on:click="openAddPhoto" :disabled="disabled" ><i class="fa fa-plus"></i></md-button>
    </div>
    <md-table>
      <md-table-row v-for="(photo, index) in photos" >
        <md-table-cell md-numeric>{{index + 1}}</md-table-cell>
        <md-table-cell><img :src="PHOTOS_MINI_FOLDER_URL+photo" /></md-table-cell>
        <!--
        <md-table-cell><md-button :disabled="disabled"><i class="fa fa-arrow-down"></i></md-button></md-table-cell>
        <md-table-cell><md-button :disabled="disabled"><i class="fa fa-arrow-up"></i></md-button></md-table-cell>
        -->
        <md-table-cell><md-button :disabled="disabled" class="md-accent" v-on:click="addPhotoNextTo(photo)" ><i class="fa fa-plus"></i></md-button></md-table-cell>
        <md-table-cell><md-button :disabled="disabled" class="md-primary" v-on:click="openDeleteModal(photo)"><i class="fa fa-times"></i></md-button></md-table-cell>
      </md-table-row>
    </md-table>

    <AddPhotoModal :opened="addModal" :close="closeAddPhoto" :on-select="addPhoto"  ></AddPhotoModal>

    <md-dialog-confirm
      :md-active.sync="deleteModal"
      md-title="Удаление фото из галлереи"
      md-content="Уверена, что хочешь удалить фото с главной страницы (фото сохранится, просто уйдет с главной) ?"
      md-confirm-text="Удалить"
      md-cancel-text="Неа"
      @md-cancel="closeDeleteModal"
      @md-confirm="removePhoto" >
    </md-dialog-confirm>

    <md-snackbar :md-position="'center'" :md-duration="Infinity" :md-active.sync="showError" md-persistent>
      <i class="fa fa-warn"></i>
      <span>{{error}}</span>
      <md-button class="md-primary" @click="showError = false"><i class="fa fa-times"></i></md-button>
    </md-snackbar>

  </md-content>
</template>

<script>

  import { mapState, mapActions } from 'vuex';

  import AddPhotoModal from './AddPhotoModal'
  import { PHOTOS_MINI_FOLDER_URL } from '../../constants';

  export default {
    name: 'AdminMain',
    components: {
      AddPhotoModal
    },
    data() {
      return {
        addModal: false,
        disabled: false,
        photoAboveId: undefined,
        deleteModal: false,
        PHOTOS_MINI_FOLDER_URL: PHOTOS_MINI_FOLDER_URL,
        photoToRemove: null,
        error: null
      }
    },
    computed: {
      ...mapState(['backgroundPhotos']),
      showError: {
        get() {
          return !!this.error;
        },
        set(v) {
          if (v) setTimeout(()=> {
            this.showError = false;
          }, 4000);
          this.error = v;
        }
      },
      photos() {
        return this.backgroundPhotos || [];
      }
    },
    methods: {
      ...mapActions(['addPhotoToBkg', 'deletePhotoFromBkg']),
      openAddPhoto() {
        this.addModal = true;
      },
      closeAddPhoto() {
        this.addModal = false;
      },
      addPhoto(id) {
        this.disabled = true;
        if (isFinite(this.photoAboveId)) {
          this.addPhotoToBkg({ id, photoAboveId: this.photoAboveId }).then(response => {
            this.disabled = false;
            this.photoAboveId = undefined;
            return response;
          }).catch(error => {
            this.showError = error;
            this.disabled = false;
          });
        } else {
          this.addPhotoToBkg({ id }).then(response => {
            this.disabled = false;
            this.photoAboveId = undefined;
            return response;
          }).catch(error => {
            this.showError = error;
            this.disabled = false;
          });
        }
      },
      addPhotoNextTo(photoAboveId) {
        this.photoAboveId = photoAboveId;
        this.openAddPhoto();
      },
      closeDeleteModal() {
        this.deleteModal = true;
      },
      removePhoto() {
        this.disabled = true;
        this.deletePhotoFromBkg(this.photoToRemove).then(response => {
          this.disabled = false;
          return response;
        });
      },
      openDeleteModal(photo) {
        this.photoToRemove = photo;
        this.deleteModal = true;
      }
    }
  }
</script>
