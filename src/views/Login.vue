<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Авторизация</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              prepend-icon="person"
              name="login"
              label="Email"
              type="username"
              v-model="username"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              id="password"
              prepend-icon="lock"
              name="password"
              label="Пароль"
              type="password"
              v-model="password"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn flat to="/register">Зарегистрироваться</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login">Войти</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { validateEmail } from "@/utils/validate";
import { LOGIN_REQ } from "@/store/actionTypes";
import { mapActions } from "vuex";

export default {
  data: () => ({
    valid: false,
    username: "",
    password: "",
    emailRules: [
      v => !!v || "Поле E-mail обязательно для заполнения",
      v => validateEmail(v) || "Поле E-mail заполнено неверно"
    ],
    passwordRules: [
      v => v.length > 5 || "Пароль должен быть не менее 6 символов",
      v =>
        /^[A-Za-z0-9]*$/.test(v) ||
        "Пароль должен состоять только из латинских символов и цифр"
    ]
  }),
  methods: {
    ...mapActions([LOGIN_REQ]),
    login() {
      if (this.$refs.form.validate()) {
        this[LOGIN_REQ]({ username: this.username, password: this.password });
      }
    }
  }
};
</script>
