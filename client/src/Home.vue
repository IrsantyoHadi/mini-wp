<template>
<v-container>
  <v-layout column>
    <p style="font-size:30px; margin-top:20px"><strong> Post From Our Users</strong></p>
     <v-text-field @keyup.stop="searching"
        class="mx-3"
        flat
        label="Search"
        prepend-inner-icon="search"
        solo-inverted
        v-model="search"
      ></v-text-field>
  </v-layout>
  <v-layout wrap v-if="allArticles">
    <cardarticle
      style="margin:10px"
      v-for="article in articles"
      :key="article._id"
      :judul="article.title"
      :content="article.content"
      :image="article.imageUrl"
      :articleId="article._id"
      :createdat="article.updatedAt"
      :username="article.UserId.username"
    ></cardarticle>
  </v-layout>
  <v-layout wrap v-if="filteredArticles">
    <cardarticle
      style="margin:10px"
      v-for="article in searchArticle"
      :key="article._id"
      :judul="article.title"
      :content="article.content"
      :image="article.imageUrl"
      :articleId="article._id"
      :createdat="article.updatedAt"
      :username="article.UserId.username"
    ></cardarticle>
  </v-layout>
</v-container>
</template>

<script>
import cardarticle from "./CardArticle";
import axios from "axios";
export default {
  name: "Home",
  components: {
    cardarticle
  },
  data() {
    return {
      articles: [],
      searchArticle : [],
      search : '',
      allArticles : true,
      filteredArticles : false
    };
  },
  methods: {
    searching: function() {
      let regex = new RegExp(this.search, "i")
      let found = this.articles.filter(el=>{
        if(el.title.match(regex)){
          return el
        }
      })
      this.searchArticle = found
      if(this.search == ""){
        this.allArticles = true
        this.filteredArticles = false
      }else{
        this.allArticles = false
        this.filteredArticles = true
      }
    }
  },
  mounted: function() {
      axios.get("http://localhost:3000/articles/all")
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
