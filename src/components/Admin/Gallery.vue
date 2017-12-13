<template>
  <md-content >
    <div class="md-layout md-alignment-center-right" >
      <md-button class="md-fab" v-on:click="openAddPhoto" :disabled="disabled" ><i class="fa fa-plus"></i></md-button>
    </div>
    <md-table>
      <md-table-row v-for="(photo, index) in photos" >
        <md-table-cell md-numeric>{{index+1}}</md-table-cell>
        <md-table-cell><img :src="PHOTOS_MINI_FOLDER_URL+photo" /></md-table-cell>
        <!--
        <md-table-cell><md-button :disabled="disabled"><i class="fa fa-arrow-down"></i></md-button></md-table-cell>
        <md-table-cell><md-button :disabled="disabled"><i class="fa fa-arrow-up"></i></md-button></md-table-cell>
        -->
        <md-table-cell><md-button :disabled="disabled" class="md-accent" v-on:click="addPhotoNextTo(index)" ><i class="fa fa-plus"></i></md-button></md-table-cell>
        <md-table-cell><md-button :disabled="disabled" class="md-primary" v-on:click="openDeleteModal(photo)"><i class="fa fa-times"></i></md-button></md-table-cell>
      </md-table-row>
    </md-table>

    <AddPhotoModal :opened="addModal" :close="closeAddPhoto" :on-select="addPhoto"  ></AddPhotoModal>

    <md-dialog-confirm
      :md-active.sync="deleteModal"
      md-title="Удаление фото из галлереи"
      md-content="Уверена, что хочешь удалить из галлереи (фото сохранится, просто уйдет из галлереи) ?"
      md-confirm-text="Удалить"
      md-cancel-text="Неа"
      @md-cancel="closeDeleteModal"
      @md-confirm="removePhoto" >
    </md-dialog-confirm>

  </md-content>
</template>

<script>

  import { mapState, mapActions } from 'vuex';

  import AddPhotoModal from './AddPhotoModal'
  import { PHOTOS_MINI_FOLDER_URL } from '../../constants';

  export default {
    name: 'AdminCategories',
    components: {
      AddPhotoModal
    },
    data() {
      return {
        addModal: false,
        disabled: false,
        order: undefined,
        deleteModal: false,
        PHOTOS_MINI_FOLDER_URL: PHOTOS_MINI_FOLDER_URL,
        photoToRemove: null
      }
    },
    computed: {
      ...mapState(['categories']),
      photos() {
        return (this.categories && this.categories[0]) ? this.categories[0].photosIds : [];
      }
    },
    methods: {
      ...mapActions(['addPhotoToGallery', 'deletePhotoFromGallery']),
      openAddPhoto() {
        this.addModal = true;
      },
      closeAddPhoto() {
        this.addModal = false;
      },
      addPhoto(id) {
        this.disabled = true;
        if (isFinite(this.order)) {
          this.addPhotoToGallery({ id, order: this.order+1 }).then(response => {
            this.disabled = false;
            this.order = undefined;
            return response;
          });
        } else {
          this.addPhotoToGallery({ id }).then(response => {
            this.disabled = false;
            this.order = undefined;
            return response;
          });
        }
      },
      addPhotoNextTo(order) {
        this.order = order;
        this.openAddPhoto();
      },
      closeDeleteModal() {
        this.deleteModal = true;
      },
      removePhoto() {
        this.disabled = true;
        this.deletePhotoFromGallery(this.photoToRemove).then(response => {
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
