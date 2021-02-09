<template>
  <div v-if="projectItem.project.title">
    <div class="cards">
      <md-card>
        <md-card-media>
          <img
            v-if="projectItem.project.author != 'doggo'"
            v-bind:src="projectItem.project.header_image[0]"
            loading="lazy"
            alt="Project header image"
            width="auto"
            height="50px"
          />
          <img
            v-else
            v-bind:src="projectItem.project.headerImage"
            loading="lazy"
            alt="Project header image"
            width="auto"
            height="50px"
          />
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{ projectItem.project.title }}</div>
          <div class="md-subhead">{{ projectItem.project.tagline }}</div>
        </md-card-header>
        <md-card-content
          v-html="
            projectItem.project.description
              ? projectItem.project.description
              : ''
          "
        ></md-card-content>
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
      projectItem: {},
    };
  },
  mounted: async function () {
    try {
      const res = await fetch(
        `https://cmgt.hr.nl/api/projects/${this.$route.params.slug}`
      );
      const data = await res.json();
      this.projectItem = data;
    } catch (error) {
      localforage
        .getItem(`https://cmgt.hr.nl/api/projects/${this.$route.params.slug}`)
        .then((indexed) => {
          console.log("indexed", indexed);
          this.projectItem = indexed;
        });
      console.error(error);
      console.log("Error loading api data, offline & non cached?");
    }
  },
};
</script>