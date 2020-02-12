<template>
  <div>
    <h1>Home</h1>

    <p>welcome to the cmgt showcase website</p>

    <ul>
      <li v-for="(project, index) in projects" :key="index">{{project.title}}</li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  color: blue;
}
</style>

<script>
import axios from "axios";

export default {
  data: () => {
    return {
      projects: [{ title: "loading.." }]
    };
  },
  methods: {},
  created: async function() {
    const req = await axios.get("https://cmgt.hr.nl:8000/api/projects/");
    this.projects = req.data.projects;
  }
};
</script>