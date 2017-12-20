<template>
  <div class="Admin" >
    <div v-if="isAuth">
      <md-tabs md-sync-route  >
        <md-tab id="tab-photos" md-label="Все фото" to="/admin/photos">
          <AdminPhotos/>
        </md-tab>
        <md-tab id="tab-gallery" md-label="Галерея" to="/admin/gallery">
          <AdminGallery />
        </md-tab>
        <md-tab id="tab-main" md-label="Главная" to="/admin/main">
          <AdminMain />
        </md-tab>
        <md-tab id="tab-service" md-label="Услуги" to="/admin/service">
          <AdminService />
        </md-tab>
        <md-tab id="tab-feedbacks" md-label="Отзывы" to="/admin/feedbacks">
          <AdminFeedbacks />
        </md-tab>
      </md-tabs>
    </div>
    <div v-if="!isAuth" class="md-layout md-gutter md-alignment-center absolute-fill-container" >

      <div class="md-layout-item md-size-50 md-xsmall-size-100">
        <form name="admin" v-on:submit.prevent="submit" >

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

        <md-toolbar v-if="error" class="md-primary">
          <h3 class="md-body-2">{{error}}</h3>
        </md-toolbar>

      </div>
    </div>
  </div>
</template>

<script>

  import { mapState, mapActions } from 'vuex';

  import AdminPhotos from './Admin/Photos.vue';
  import AdminGallery from './Admin/Gallery.vue';
  import AdminMain from './Admin/Main.vue';
  import AdminService from './Admin/Service.vue';
  import AdminFeedbacks from './Admin/Feedbacks.vue';

  export default {
    name: 'Admin',
    components: {
      AdminPhotos,
      AdminGallery,
      AdminMain,
      AdminService,
      AdminFeedbacks
    },
    data() {
      return {
        form: {},
        error: false
      }
    },
    computed: {
      ...mapState(['isAuth'])
    },
    methods: {
      ...mapActions(['login', 'checkAuth']),
      submit() {
        this.login(this.form).then(response => {
          if (response.error) this.error = response.errorMessage;
        });
      }
    },
    created() {
      this.checkAuth();
    }
  }
</script>

<style lang="scss">
  .Admin {
    .md-tab {
      padding: 4px!important;
    }
  }
</style>
