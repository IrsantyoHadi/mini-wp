<template>
  <v-card>
    <v-img
      :src="image ? image : 'https://vignette.wikia.nocookie.net/bleach-oc/images/a/a7/Insert-Photo-Here.png/revision/latest?cb=20130612012050'"
      height="200"
      alt="image"
    ></v-img>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ judul}}</h3>
        <p>
          <span v-html="content"></span>
        </p>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat color="orange" @click.prevent="editArticle(articleId)">Edit Story</v-btn>
      <v-btn flat color="orange" @click.prevent="deleteArticle(articleId)">Delete Story</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "token": localStorage.getItem('token') }
});
import axios from "axios";
export default {
  props: ["judul", "content", "image", "articleId"],
  data() {
    return {};
  },
  methods: {
    editArticle: function(param) {
      this.$emit("editarticle", param);
    },
    deleteArticle: function(param) {
      instance.delete(`/articles/${param}`)
      .then(({data})=>{
        console.log(data);
        this.$emit("deletearticle", param);
      })
      .catch(err =>{
        console.log(err.response);
      })
    }
  }
};
</script>

<style>
</style>
