<template>
  <v-toolbar app color="#ce4906" class="white--text" fixed>
    <v-toolbar-side-icon @click="switchMenu" v-if="showMenuIcon" class="hidden-md-and-up">
      <v-icon color="white">menu</v-icon>
    </v-toolbar-side-icon>
    <v-toolbar-title
      class="headline text-uppercase font-weight-regular hoverable-title"
      @click="$router.push('/')"
    >
      Чайный Клуб
      <span class="font-weight-light caption font-italic" style="margin-right: 2px"> политическое движение</span>
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-for="(item, index) in menu" :key="index" :to="item.link" flat>{{ item.title }}</v-btn>
      <v-btn flat class="mr-2" to="/login" v-if="!isAuthenticated">Войти</v-btn>
      <template v-else>
        <v-btn flat class="mr-2" to="/user/cabinet">Профиль</v-btn>
        <v-btn flat class="mr-2" @click="logout">Выйти</v-btn>
      </template>
    </v-toolbar-items>
    <v-menu class="hidden-md-and-up">
      <v-toolbar-side-icon slot="activator">
        <v-icon color="white">more_vert</v-icon>
      </v-toolbar-side-icon>
      <v-list>
        <v-list-tile v-for="(item, index) in menu" :key="index" @click="$router.push(item.link)">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile flat class="mr-2" @click="$router.push('/login')" v-if="!isAuthenticated">
          <v-list-tile-content>
            <v-list-tile-title>Войти</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <template v-else>
          <v-list-tile flat class="mr-2" @click="$router.push('/user/cabinet')">
            <v-list-tile-content>
              <v-list-tile-title>Профиль</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile flat class="mr-2" @click="logout">
            <v-list-tile-content>
              <v-list-tile-title>Выйти</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { LOGOUT } from "@/store/actionTypes";
import { CLICK_MENU, SET_MENU_ICON } from "@/store/mutationTypes";

export default {
  data: () => ({
    menu: [
      { icon: "home", title: "Главная", link: "/" },
      { icon: "home", title: "Вступить", link: "/join" },
      { icon: "home", title: "О нас", link: "/about" }
    ]
  }),
  created() {
    const path = this.$route.path;
    this[SET_MENU_ICON](
      path.startsWith("/user") ||
        path.startsWith("/admin") ||
        path.startsWith("/teacher")
    );
  },
  watch: {
    $route(to) {
      this[SET_MENU_ICON](
        to.path.startsWith("/user") ||
          to.path.startsWith("/admin") ||
          to.path.startsWith("/teacher")
      );
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState(["showMenuIcon"])
  },
  methods: {
    ...mapActions([LOGOUT]),
    ...mapMutations([CLICK_MENU, SET_MENU_ICON]),
    logout() {
      this[LOGOUT]();
    },
    switchMenu() {
      this[CLICK_MENU]();
    }
  }
};
</script>

<style scoped>
.hoverable-title:hover {
  cursor: pointer;
}
</style>
