<template>
  <md-dialog :md-active="show" class="FeedbackModal">
    <md-field>
      <label>Загрузить Фото</label>
      <md-file class="md-accent" ref="photo" v-on:change="choose" accept="image/*" />
    </md-field>
    <md-dialog-content>
      <vue-cropper v-if="photo"
                   ref="cropper"
                   :guides="true"
                   :view-mode="2"
                   :auto-crop-area="0.5"
                   :background="false"
                   :rotatable="false"
                   :src="photo"
                   :cropmove="updateCroppedImage"
                   alt="Source Image"
      >
      </vue-cropper>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-default" v-on:click="close" :disabled="disabled">Отмена</md-button>
      <md-button class="md-accent" v-on:click="upload" :disabled="disabled || !photo">Готово</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import VueCropper from 'vue-cropperjs';

  export default {
    name: 'UploadPhotoModal',
    props: ['show', 'close', 'onUpload'],
    data() {
      return {
        photo: null,
        disabled: false
      }
    },
    components: {
      VueCropper
    },
    methods: {
      choose(event) {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onload = upload => {
          this.photo = null;
          setTimeout(()=> {
            this.photo = upload.target.result;
            this.$forceUpdate();
          });
        };
        reader.readAsDataURL(file);
      },
      upload() {
        this.disabled = true;
        const canvas = this.$refs.cropper.getCroppedCanvas();
        const crop = {
          x: 0, y: 0,
          width: canvas.width,
          height: canvas.height,
        };
        const file = canvas.toDataURL();
        this.onUpload({ file, type: 'dataURI', crop }).then(response => {
          this.disabled = false;
          this.photo = null;
          setTimeout(()=> {
            this.close();
          });
          return response;
        }).catch(error=> {
          this.disabled = false;
          return error;
        });
      },
      updateCroppedImage() {

      }
    }
  }

</script>
