<template>
  <div>
    <v-layout>
      <v-flex xs3 style="min-height:100vh">
        <v-navigation-drawer permanent dark>
          <v-toolbar flat>
            <v-list>
              <v-list-tile>
                <v-list-tile-title class="title">{{ username }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-toolbar>

          <v-divider></v-divider>

          <v-list dense class="pt-0">
            <v-list-tile v-for="item in items" :key="item.title" @click.prevent="form(item.title)">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex row xs9 style="min-height:100vh; padding-right:20px; padding-top:10px">
        <editarticle
          :editcontent="content"
          :edittitle="title"
          :editid="id"
          v-if="formedit"
          @editform="replaceEditData"
        ></editarticle>
        <formarticle @newdata="addNewData" v-if="formArticle"></formarticle>
        <div v-if="cardArticles">
          <cardarticle
            style="margin:10px"
            v-for="article in articles"
            :key="article._id"
            :judul="article.title"
            :content="article.content"
            :image="article.imageUrl"
            :articleId="article._id"
            @editarticle="editArticle"
            @deletearticle="deleteArticle"
          ></cardarticle>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import cardarticle from "./CardArticle";
import formarticle from "./formArticle";
import editarticle from "./editArticle";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { token: localStorage.getItem("token") }
});

export default {
  name: "dashboard",
  components: {
    cardarticle,
    formarticle,
    editarticle
  },
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "dashboard" },
        { title: "Write", icon: "fas fa-edit" },
        { title: "Add Image", icon: "fas fa-images" }
      ],
      username: "Irsantyo Hadi",
      right: null,
      articles: [],
      formArticle: false,
      title: "",
      content: "",
      id: "",
      formedit: false,
      cardArticles: true
    };
  },
  methods: {
    form: function(param) {
      if (param === "Write") {
        this.formArticle = true;
        this.cardArticles = false;
      } else if (param == "Dashboard") {
        this.cardArticles = true;
        this.formArticle = false;
        this.formedit = false;
      }
    },
    addNewData: function(param) {
      this.articles.unshift(param);
    },
    editArticle: function(param) {
      this.formedit = true;
      this.cardArticles = false;
      let found = this.articles.filter(el => {
        if (el._id == param) {
          return el;
        }
      });
      this.title = found[0].title;
      this.content = found[0].content;
      this.id = found[0]._id;
    },
    replaceEditData: function(param, imageUrl, title, content) {
      this.articles.forEach(element => {
        if (element._id === param) {
          if (title) {
            element.title = title;
          }
          if (content) {
            element.content = content;
          }
          if (imageUrl != null) {
            element.imageUrl = imageUrl;
          }
        }
      });
      this.cardArticles = true;
      this.formedit = false;
    },
    deleteArticle: function(param) {
      let newData = this.articles.filter(el => {
        if (el._id != param) {
          return el
        }
      })
      this.articles = newData
    }
  },
  mounted: function() {
    instance
      .get("/articles")
      .then(({ data }) => {
        this.articles = data.data;
      })
      .catch(err => {
        console.log(err.response);
      });
  }
};
</script>

<style>
</style>
