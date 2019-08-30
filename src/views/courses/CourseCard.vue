<template>
  <v-flex md4 xs12>
    <v-hover>
      <v-card
        slot-scope="{ hover }"
        color="cyan darken-2"
        class="white--text"
        hover
        :to="`/courses/${course.id}`"
      >
        <v-layout>
          <v-flex xs5>
            <v-img :src="course.imgUrl" height="150px" contain></v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{course.title}}</div>
                <!-- <div>Foster the People</div>
                <div>(2014)</div>-->
                <div>{{course.smallDescription}}</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <!-- v-hover fun -->
        <v-expand-transition class="hidden-sm-and-down">
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal headline white--text"
            style="height: 100%; width: 100%"
          >{{course.price}} &#x20bd;</div>
        </v-expand-transition>
        <div
          class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal headline white--text hidden-md-and-up"
          style="height: 30%; width: 25%"
        >{{course.price}} &#x20bd;</div>

        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <span class="course-complexity">Сложность курса</span>
          <course-skill :skill="course.skill"/>
        </v-card-actions>
      </v-card>
    </v-hover>
  </v-flex>
</template>

<script>
import CourseSkill from "./CourseSkill";

export default {
  name: "course-card",
  components: { CourseSkill },
  props: { course: Object }
};
</script>

<style scoped>
.course-complexity {
  margin-right: 10px;
}

.v-card--reveal {
  align-items: center;
  top: 0;
  right: 0;
  justify-content: center;
  opacity: 0.6;
  position: absolute;
  width: 100%;
}
</style>
