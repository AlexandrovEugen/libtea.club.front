import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {SET_LOADED, SET_LOADING} from "./store/mutationTypes";
import {LOGOUT, SHOW_TOAST} from "./store/actionTypes";
import axios from "axios";

axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("auth");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    store.commit(SET_LOADING, config.url);
    return config;
});

axios.interceptors.response.use(
    response => {
        store.commit(SET_LOADED, response.config.url);
        return Promise.resolve(response);
    },
    error => {
        store.commit(
            SET_LOADED,
            error.response ? error.response.config.url : error.config.url
        );
        if (
            !(error.response &&
                (error.response.status === 401 || error.response.status === 403))
        ) {
            return Promise.reject(error.response);
        } else {
            if (
                localStorage.getItem("auth") ||
                router.history.current.path !== "/login"
            ) {
                store.dispatch(LOGOUT);
                router.replace("login");
                store.dispatch(SHOW_TOAST, {
                    type: "warning",
                    title: "Время жизни сессии истекло"
                });
            } else {
                store.dispatch(SHOW_TOAST, {
                    type: "error",
                    title: "Неверный логин или пароль"
                });
            }
            return Promise.reject(error);
        }
    }
);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
