import axios from "axios";
import router from "@/router";

import {
  LOGIN_REQ,
  REGISTER_REQ,
  SHOW_TOAST,
  LOGOUT,
  LOAD_USER_INFO_REQ
} from "./actionTypes";

import { SET_AUTH, SET_USER, CLEAR_AUTH, SET_TOAST } from "./mutationTypes";

export default {
  [REGISTER_REQ]({ commit, dispatch }, payload) {
    axios
      .post("/api/register", payload)
      .then(res => {
        if (res.data.result === "SUCCESS") {
          dispatch(SHOW_TOAST, {
            type: "success",
            title: "Вы успешно зарегистрировались!"
          });
          commit(SET_AUTH, res.data.message);
          commit(SET_USER, res.data.data);
          router.push("/user/cabinet");
        }
      })
      .catch(err => {
        const { data } = err;
        if (data && data.result === "FAIL") {
          if (data.data) {
            dispatch(SHOW_TOAST, {
              type: "error",
              title: data.message,
              body: data.data
            });
          } else {
            dispatch(SHOW_TOAST, { type: "error", title: data.message });
          }
        }
      });
  },
  [LOGIN_REQ]({ commit, dispatch }, payload) {
    let data = {
      username: payload.username,
      password: payload.password
    };
    axios
      .post("/api/login", data)
      .then(res => {
        if (res.status === 200 && res.data.result == "SUCCESS") {
          commit(SET_AUTH, res.data.message);
          commit(SET_USER, res.data.data);
          router.push("/user/cabinet");
        }
      })
      .catch(error => {
        const { data } = error;
        if (data && data.result === "FAIL") {
          dispatch(SHOW_TOAST, {
            title: "Неверный логин или пароль",
            type: "error"
          });
        }
      });
  },
  [LOAD_USER_INFO_REQ]({ commit }) {
    axios
      .get("/api/info")
      .then(res => {
        commit(SET_USER, res.data.data);
      })
      .catch(err => console.log(err));
  },
  [SHOW_TOAST]({ commit }, payload) {
    commit(SET_TOAST, { isShow: true, ...payload });
    setTimeout(
      () =>
        commit(SET_TOAST, {
          isShow: false,
          title: "",
          message: "",
          type: "success"
        }),
      5000
    );
  },
  [LOGOUT]({ commit }) {
    commit(CLEAR_AUTH);
    commit(SET_USER, null);
    router.push("/login");
  }
};
