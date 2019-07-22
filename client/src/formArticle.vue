<template>
  <div>
    <v-layout column justify-start style="border-style:groove">
      <p style="font-size:50px">Share Your Story</p>
      <form @submit.prevent="createArticle">
        <label for="title" style="font-size:20px">Title :</label>
        <input style="font-size:16px" type="text" id="title" v-model="title" />
        <v-flex row>
          <p style="font-size:20px">Upload your image here :</p>
          <imageuploader @dataimage="getimage"></imageuploader>
        </v-flex>
        <v-flex row>
          <wysiwyg v-model="myHTML" />
        </v-flex>
        <v-layout justify-center row style="margin-top:20px;margin-bottom:20px">
          <input type="submit" value="Publish" />
        </v-layout>
      </form>
    </v-layout>
  </div>
</template>

<script>
import imageuploader from "./imageuploader";
import axios from "axios";
import base64url from "base64url";
export default {
  components: {
    imageuploader
  },
  data() {
    return {
      myHTML: "",
      title: "",
      image: null
    };
  },
  methods: {
    getimage: function(param) {
      this.image = param;
    },
    createArticle: function() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("title", this.title);
      formData.append("content", this.myHTML);
      axios({
        method: "post",
        url: "http://localhost:3000/articles",
        headers : { token : localStorage.getItem('token')},
        data: formData
      })
        .then(({ data }) => {
          this.$emit("newdata", data.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>

<style scoped>
input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-style: solid;
}
</style>

