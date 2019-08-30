<template>
  <div>
    <v-icon color="orange" v-for="(s, indx) in Array(skill).keys()" :key="'s' + indx">star</v-icon>
    <template v-if="skill <= 5">
      <v-icon v-for="(s, indx) in Array(5-skill).keys()" :key=" 'ns' + indx">star_border</v-icon>
    </template>
  </div>
</template>

<script>
export default {
  props: { skill: Number }
};
</script>
