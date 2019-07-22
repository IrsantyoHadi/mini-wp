<template>
  <v-card color="grey lighten-4" flat tile>
    <v-toolbar dark color="primary">
      <v-toolbar-title>
        <span style="font-size: 1em;">
          <i class="fab fa-wordpress mr-2"></i>
        </span>Mini-WP
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="islogin" @click="dologout" color="white">
        <span class="black--text text--darken-2">Logout</span>
      </v-btn>

    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: "navbar",
  props : ['islogin'],
  data() {
    return {
		};
  },
  methods: {
    dologout : function() {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      this.$emit('logout')
    }
  }
};
</script>

<style>
</style>
