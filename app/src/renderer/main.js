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

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Framework7Vue)

Vue.config.debug = true

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  data: {
    projects3: ['test123']
  },
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

console.log('Framework7 ' + vm + Framework7 + ProjectList + Framework7Theme + Framework7ThemeColors)
