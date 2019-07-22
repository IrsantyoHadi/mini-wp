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
        <detailarticle :detail="detail" v-if="getdetail"></detailarticle>

        <editarticle
          :alldata="articles"
          :editcontent="content"
          :edittitle="title"
          :editid="id"
          v-if="formedit"
          @editform="replaceEditData"
        ></editarticle>

        <formarticle @newdata="addNewData" v-if="formArticle"></formarticle>

        <v-layout v-if="cardArticles" wrap>
          <cardarticle
            :loggedname="username"
            style="margin:10px"
            v-for="article in articles"
            :key="article._id"
            :judul="article.title"
            :content="article.content"
            :image="article.imageUrl"
            :articleId="article._id"
            :username="article.UserId.username"
            :createdat="article.updatedAt"
            @editarticle="editArticle"
            @deletearticle="deleteArticle"
            @getdetail="detailArticle"
          ></cardarticle>
        </v-layout>

        <v-layout v-if="searchCardArticles" wrap>
          <cardarticle
            :loggedname="username"
            style="margin:10px"
            v-for="article in searchArticles"
            :key="article._id"
            :judul="article.title"
            :content="article.content"
            :image="article.imageUrl"
            :articleId="article._id"
            :username="article.UserId.username"
            :createdat="article.updatedAt"
            @editarticle="editArticle"
            @deletearticle="deleteArticle"
            @getdetail="detailArticle"
          ></cardarticle>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import detailarticle from "./DetailArticle";
import cardarticle from "./CardArticle";
import formarticle from "./formArticle";
import editarticle from "./editArticle";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "dashboard",
  components: {
    cardarticle,
    formarticle,
    editarticle,
    detailarticle
  },
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "dashboard" },
        { title: "Write", icon: "fas fa-edit" },
        { title: "Add Image", icon: "fas fa-images" },
        { title: "My Post", icon: "fas fa-id-card" }
      ],
      username: localStorage.getItem("username")
        ? localStorage.getItem("username")
        : "Stranger",
      right: null,
      articles: [],
      searchArticles: [],
      formArticle: false,
      title: "",
      content: "",
      id: "",
      formedit: false,
      cardArticles: true,
      searchCardArticles: false,
      detail: {
        createdat: "",
        username: "",
        title: "",
        content: "",
        imageUrl: ""
      },
      getdetail: false
    };
  },
  methods: {
    form: function(param) {
      if (param === "Write") {
        this.formArticle = true;
        this.cardArticles = false;
        this.searchCardArticles = false;
        this.getdetail = false;
        this.formedit = false;
      } else if (param == "Dashboard") {
        this.cardArticles = true;
        this.formArticle = false;
        this.formedit = false;
        this.searchCardArticles = false;
        this.getdetail = false;
      } else if (param == "My Post") {
        this.cardArticles = true
        axios({
          method: "get",
          url: `http://localhost:3000/articles?UserId=${localStorage.getItem("token")}`,
          headers : {token : localStorage.getItem('token')}
        })
          .then(({ data }) => {
            if (data.data.length) {
              this.searchArticles = data.data;
              this.searchCardArticles = true;
              this.cardArticles = false;
              this.formArticle = false;
              this.formedit = false;
              this.getdetail = false;
            } else {
              Swal.fire({
                position: "top-end",
                type: "error",
                title: "You don't have any post yet",
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    addNewData: function(param) {
      this.articles.unshift(param);
      this.formArticle = false;
      this.cardArticles = true;
    },
    editArticle: function(param) {
      this.formedit = true;
      this.cardArticles = false;
      this.searchCardArticles = false;
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
          return el;
        }
      });
      this.articles = newData;
    },
    detailArticle: function(param) {
      let found = this.articles.filter(el => {
        if (el._id === param) {
          return el;
        }
      });
      let ini = found[0];
      this.detail.createdat = ini.createdAt;
      this.detail.content = ini.content;
      this.detail.title = ini.title;
      this.detail.imageUrl = ini.imageUrl;
      this.detail.username = ini.UserId.username;

      this.formedit = false;
      this.cardArticles = false;
      this.searchCardArticles = false;
      this.formArticle = false;
      this.getdetail = true;
    }
  },
  mounted: function() {
    axios
      .get("http://localhost:3000/articles/all")
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
