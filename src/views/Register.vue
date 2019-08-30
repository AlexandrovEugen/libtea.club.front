<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Регистрация</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              name="secondName"
              label="Фамилия"
              v-model="secondName"
              type="text"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              name="firstName"
              label="Имя"
              v-model="firstName"
              type="text"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              name="thirdName"
              label="Отчество"
              type="text"
              v-model="thirdName"
              :rules="thirdNameRules"
            ></v-text-field>
            <v-text-field
              name="username"
              type="username"
              label="Email"
              v-model="username"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              id="password"
              name="password"
              label="Пароль"
              type="password"
              v-model="password"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-text-field
              id="confirm"
              name="confirm"
              label="Повторите пароль"
              type="password"
              v-model="confirm"
              :rules="confirmRules"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn flat color="primary" @click="register">Зарегистрироваться</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { validateEmail } from "@/utils/validate";
import { REGISTER_REQ } from "@/store/actionTypes";
import { mapActions } from "vuex";

export default {
  data: () => ({
    valid: false,
    firstName: "",
    secondName: "",
    thirdName: "",
    password: "",
    confirm: "",
    passwordRules: [
      v => !!v || "Обязательное поле",
      v => v.length > 5 || "Минимальная длина пароля 6 символов"
    ],
    nameRules: [
      v =>
        !v ||
        /[а-яА-ЯЁёA-Za-z]+$/g.test(v) ||
        "Вы ввели неподдерживаемые символы",
      v => !!v || "Обязательное поле"
    ],
    thirdNameRules: [
      v =>
        !v ||
        /[а-яА-ЯЁёA-Za-z]+$/g.test(v) ||
        "Вы ввели неподдерживаемые символы"
    ],
    username: "",
    emailRules: [
      v => !!v || "E-mail обязательно поле",
      v => validateEmail(v) || "Неверный формат E-mail"
    ]
  }),
  computed: {
    confirmRules() {
      return [
        v => !!v || "Обязательное поле",
        v => v.length > 5 || "Минимальная длина пароля 6 символов",
        v => v === this.password || "Пароли не совдают"
      ];
    }
  },
  methods: {
    ...mapActions([REGISTER_REQ]),
    register() {
      if (this.$refs.form.validate()) {
        this[REGISTER_REQ]({
          username: this.username,
          firstName: this.firstName,
          secondName: this.secondName,
          thirdName: this.thirdName,
          password: this.password,
          confirm: this.confirm
        });
      }
    }
  }
};
</script>
