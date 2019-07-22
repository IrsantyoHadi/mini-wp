<template>
  <div>
    <mynavbar :islogin="islogin" @logout="showLogin"></mynavbar>
    <dashboard v-if="dashboard"></dashboard>
    <v-layout column justify-center>
      <v-flex>
      <mysignup v-if="signup" @toggledashboard="showDashboard"></mysignup>
      </v-flex>
      <v-flex v-if="isHome">
      <home></home>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
import mynavbar from "./Navbar";
import dashboard from "./Dashboard";
import mysignup from "./SignInRegis";
import home from "./Home"
export default {
  components: {
    mynavbar,
    dashboard,
    mysignup,
    home
  },
  data() {
    return {
      dashboard: false,
      signup: false,
      islogin : false,
      isHome : true
    };
  },
  methods: {
    showDashboard: function() {
      this.signup = false;
      this.dashboard = true;
      this.islogin = true;
      this.isHome = false
    },
    showLogin : function () {
      this.signup = true
      this.islogin = false
      this.dashboard = false
    }
  },
  created: function() {
    if (!localStorage.getItem("token")) {
      this.signup = true;
    }else{
      this.dashboard = true
      this.islogin = true
      this.isHome = false
    }
  }
};
</script>

<style>
h1 {
  margin-top: 100px;
}
</style>
