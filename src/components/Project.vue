<template>
  <div>
    <h1>Project: {{project.title}}</h1>
    <p>{{$route.params.slug}}</p>

    <div class="cards">
      <md-card>
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
  methods: {
    storeResults: () => {
      localforage
        .setItem("key", "value2")
        .then(function() {
          return localforage.getItem("key");
        })
        .then(function() {
          // we got our value
        })
        .catch(function() {
          // we got an error
        });
    },
    getProject: async slug => {
      try {
        const store = await localforage.getItem(slug);
        this.project = store;
        console.log("project from storage", store);
      } catch (err) {
        console.log(err);
        console.log("error getting project from storage");
      }
    }
  },
  created: async function() {
    this.storeResults();
    try {
      const res = await fetch(
        `https://cmgt.hr.nl:8000/api/projects/${this.$route.params.slug}`
      );
      const data = await res.json();
      localforage.setItem(data.slug, data);

      // this line needs to go
      this.project = data;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>