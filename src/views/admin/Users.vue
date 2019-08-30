<template>
  <div>
    <h1>Users</h1>
    {{ users }}
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { LOAD_USERS_REQ } from "@/store/modules/admin/actionTypes";

export default {
  created() {
    this.loadUsers();
  },
  computed: {
    ...mapState({ users: state => state.admin.users })
  },
  methods: {
    ...mapActions([LOAD_USERS_REQ]),
    loadUsers() {
      this[LOAD_USERS_REQ]();
    }
  }
};
</script>
