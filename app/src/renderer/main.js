import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'

// import routes from './routes'
import axios from 'axios'

import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App.vue'

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)

Vue.config.debug = true

var arIcon = 'ar-icon.png'
var stIcon = 'st-icon.png'
var pgIcon = 'pg-icon.png'
var pushIcon = 'push-icon.png'

// Global store defaults
window.store = {
  fetch: function () {
    console.log('Running fetch')
    var projects = JSON.parse(localStorage.getItem('phonegap-projects')) || []
    projects = [{name: 'Star Track', version: 'v1.1.2', path: '~/my-phonegap-projects/star-track', icon: stIcon}, {name: 'Push Sample', version: 'v2.1.0', path: '~/my-phonegap-projects/push-demo', icon: pushIcon}, {name: 'Wikitude Demo', version: 'v0.1.2', path: '~/my-phonegap-projects/wikitude-demo', icon: arIcon}, {name: 'Blank', version: 'v1.0.1', path: '~/my-phonegap-projects/blank-demo', icon: pgIcon}, {name: 'Awesome Sauce', version: 'v1.1.2', path: '~/my-phonegap-projects/awesome-sauce', icon: pgIcon}]
    projects.forEach(function (todo, index) {
      projects.id = index
    })
    window.store.count = projects.length
    return projects
  },
  save: function () {
    localStorage.setItem('phonegap-projects', JSON.stringify(this.projects))
  }
}
/* eslint-disable no-new */
new Vue({
  // components: { App },
  router,
  store,
  el: '#app',
  render: h => h(App)
})

