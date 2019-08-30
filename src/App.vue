<template>
  <v-app>
    <app-header/>
    <v-content>
      <v-progress-linear v-if="isLoading" :indeterminate="true"/>
      <v-container fluid grid-list-lg>
        <router-view/>
        <v-snackbar
          absolute
          top
          auto-height
          right
          v-model="toast.isShow"
          :color="toast.type"
          multi-line
        >
          <v-layout column>
            <v-flex xs12 class="text-xs-center">
              <span class="subheading font-weight-light text-truncate">{{toast.title}}</span>
            </v-flex>
            <v-flex v-if="toast.body" xs12>
              <v-layout column class="font-weight-light text-truncate" v-if="Array.isArray(toast.body)">
                <v-flex xs12 v-for="(item, indx) in toast.body" :key="indx">{{item}}</v-flex>
              </v-layout>
              <span v-else class="font-weight-light text-truncate">{{toast.body}}</span>
            </v-flex>
          </v-layout>
        </v-snackbar>
      </v-container>
    </v-content>
    <app-footer/>
  </v-app>
</template>
<script>
import AppHeader from "./components/layout/AppHeader";
import AppFooter from "./components/layout/AppFooter";
import { mapGetters, mapState } from "vuex";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    ...mapGetters(["isLoading", "snackbar"]),
    ...mapState(["toast"])
  },
  data() {
    return {
      //
    };
  }
};
</script>
