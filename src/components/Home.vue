<template>
  <div>
    <h1>Welcome</h1>

    <p>To the cmgt showcase website</p>

    <div v-if="tags && online" class="tag-container">
      <div v-for="(tag, index) in tags" :key="index" class="tag">
        {{ tag.name }}
      </div>
    </div>

    <div class="cards">
      <md-card v-for="(item, index) in projects" :key="index">
        <router-link
          :to="{ name: 'project', params: { slug: item.project.slug } }"
        >
          <md-card-media>
            <img
              v-bind:src="item.project.header_image[0]"
              loading="lazy"
              alt="Project header image"
              width="auto"
              height="50px"
            />
          </md-card-media>

          <md-card-header>
            <div class="md-title">{{ item.project.title }}</div>
          </md-card-header>
          <md-card-content
            v-html="
              item.project.description
                ? item.project.description.substr(0, 512)
                : ''
            "
          ></md-card-content>
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
      online: navigator.onLine,
    };
  },
  methods: {
    handleNetworkChange: function () {
      this.online = navigator.onLine;
    },
  },
  created: async function () {
    try {
      const res = await fetch("https://cmgt.hr.nl/api/projects");
      const projects = await res.json();
      this.projects = projects.data;
    } catch (error) {
      console.error(error);
      console.log("Error loading api data, offline & non cached?");
    }

    try {
      const res = await fetch("https://cmgt.hr.nl/api/tags");
      const tags = await res.json();
      this.tags = tags.data;
    } catch (error) {
      console.log("Network only resource failed to load");
    }
  },
  mounted: function () {
    window.addEventListener("online", this.handleNetworkChange);
    window.addEventListener("offline", this.handleNetworkChange);
  },
};
</script>