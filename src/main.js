import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {
  MdApp,
  MdContent,
  MdToolbar,
  MdDrawer,
  MdButton,
  MdIcon,
  MdList,
  MdSnackbar,
  MdCard,
} from 'vue-material/dist/components'
// import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import localforage from 'localforage'


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

localforage.config({
  name: 'localforage'
});

Vue.use(MdApp)
Vue.use(MdDrawer)
Vue.use(MdContent)
Vue.use(MdToolbar)
Vue.use(MdButton)
Vue.use(MdIcon)
Vue.use(MdList)
Vue.use(MdSnackbar)
Vue.use(MdCard)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
