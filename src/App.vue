<template>
  <div>
    <md-app md-waterfall md-mode="overlap">
      <md-app-toolbar class="md-primary md-large">
        <div class="md-toolbar-row">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">Cool CMGT Showcase Progressive Web App</span>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <b>Navigation</b>
        </md-toolbar>

        <md-list>
          <router-link :to="link.to" v-for="(link, index) in links" :key="index">
            <md-list-item>
              <md-icon>move_to_inbox</md-icon>
              <span>{{link.name}}</span>
            </md-list-item>
          </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  data: () => ({
    links: [
      {
        name: "Home",
        to: "/"
      },
      {
        name: "Project",
        to: "/project"
      },
      {
        name: "Bad Link",
        to: "/random-bad-url"
      }
    ],
    menuVisible: false
  })
};
</script>