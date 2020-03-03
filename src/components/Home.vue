<template>
  <div>
    <h1>Welcome</h1>

    <p>To the cmgt showcase website</p>

    <div v-if="tags && online" class="tag-container">
      <div v-for="(tag, index) in tags" :key="index" class="tag">{{tag}}</div>
    </div>

    <div class="cards">
      <md-card v-for="(project, index) in projects" :key="index">
        <router-link :to="{ name: 'project', params: { slug: project.slug }}">
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
            <div
              class="md-subhead"
            >{{project.description ? project.description.substr(0, 255) : ""}}</div>
          </md-card-header>
        </router-link>
      </md-card>
    </div>
  </div>
</template>

<style scoped>
.tag-container {
  display: flex;
  flex-flow: wrap;
  margin-bottom: 10px;
}
.tag {
  padding: 5px;
  margin: 5px;
  color: #fff;
  border-radius: 5px;
  background: #448aff;
}
</style>

<script>
export default {
  name: "home",
  data: () => {
    return {
      projects: [],
      tags: null,
      online: navigator.onLine
    };
  },
  methods: {
    handleNetworkChange: function() {
      this.online = navigator.onLine;
    }
  },
  created: async function() {
    try {
      const res = await fetch("https://cmgt.hr.nl:8000/api/projects/");
      const data = await res.json();
      this.projects = data.projects;
    } catch (error) {
      console.error(error);
      console.log("Error loading api data, offline & non cached?");
    }

    try {
      const res = await fetch("https://cmgt.hr.nl:8000/api/projects/tags/");
      const data = await res.json();
      this.tags = data.tags;
    } catch (error) {
      console.log("Network only resource failed to load");
    }
  },
  mounted: function() {
    window.addEventListener("online", this.handleNetworkChange);
    window.addEventListener("offline", this.handleNetworkChange);
  }
};
</script>