<template>
  <div>
    <h1>Welcome</h1>

    <p>To the cmgt showcase website</p>

    <div class="cards">
      <md-card v-for="(project, index) in projects" :key="index">
        <md-card-media>
          <img
            v-bind:src="'https://cmgt.hr.nl:8000/'+project.headerImage"
            loading="lazy"
            alt="Project header image"
            width="auto"
            height="50px"
          >
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{project.title}}</div>
          <div class="md-subhead">{{project.description ? project.description.substr(0, 255) : ""}}</div>
        </md-card-header>
      </md-card>
    </div>
  </div>
</template>

<style scoped>
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
    console.log(req.data);
    this.projects = req.data.projects;
  }
};
</script>