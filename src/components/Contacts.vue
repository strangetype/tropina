<template>
  <div class="absolute-fill-container Content Contacts">
    <div class="Content-Container Contacts-Container">
      <div class="Contacts-Column Contacts-Column--30">
        <h1 class="Contacts-Row md-title">Мария Тропина</h1>
        <div class="Contacts-Row Contacts-Link md-subheading"><i class="fa fa-phone Contacts-RowIcon"></i>+7(903)596-05-12</div>
        <a class="Contacts-Row Contacts-Link md-subheading" target="_blank" href="https://www.instagram.com/tropina_maria" ><i class="fa fa-instagram Contacts-RowIcon"></i>tropina_maria</a>
      </div>
      <div class="Contacts-Column Contacts-Column--70">
        <h2 class="Contacts-Row md-title">Отправить Сообщение</h2>
        <form class="Contacts-Form" name="contacts" v-on:submit="submit" ref="form" >
          <md-field>
            <label for="contacts-name">Имя</label>
            <md-input id="contacts-name" required v-model="form.name"></md-input>
          </md-field>
          <md-field>
            <label for="contacts-phone">Телефон</label>
            <md-input id="contacts-phone" v-model="form.phone"></md-input>
          </md-field>
          <md-field>
            <label for="contacts-email">Email</label>
            <md-input id="contacts-email" required type="email" name="email" v-model="form.email"></md-input>
          </md-field>
          <md-field>
            <label for="contacts-message">Сообщение</label>
            <md-textarea id="contacts-message" required v-model="form.message"></md-textarea>
          </md-field>
          <md-card-actions>
            <md-button class="md-primary" type="submit" :disabled="disabled" >Отправить</md-button>
          </md-card-actions>
          <transition name="fade">
            <md-toolbar v-if="error" class="md-primary">
              <h3 class="md-body-2">Сообщение не отправлено</h3>
            </md-toolbar>
          </transition>
          <transition name="fade">
            <md-toolbar v-if="success" class="md-accent">
              <h3 class="md-body-2">Сообщение отправлено</h3>
            </md-toolbar>
          </transition>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapActions } from 'vuex';

  export default {
    name: 'Contacts',
    data() {
      return {
        disabled: false,
        error: false,
        success: false,
        form: {

        }
      }
    },
    methods: {
      ...mapActions(['sendMessage']),
      submit(event) {
        event.preventDefault();
        event.stopPropagation();
        this.disabled = true;
        this.sendMessage(this.form).then((response)=> {
          if (response.error) {
            this.disabled = false;
            this.error = true;
          } else {
            this.disabled = false;
            this.success = true;
            setTimeout(()=> {
              this.success = false;
            }, 3000);
          }
          this.form = {};
        });
      }
    },
    mounted() {
      this.$refs.form.addEventListener('focus', (event) => {
        this.error = false;
      }, true);
    }
  }
</script>

<style lang="scss">

  @import "../style/mixins";

  .Contacts {
    color: #fff;
    .Contacts-Container {
      display: flex;
      overflow: auto;
      @include desktop {
        flex-direction: row;
      }
      @include mobile {
        flex-direction: column;
      }
    }
    .Contacts-Column {
      padding: 0 2em 2em 2em;
      background: transparent;
      transition: background .3s;
      flex-shrink: 0;
      &:hover {
        background: rgba(255,255,255,.1);
      }
      @include desktop {
        flex: 1;
      }
      @include mobile {
        flex-shrink: 0;
      }
      &.Contacts-Column--30 {
        flex: 30;
      }
      &.Contacts-Column--70 {
        flex: 70;
      }
    }
    .Contacts-Row {
      padding: 1em 0;
    }
    .Contacts-RowIcon {
      margin-right: 1em;
    }
    a.Contacts-Link {
      color: #fff;
      &:visited {
        color: #fff;
      }
    }
  }
</style>
