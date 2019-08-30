import { SET_USERS } from "./mutationTypes";

export default {
  [SET_USERS](state, payload) {
    state.users = payload;
  }
};
