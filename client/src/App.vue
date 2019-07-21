<template>
  <div>
    <mynavbar :islogin="islogin" @logout="showLogin"></mynavbar>
    <dashboard v-if="dashboard"></dashboard>
    <div class="d-flex justify-content-center">
      <mysignup v-if="signup" @toggledashboard="showDashboard"></mysignup>
    </div>
  </div>
</template>


<script>
import mynavbar from "./Navbar";
import dashboard from "./Dashboard";
import mysignup from "./SignInRegis";
export default {
  components: {
    mynavbar,
    dashboard,
    mysignup
  },
  data() {
    return {
      dashboard: false,
      signup: false,
      islogin : false
    };
  },
  methods: {
    showDashboard: function() {
      this.signup = false;
      this.dashboard = true;
      this.islogin = true
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
    }
  }
};
</script>

<style>
h1 {
  margin-top: 100px;
}
</style>
