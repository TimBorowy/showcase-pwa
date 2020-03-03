<template>
  <div>
    <h1>{{project.title}}</h1>

    <div class="cards">
      <md-card>
        <md-card-media>
          <img
            v-if="project.author != 'doggo'"
            v-bind:src="'https://cmgt.hr.nl:8000/'+project.headerImage"
            loading="lazy"
            alt="Project header image"
            width="auto"
            height="50px"
          >
          <img
            v-else
            v-bind:src="project.headerImage"
            loading="lazy"
            alt="Project header image"
            width="auto"
            height="50px"
          >
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{project.tagline}}</div>
          <div class="md-subhead">{{project.description ? project.description : ""}}</div>
        </md-card-header>
      </md-card>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import localforage from "localforage";

export default {
  name: "project",
  data: () => {
    return {
      project: {}
    };
  },
  created: async function() {
    try {
      const res = await fetch(
        `https://cmgt.hr.nl:8000/api/projects/${this.$route.params.slug}`
      );
      const data = await res.json();
      this.project = data;
    } catch (error) {
      localforage
        .getItem(
          `https://cmgt.hr.nl:8000/api/projects/${this.$route.params.slug}`
        )
        .then(indexed => {
          console.log("indexed", indexed);
          this.project = indexed;
        });
      console.error(error);
      console.log("Error loading api data, offline & non cached?");
    }
  }
};
</script>