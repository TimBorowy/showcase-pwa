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
            <span v-if="!online">
              <md-icon>signal_wifi_off</md-icon>
            </span>
          </span>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <b>Navigation</b>
        </md-toolbar>

        <md-list>
          <router-link to="/">
            <md-list-item>
              <md-icon>home</md-icon>
              <span>Home</span>
            </md-list-item>
          </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
        <md-snackbar md-position="center" :md-active.sync="showSnackbar" md-persistent>
          <span>{{snackbarMsg}}</span>
          <md-button class="md-primary" @click="showSnackbar = false">Dismis</md-button>
        </md-snackbar>
      </md-app-content>
    </md-app>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  data: () => ({
    menuVisible: false,
    online: navigator.onLine,
    snackbarMsg: "",
    showSnackbar: false
  }),
  methods: {
    handleNetworkChange: function() {
      console.log("networkchange");
      this.online = navigator.onLine;

      if (this.online) {
        this.snackbarMsg = "Back online! browse awayyy!";
        this.showSnackbar = true;
      } else {
        this.snackbarMsg = "Device offline :( content may be limited";
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