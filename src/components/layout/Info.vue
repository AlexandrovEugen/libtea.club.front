<template>
  <v-card>
    <v-card-title>Кабинет</v-card-title>
    <v-card-text>{{ user }}</v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { LOAD_USER_INFO_REQ } from "@/store/actionTypes";

export default {
  created() {
    this.getUserInfo();
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions([LOAD_USER_INFO_REQ]),
    getUserInfo() {
      this[LOAD_USER_INFO_REQ]();
    }
  }
};
</script>
