import Vue from "vue";
import Vuex from "vuex";

import courses from "./modules/courses";
import user from "./modules/user";
import admin from "./modules/admin";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: [],
    toast: { isShow: false, title: "", message: "", type: "success" },
    user: null,
    token: localStorage.getItem("auth"),
    showMenuIcon: false,
    showMenu: false
  },
  mutations,
  actions,
  getters,
  modules: {
    courses,
    user,
    admin
  }
});
