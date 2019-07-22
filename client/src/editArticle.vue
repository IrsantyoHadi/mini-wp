<template>
  <div>
    <v-layout column justify-start style="border-style:groove">
      <p style="font-size:50px">Rewrite Your Story</p>
      <form @submit.prevent="editArticle">
        <label for="title" style="font-size:20px">Title :</label>
        <input style="font-size:16px" type="text" id="title" v-model="title" />
        <v-flex row>
          <p style="font-size:20px">Upload your image here :</p>
          <imageuploader @dataimage="getimage"></imageuploader>
        </v-flex>
        <v-flex row>
          <wysiwyg v-model="content" />
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
export default {
  components: {
    imageuploader
  },
  props: ["editcontent", "edittitle", "editid", "alldata"],
  data() {
    return {
      image: null,
      title: this.edittitle,
      content: this.editcontent
    };
  },
  methods: {
    getimage: function(param) {
      this.image = param;
    },
    editArticle: function() {
      let found = this.alldata.filter(el => {
        if (el._id == this.editid) {
          return el;
        }
      });
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("title", this.title);
      formData.append("content", this.content);
      axios({
        method: "put",
        url: `http://34.87.38.146/articles/${this.editid}`,
        headers : {token : localStorage.getItem('token')},
        data: formData
      })
        .then(({ data }) => {
          this.$emit(
            "editform",
            this.editid,
            data.image,
            this.title,
            this.content
          );
        })
        .catch(err => {
         Swal.fire({
            position: "top-end",
            type: "error",
            title: `${err.response}`,
            showConfirmButton: false,
            timer: 1500
          });
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
