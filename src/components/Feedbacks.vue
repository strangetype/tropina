<template>
  <div class="md-row absolute-fill-container Content">
    <div class="Feedbacks Content-Container">
      <div class="Feedbacks-Header">
        <h1 class="md-title">Отзывы</h1>
        <md-button class="md-primary" v-on:click="showModal = true">Оставить Отзыв</md-button>
      </div>
      <div class="Feedbacks-Container">
        <div class="Feedbacks-Feedback" v-for="feedback in feedbacks">
          <div class="Feedbacks-Avatar">
            <img v-bind:src="feedback.photo" />
          </div>
          <div class="Feedbacks-FeedbackContent">
            <div class="Feedbacks-FeedbackHeader">
              <h2 class="md-title">{{feedback.name}}</h2>
            </div>
            <div class="Feedbacks-FeedbackText">
              {{feedback.text}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <feedback-modal :show = showModal :close="closeModal" ></feedback-modal>
  </div>
</template>

<script>

  import { mapState } from 'vuex';

  import FeedbackModal from './FeedbackModal.vue';

  export default {
    name: 'Feedbacks',
    data() {
      return {
        showModal: false
      }
    },
    computed: mapState(['feedbacks']),
    methods: {
      closeModal() {
        this.showModal = false;
      }
    },
    components: {
      FeedbackModal
    }
  }
</script>

<style lang="scss">

  @import '../style/mixins';

  $feedback-padding: 0.5em;
  $feedback-padding-mobile: 0.2em;

  .Feedbacks {
    display: flex;
    flex-direction: column;
    .Feedbacks-Header {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-shrink: 0;
      justify-content: space-between;
      align-items: center;
      @include desktop {
        padding: 0 4*$feedback-padding;
      }
      @include mobile {
        padding: 0 4*$feedback-padding-mobile;
      }
      .md-button {
        margin-right: 0;
      }
    }
    .Feedbacks-Container {
      overflow: auto;
      @include scrollbars(10px, rgba(255,255,255,.2), transparent);
      @include desktop {
        padding: 0 2*$feedback-padding;
      }
      @include mobile {
        padding: 0 2*$feedback-padding-mobile;
      }
    }
    .Feedbacks-Feedback {
      position: relative;
      display: flex;
      flex-direction: row;
      margin: 1em 0;
      @include desktop {
        padding: $feedback-padding;
      }
      @include mobile {
        padding: $feedback-padding-mobile;
      }
    }
    .Feedbacks-FeedbackHeader {
      @include desktop {
        padding: $feedback-padding;
      }
      @include mobile {
        padding: $feedback-padding-mobile;
      }
    }
    .Feedbacks-FeedbackContent {
      display: flex;
      flex-direction: column;
    }
    .Feedbacks-Avatar {
      flex-shrink: 0;
      @include desktop {
        padding: $feedback-padding;
      }
      @include mobile {
        padding: $feedback-padding-mobile;
      }
      @include mobile {
        position: absolute;
        right: $feedback-padding-mobile;
        top: 0;
      }
      img {
        border-radius: 50%;
        @include desktop {
          width: 100px;
          margin-top: 6*$feedback-padding;
        }
        @include mobile {
          width: 30px;
        }
      }
    }
    .Feedbacks-FeedbackText {
      @include desktop {
        padding: $feedback-padding;
      }
      @include mobile {
        padding: $feedback-padding-mobile;
      }
      text-align: justify;
      line-height: 1.5;
    }
  }
</style>
