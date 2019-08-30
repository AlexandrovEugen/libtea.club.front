<template>
  <div>
    <h1 v-if="loading">Loading...</h1>
    <h1 v-if="error">К сожалению данный курс не найден</h1>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img :src="course.imgUrl" aspect-ratio="2"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{course.title}}</h3>
              <course-skill :skill="course.skill"/>
              <div>{{ course.description }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat icon color="indigo" to="/courses">
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-spacer/>
            <v-btn color="green" class="white--text" to="/contents">Тизер</v-btn>
            <v-btn color="green" class="white--text">Приобрести</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CourseSkill from "./CourseSkill";

export default {
  data: () => ({
    loading: false,
    error: false,
    course: null
  }),
  components: { CourseSkill },
  computed: {
    ...mapState({
      courses: state => state.courses.courses
    })
  },
  created() {
    this.findCourse();
  },
  watch: {
    $route: "findCourse"
  },
  methods: {
    findCourse() {
      let id = this.$route.params.id;
      if (this.courses) {
        this.course = this.courses.find(el => el.id == id);
        if (!this.course) {
          this.error = true;
        }
      } else {
        // Fetch from the server
      }
    }
  }
};
</script>
