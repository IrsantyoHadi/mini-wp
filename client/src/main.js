import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import wysiwyg from "vue-wysiwyg";
import ImageUploader from 'vue-image-upload-resize'

Vue.use(ImageUploader);
Vue.use(wysiwyg, {}); // config is optional. more below
Vue.use(VueAxios, axios)
Vue.use(Vuetify)


new Vue(App).$mount('#app');