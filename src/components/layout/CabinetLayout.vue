<template>
  <v-layout wrap>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" :to="item.url">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-flex sm4 md3 class="hidden-sm-and-down">
      <v-card>
        <v-list dense class="pt-0">
          <v-list-tile v-for="item in items" :key="item.title" :to="item.url">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs12 md9>
      <slot></slot>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { CLICK_MENU } from "@/store/mutationTypes";

export default {
  props: { items: Array },
  computed: {
    ...mapState(["showMenu"]),
    drawer: {
      get() {
        return this.showMenu;
      },
      set(val) {
        if (this.showMenu != val) {
          this[CLICK_MENU]();
        }
      }
    }
  },
  methods: {
    ...mapMutations([CLICK_MENU])
  }
};
</script>
