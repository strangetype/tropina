<template>
    <md-dialog :md-active="show" class="FeedbackModal">
      <md-dialog-title>Ваш Отзыв</md-dialog-title>
      <form name="feedback" v-on:submit="submit" ref="form">
      <md-dialog-content>

        <md-field>
          <label for="feedback-name">Ваше Имя</label>
          <md-input id="feedback-name" type="text" name="name" v-on:focus="error=false" required v-model="form.name" />
        </md-field>

        <md-field>
          <label for="feedback-message">Отзыв</label>
          <md-textarea id="feedback-message" name="feedback" v-on:focus="error=false" required v-model="form.text" />
        </md-field>

        <transition name="fade">
          <md-toolbar v-if="success" class="md-accent">
            <h3 class="md-body-2">Спасибо за отзыв :)</h3>
          </md-toolbar>
        </transition>
        <transition name="fade">
          <md-toolbar v-if="error" class="md-primary">
            <h3 class="md-body-2">Ошибка отправки</h3>
          </md-toolbar>
        </transition>

      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-default" @click="close" :disabled="disabled" >Отмена</md-button>
        <md-button class="md-primary" type="submit" :disabled="disabled" >Отправить</md-button>
      </md-dialog-actions>
      </form>
    </md-dialog>
</template>

<script >

  import { mapActions } from 'vuex';

  export default {
    name: 'FeedbackModal',
    props: ['show', 'close'],
    data() {
      return {
        form: {},
        success: false,
        error: false,
        disabled: false
      }
    },
    methods: {
      ...mapActions(['leaveFeedback']),
      submit(event) {
        event.preventDefault();
        event.stopPropagation();
        this.disabled = true;
        this.leaveFeedback(this.form).then(response => {
          if (!response.error) {
            this.success = true;
            setTimeout(()=> {
              this.success = false;
              setTimeout(()=> {
                this.disabled = false;
                this.close();
              }, 1000);
            }, 2000);
          } else {
            this.disabled = false;
            this.error = true;
          }
        });
      }
    }
  }
</script>

<style lang="scss" >

  @import '../../style/mixins';

  .FeedbackModal {
    overflow: auto;
    @include desktop {
      min-width: 500px;
    }

  }
</style>
