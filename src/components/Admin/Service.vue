<template>
  <md-content>
    <vue-editor v-model="content" ></vue-editor>
    <div class="md-layout md-alignment-center-right">
      <md-button @click="loadContent" :disabled="disabled" >Отмена</md-button>
      <md-button class="md-primary" @click="saveContent" :disabled="disabled" >Сохранить</md-button>
    </div>
  </md-content>
</template>
<script>

  import { VueEditor } from 'vue2-editor'
  import { mapActions } from 'vuex';

  export default {
    name: 'AdminService',
    components: {
      VueEditor
    },
    data() {
      return {
        content: '',
        disabled: false
      }
    },
    methods:{
      ...mapActions(['getServiceContent', 'saveServicesContent']),
      loadContent() {
        this.getServiceContent().then(content => {
          this.content = content;
        });
      },
      saveContent() {
        this.disabled = true;
        this.saveServicesContent(this.content).then(()=>{
          this.disabled = false;
        }).catch(()=> {
          this.disabled = false;
        })
      }
    },
    created() {
      this.loadContent();
    }
  };

</script>

<style>
  .ql-toolbar.ql-snow {
    background: #fff;
  }
</style>
