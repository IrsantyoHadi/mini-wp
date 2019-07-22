<template>
  <v-flex>
    <v-card>
      <v-img
        :src="image ? image : 'https://vignette.wikia.nocookie.net/bleach-oc/images/a/a7/Insert-Photo-Here.png/revision/latest?cb=20130612012050'"
        height="200"
        alt="image"
      ></v-img>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ judul }}</h3>
          <small>created by : {{ username }}</small>
          <br />
          <small>
            <span>last update : {{ createdat | moment("from", "now") }}</span>
          </small>
          <v-divider></v-divider>
          <p v-line-clamp:20="2" v-html="content" style="height:30px; width:200px"></p>
        </div>
      </v-card-title>

      <v-card-actions v-if="isLogin">
        <v-btn flat color="blue" @click.prevent="editArticle(articleId)">Edit Story</v-btn>
        <v-btn flat color="red" @click.prevent="deleteArticle(articleId)">Delete Story</v-btn>
        <v-btn flat color="orange" @click.prevent="detailArticle(articleId)">Detail Story</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  props: [
    "judul",
    "content",
    "image",
    "articleId",
    "username",
    "loggedname",
    "createdat"
  ],
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    editArticle: function(param) {
      if (this.username === this.loggedname) {
        this.$emit("editarticle", param);
      } else {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `You cannot edit someone else post`
        });
      }
    },
    deleteArticle: function(param) {
      axios({
        method: "delete",
        url: `http://34.87.38.146/articles/${param}`,
        headers : {token : localStorage.getItem('token')}
      })
        .then(({ data }) => {
          this.$emit("deletearticle", param);
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response.data.message.err}`
          });
        });
    },
    detailArticle: function(param) {
      this.$emit("getdetail", param);
    }
  },
  created: function() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
    }
  }
};
</script>

<style>
</style>
