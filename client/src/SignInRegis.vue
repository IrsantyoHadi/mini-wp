<template>
  <div>
    <v-form v-model="valid" v-if="signupform">
      <form @submit.prevent="signup">
        <v-container justify-center>
          <v-layout row justify-center>
            <v-flex xs12 md4>
              <v-layout justify-center>
                <h1>Sign Up</h1>
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
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </form>
    </v-form>

    <v-form v-model="valid" v-if="signinform">
      <form @submit.prevent="signin">
        <v-container justify-center>
          <v-layout row justify-center>
            <v-flex xs12 md4>
              <v-layout justify-center>
                <h1>Sign In</h1>
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
              <div class="text" style="margin-top: 5px">
                <v-icon id="back" @click="showSignUp">fas fa-backspace</v-icon>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </form>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "signupform",
  data: () => ({
    baseUrl: axios.create({
      baseURL: "http://localhost:3000",
      headers: { token: localStorage.getItem("token") }
    }),
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
      this.baseUrl
        .post("/users/signup", {
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token)
          this.$emit("toggledashboard")
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    signin: function() {
      this.baseUrl
        .post("/users/signin", {
          username: this.username,
          password: this.password
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.$emit("toggledashboard")
        })
        .catch(err => {
          console.log(err.response);
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
