<template>
  <div >
    <md-content style="padding: 10px; background: #222;"  >
      <form name="admin-feedback-form" @submit.prevent="save(feedback, index)" v-for="(feedback, index) in feedbacks" >
        <md-card style="margin: 10px;"  >
          <md-card-header>
            <div class="md-layout md-alignment-center-left">
              <img :src="feedback.photoUrl" @click="openUploadModal(feedback, index)" style="width: 100px; margin: 10px; border-radius: 50%;" alt="Avatar">
              <div>
                <md-field>
                  <label for="admin-feedback-name">Имя</label>
                  <md-input id="admin-feedback-name" :disabled="disabled" v-model="feedback.name" ></md-input>
                </md-field>
              </div>
            </div>
          </md-card-header>
          <md-card-content>
            <md-field>
              <label for="admin-feedback-text">Текст отзыва</label>
              <md-textarea id="admin-feedback-text" :disabled="disabled" v-model="feedback.text" ></md-textarea>
            </md-field>
          </md-card-content>
          <md-card-actions>
            <div style="flex-grow: 1; padding-left: 2em;">
              <md-switch v-model="feedback.confirmed" :disabled="disabled" >Подтверждено</md-switch>
            </div>
            <div style="flex-shrink: 0">
              <md-button class="md-primary" @click="openRemoveModal(feedback)" :disabled="disabled" >Удалить</md-button>
              <md-button @click="load" :disabled="disabled" >Отмена</md-button>
              <md-button class="md-accent" type="submit" :disabled="disabled" >Сохранить</md-button>
            </div>
          </md-card-actions>
        </md-card>
      </form>
    </md-content>

    <md-dialog-confirm
      :md-active.sync="removeModal"
      md-title="Удаление фото"
      md-content="Уверена, что хочешь удалить отзыв ?"
      md-confirm-text="Удалить"
      md-cancel-text="нет"
      @md-cancel="closeRemoveModal"
      @md-confirm="remove" >
    </md-dialog-confirm>

    <upload-photo-modal :on-upload="onUpload" :show="uploadOpened" :close="cancelUpload" ></upload-photo-modal>

  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';

  import UploadPhotoModal from './UploadPhotoModal';

  export default {
    name: 'AdminFeddbacks',
    components: {
      UploadPhotoModal
    },
    data() {
      return {
        disabled: false,
        removeModal: false,
        uploadOpened: false,
        selectedFeedback: null,
        selectedFeedbackIndex: null
      }
    },
    computed:{
      ...mapState({ feedbacks: 'allFeedbacks' })
    },
    methods: {
      ...mapActions(['loadData', 'saveFeedback', 'deleteFeedback', 'uploadClientPhoto']),
      save(feedback, index) {
        this.lock();
        return this.saveFeedback({ feedback, index }).then(this.unlock).catch(this.unlock);
      },
      remove() {
        this.lock();
        this.deleteFeedback(this.selectedFeedback).then(this.unlock).catch(this.unlock);
      },
      openRemoveModal(feedback) {
        this.selectedFeedback = feedback;
        this.removeModal = true;
      },
      closeRemoveModal() {
        this.selectedFeedback = null;
        this.removeModal = false;
      },
      load() {
        this.lock();
        return this.loadData().then(this.unlock).catch(this.unlock);
      },
      lock() {
        this.disabled = true;
      },
      unlock() {
        this.disabled = false;
      },
      openUploadModal(feedback, index) {
        this.uploadOpened = true;
        this.selectedFeedback = feedback;
        this.selectedFeedbackIndex = index;
      },
      onUpload(uploadData) {
        return this.uploadClientPhoto(uploadData).then(response => {
          if (!response.error) {
            this.selectedFeedback.photo = response.newFileName;
            return this.save(this.selectedFeedback, this.selectedFeedbackIndex).then(response => {
              this.selectedFeedback = null;
              this.selectedFeedbackIndex = null;
              return response;
            }).catch(error => {
              this.selectedFeedback = null;
              this.selectedFeedbackIndex = null;
              return error;
            });
          }
        });
      },
      cancelUpload() {
        this.uploadOpened = false;
      }
    }
  }

</script>
