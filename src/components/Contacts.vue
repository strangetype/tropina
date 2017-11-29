<template>
  <div class="absolute-fill-container Content Contacts">
    <div class="Content-Container Contacts-Container">
      <div class="Contacts-Column">
        <h1 class="Contacts-Title">Мария Тропина</h1>
        <div class="Contacts-Link"><i class="fa fa-phone"></i>+7(903)596-05-12</div>
        <a class="Contacts-Link" target="_blank" href="https://www.instagram.com/tropina_maria" ><i class="fa fa-instagram"></i>tropina_maria</a>
      </div>
      <div class="Contacts-Column">
        <form class="Contacts-Form" name="contacts" >
          <md-input-container>
            <label>Имя</label>
            <md-input v-model="form.name"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Телефон</label>
            <md-input v-model="form.phone"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Email</label>
            <md-input v-model="form.email"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Сообщение</label>
            <md-textarea v-model="form.message"></md-textarea>
          </md-input-container>
          <md-input-container>
            <md-button class="md-primary" type="submit">Отправить</md-button>
          </md-input-container>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Contacts',
    data() {
      return {
        form: {

        }
      }
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
      padding: 0 2em;
      @include desktop {
        flex: 1;
      }
      @include mobile {
        flex-shrink: 0;
      }
    }
    .Contacts-Title, .Contacts-Link {
      padding: 1em 0;
    }
    a.Contacts-Link {
      color: #fff;
      &:visited {
        color: #fff;
      }
    }
  }
</style>
