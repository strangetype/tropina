<template>
  <div class="md-layout md-gutter md-alignment-center" style="height: 100vh">
    <div class="md-layout-item md-size-50 md-xsmall-size-100">
      <form name="admin" v-on:submit.prevent="login" >

          <md-field>
            <label for="admin-input-name">Логин</label>
            <md-input type="text" id="admin-input-name" name="name" required v-model="form.username"></md-input>
          </md-field>
          <md-field>
            <label for="admin-input-password">Пароль</label>
            <md-input type="password" id="admin-input-password" name="password" required v-model="form.password"></md-input>
          </md-field>
          <md-card-actions>
            <md-button class="md-primary" type="submit">Войти</md-button>
          </md-card-actions>

      </form>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Admin',
    data() {
      return {
        form: {}
      }
    },
    methods: {
      login() {

      }
    }
  }
</script>
