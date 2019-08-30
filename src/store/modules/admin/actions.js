import axios from "axios";
import { LOAD_USERS_REQ } from "./actionTypes";
import { SET_USERS } from "./mutationTypes";

export default {
  [LOAD_USERS_REQ]({ commit }) {
    axios
      .get("/api/admin/users")
      .then(res => {
        commit(SET_USERS, res.data.data);
      })
      .catch(err => console.log(err));
  }
};
