import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'
import routes from './routes'
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
import 'framework7-icons/css/framework7-icons.css'
import App from './App'
import ProjectList from './components/ProjectList'
// require('./file-menu')
// import { fetchProjectsFromLocalStorage } from './utils/projects';

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Framework7Vue)

Vue.config.debug = true

// Global store defaults
window.store = {
  fetch: function () {
    console.log('Running fetch')
    var projects = JSON.parse(localStorage.getItem('phonegap-projects')) || []
    projects = [{name: 'Star Track', version: 'v1.1.2', path: '~/my-phonegap-projects/star-track', icon: this.stIcon}, {name: 'Push Sample', version: 'v2.1.0', path: '~/my-phonegap-projects/push-demo', icon: this.pushIcon}, {name: 'Wikitude Demo', version: 'v0.1.2', path: '~/my-phonegap-projects/wikitude-demo', icon: this.arIcon}, {name: 'Blank', version: 'v1.0.1', path: '~/my-phonegap-projects/blank-demo', icon: this.pgIcon}, {name: 'Awesome Sauce', version: 'v1.1.2', path: '~/my-phonegap-projects/awesome-sauce', icon: this.pgIcon}]
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
const vm = new Vue({
  el: '#app',
  // data: {
  // projects: this.projects
  // },
  framework7: {
    root: '#app',
    routes: routes,
    material: true
  },
  // Register App Component
  components: {
    app: App
  },
  ...App
}).$mount('#app')

// const projects = JSON.parse(localStorage.getItem('phonegap-projects')) || []

console.log('Framework7 ' + vm + Framework7 + ProjectList + Framework7Theme + Framework7ThemeColors)
