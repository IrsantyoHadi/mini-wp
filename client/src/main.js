import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import wysiwyg from "vue-wysiwyg";
import ImageUploader from 'vue-image-upload-resize'
import lineClamp from 'vue-line-clamp'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '75694869298-pgonje86ju1jdajjuvfn3kh5nlq32mql.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)
Vue.use(lineClamp, {
  importCss: true
})
Vue.use(ImageUploader);
Vue.use(wysiwyg, {}); // config is optional. more below
Vue.use(VueAxios, axios)
Vue.use(Vuetify)
Vue.use(require('vue-moment'));

new Vue(App).$mount('#app');