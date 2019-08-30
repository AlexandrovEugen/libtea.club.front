<template>
  <v-layout row wrap>
    <CourseCard v-for="(course, index) in courses" :key="index" :course="course"/>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import CourseCard from "./CourseCard";

export default {
  name: "courses",
  computed: mapState({ courses: state => state.courses.courses }),
  components: { CourseCard }
};
</script>
