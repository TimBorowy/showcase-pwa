<template>
  <div>
    <h1>Welcome</h1>

    <p>To the cmgt showcase website</p>

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
</style>

<script>
export default {
  name: "home",
  data: () => {
    return {
      projects: [{ title: "loading.." }]
    };
  },
  methods: {},
  created: async function() {
    try {
      const res = await fetch("https://cmgt.hr.nl:8000/api/projects/");
      const data = await res.json();
      this.projects = data.projects;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>