<template>
  <div>
    <md-app md-waterfall md-mode="overlap">
      <md-app-toolbar class="md-primary md-large">
        <div class="md-toolbar-row">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">
            CMGT Showcase App
            <span v-if="!online">(OFFLINE)</span>
          </span>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <b>Navigation</b>
        </md-toolbar>

        <md-list>
          <router-link :to="link.to" v-for="(link, index) in links" :key="index">
            <md-list-item>
              <md-icon>{{link.icon}}</md-icon>
              <span>{{link.name}}</span>
            </md-list-item>
          </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>

      <md-snackbar
        md-position="center"
        md-duration="4000"
        :md-active.sync="showSnackbar"
        md-persistent
      >
        <span>{{snackbarMsg}}bla bla bla</span>
        <md-button class="md-primary" @click="showSnackbar = false">Retry</md-button>
      </md-snackbar>
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
        to: "/",
        icon: "home"
      },
      {
        name: "Project",
        to: "/project",
        icon: "label"
      }
    ],
    menuVisible: false,
    online: navigator.onLine,
    snackbarMsg: "",
    showSnackbar: true
  }),
  methods: {
    handleNetworkChange: function() {
      console.log("networkchange");
      this.online = navigator.onLine;

      if (this.online) {
        this.snackbarMsg = "Back online! browse awayyyy!";
        this.showSnackbar = true;
      } else {
        this.snackbarMsg = "Device offline :( content may be limited ";
        this.showSnackbar = true;
      }
    }
  },
  mounted: function() {
    window.addEventListener("online", this.handleNetworkChange);
    window.addEventListener("offline", this.handleNetworkChange);
  }
};
</script>