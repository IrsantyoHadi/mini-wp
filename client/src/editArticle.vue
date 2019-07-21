<template>
  <div>
    <v-layout column justify-start style="border-style:groove">
      <p style="font-size:50px">Rewrite Your Story</p>
      <form @submit.prevent="editArticle">
        <label for="title" style="font-size:20px">Title :</label>
        <input style="font-size:16px" type="text" id="title" v-model="edittitle"/>
        <v-flex row>
          <p style="font-size:20px">Upload your image here :</p>
          <imageuploader @dataimage="getimage"></imageuploader>
        </v-flex>
        <v-flex row>
          <wysiwyg v-model="editcontent"/>
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
import axios from "axios"
const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { token: localStorage.getItem("token") }
});
export default {
  components: {
    imageuploader
  },
  props : ['editcontent' , 'edittitle', 'editid'],
  data() {
    return {
      image: null
    };
  },
  methods: {
    getimage: function(param) {
      this.image = param
    },
    editArticle: function () {
      const formData = new FormData()
      formData.append('image',this.image)
      formData.append('title',this.edittitle)
      formData.append('content',this.editcontent)
      instance
        .put(`/articles/${this.editid}`, formData)
        .then(({ data }) => {
          this.$emit('editform',this.editid,data.image,this.edittitle, this.editcontent)
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>

<style>
input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-style: solid;
}
</style>
