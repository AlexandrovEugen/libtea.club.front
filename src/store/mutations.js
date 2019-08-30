import {
  SET_USER,
  SET_AUTH,
  CLEAR_AUTH,
  SET_LOADED,
  SET_LOADING,
  SET_TOAST,
  CLICK_MENU,
  SET_MENU_ICON
} from "./mutationTypes";

export default {
  [SET_USER](state, payload) {
    if (payload) {
      state.user = { ...payload, role: payload.roles[0] };
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      state.user = null;
      localStorage.removeItem("user");
    }
  },
  [SET_AUTH](state, payload) {
    state.token = payload;
    localStorage.setItem("auth", payload);
  },
  [CLEAR_AUTH](state) {
    state.token = null;
    localStorage.removeItem("auth");
  },
  [SET_LOADING](state, val) {
    state.loading = [...state.loading, val];
  },
  [SET_LOADED](state, val) {
    state.loading = state.loading.filter(el => el !== val);
  },
  [SET_TOAST](state, val) {
    state.toast = val;
  },
  [CLICK_MENU](state) {
    state.showMenu = !state.showMenu;
  },
  [SET_MENU_ICON](state, payload) {
    state.showMenuIcon = payload;
  }
};
