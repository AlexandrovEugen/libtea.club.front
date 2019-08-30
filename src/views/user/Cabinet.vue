<template>
  <cabinet-layout :items="items">
    <router-view/>
  </cabinet-layout>
</template>

<script>
import CabinetLayout from "@/components/layout/CabinetLayout";

export default {
  components: { CabinetLayout },
  data() {
    return {
      items: [
        { title: "Профиль", icon: "dashboard", url: "/user/cabinet" },
        { title: "Пользователи", icon: "child_care", url: "/user/users" }
      ]
    };
  }
};
</script>
