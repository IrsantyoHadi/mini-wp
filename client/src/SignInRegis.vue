<template>
  <v-layout>
    <v-flex v-if="signupform">
      <v-form v-model="valid">
        <form @submit.prevent="signup">
          <v-layout row justify-center>
            <v-flex xs12 md4>
              <v-layout justify-center>
                <p style="font-size:30px; margin-top:20px">
                  <strong>Sign Up</strong>
                </p>
              </v-layout>
              <div class="text">
                <v-text-field v-model="username" :rules="nameRules" label="Username" required></v-text-field>
              </div>
              <v-layout justify-space-between>
                <div class="text">
                  <v-text-field v-model="firstname" :rules="nameRules" label="First name" required></v-text-field>
                </div>
                <div class="text">
                  <v-text-field v-model="lastname" :rules="nameRules" label="Last name" required></v-text-field>
                </div>
              </v-layout>
              <div class="text">
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
              </div>
              <div class="text">
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  label="Password"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </div>
              <div class="text">
                <input type="submit" value />
                <v-btn @click="signup">Sign Up</v-btn>
                <a href @click.prevent="showSignIn">OR already have an account?</a>
                <v-btn @click="signinGoogle" dark color="info">
                  SIGN IN WITH
                  <v-icon style="margin-left:20px">fab fa-google</v-icon>
                </v-btn>
              </div>
            </v-flex>
          </v-layout>
        </form>
      </v-form>
    </v-flex>

    <v-flex v-if="signinform">
      <v-form v-model="valid">
        <form @submit.prevent="signin">
          <v-layout row justify-center>
            <v-flex xs12 md4>
              <v-layout justify-center>
                <p style="font-size:30px; margin-top:20px">
                  <strong>Sign In</strong>
                </p>
              </v-layout>
              <div class="text">
                <v-text-field v-model="username" :rules="nameRules" label="Username" required></v-text-field>
              </div>
              <div class="text">
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  label="Password"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </div>
              <div class="text">
                <input type="submit" value />
                <v-btn @click="signin">Sign In</v-btn>
              </div>
              <v-flex justify-content-center align-center>
                <v-flex>
                  <v-icon style="margin-left:15px" id="back" @click="showSignUp">fas fa-backspace</v-icon>
                </v-flex>
              </v-flex>
            </v-flex>
          </v-layout>
        </form>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "signupform",
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    username: "",
    nameRules: [v => !!v || "this field is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    password: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    signinform: false,
    signupform: true
  }),
  methods: {
    signup: function() {
      axios({
        url: "http://localhost:3000/users/signup",
        method: "POST",
        data: {
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", this.username);
          this.$emit("toggledashboard");
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
    },
    signin: function() {
      axios({
        url: "http://localhost:3000/users/signin",
        method: "POST",
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", this.username);
          this.$emit("toggledashboard");
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
    },
    signinGoogle: function() {
      let username;
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
          // GoogleUser.getId() : Get the user's unique ID string.
          // GoogleUser.getBasicProfile() : Get the user's basic profile information.
          // GoogleUser.getAuthResponse() : Get the response object from the user's auth session. access_token and so on
          let id_token = GoogleUser.getAuthResponse().id_token;
          username = GoogleUser.getBasicProfile().ofa;
          this.isSignIn = this.$gAuth.isAuthorized;
          return {
            id_token,
            username
          };
        })
        .then(function(data) {
          return axios({
            url: "http://localhost:3000/users/signinGoogle",
            method: "POST",
            data: {
              data
            }
          });
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", username);
          this.$emit("toggledashboard");
        })
        .catch(error => {
          Swal.fire({
            position: "top-end",
            type: "error",
            title: `${err}`,
            showConfirmButton: false,
            timer: 1500
          });
        });
    },
    showSignIn: function() {
      this.signinform = true;
      this.signupform = false;
    },
    showSignUp: function() {
      this.signinform = false;
      this.signupform = true;
    }
  }
};
</script>

<style scoped>
a {
  color: black;
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  background-color: transparent;
  text-decoration: underline;
}

#back {
  cursor: pointer;
}
</style>


