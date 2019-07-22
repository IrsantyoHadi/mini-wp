<template>
  <v-layout column>
    <v-flex style="margin-top:20px">
      <small>
        created At :
        <span>{{ detail.createdat | moment("dddd, MMMM Do YYYY") }}</span>
      </small>
      <p style="font-size:50px">
        <strong>{{detail.title}}</strong>
      </p>
    </v-flex>
    <v-flex style="margin-top:20px">
      <v-img
        :src="(detail.imageUrl) ? (detail.imageUrl) : 'https://vignette.wikia.nocookie.net/bleach-oc/images/a/a7/Insert-Photo-Here.png/revision/latest?cb=20130612012050'"
        height="300px"
        content
      ></v-img>
    </v-flex>
    <v-flex style="margin-top:20px">
      <p>created by : {{detail.username}}</p>
    </v-flex>
    <v-divider></v-divider>
    <v-flex style="padding:20px" justify-center>
      <v-flex>
        <p v-html="detail.content" style="margin-top:20px; font-size:20px; padding:10px"></p>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "detail",
  props: ["detail"],
  data() {
    return {};
  }
};
</script>

<style>
</style>
