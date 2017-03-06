<template>
  <f7-page>    
    <f7-navbar sliding navbar-fixed pull-to-refresh @ptr:refresh="onRefresh">
      <f7-nav-left>
        <f7-link icon="fa fa-bars" open-panel="left"></f7-link>
      </f7-nav-left>
      <f7-nav-center>
        PhoneGap Desktop
      </f7-nav-center>
    </f7-navbar>
    <f7-block inner>  

      <f7-card v-for="project in projs">        
        <f7-card-header>      
          <span>Local Path: <a href="">{{ project.path }}</a></span>
        </f7-card-header>
        <f7-card-content>
          <div class="row">
              <div class="col-33"><img :src="project.icon" width="64" height="64"/></div>
              <div class="col-33"><div class="name"><h2>{{ project.name }}</h2></div></div>
            <div class="col-33"><f7-chip :text="project.version" bg="bluegray" color="white"></f7-chip></div>              
          </div>
        </f7-card-content>
        <f7-card-footer>
          <!--<f7-link @click="openBrowser">Open Dashboard</f7-link>-->
          <f7-link @click="openBrowser">Start</f7-link>
          <f7-link @click="stop">Stop</f7-link>          
          <f7-link @click="removeProject(project)">Remove</f7-link>          
        </f7-card-footer>
      </f7-card>
      <div style="height: 56px">&nbsp;</div>     
    </f7-block>    
  </f7-page>  
</template>

<script>
export default {
  name: 'project-list',
  props: ['projects'],
  data () {
    return {
      // store in a new var so we can mutate
      projs: this.projects,
      // Had to specify these here to load statically from dist
      arIcon: 'ar-icon.png',
      stIcon: 'st-icon.png',
      pgIcon: 'pg-icon.png',
      pushIcon: 'push-icon.png',
      show: false
    }
  },
  methods: {
    openBrowser (event) {
      var shell = require('electron').shell
      // open links externally by default - will use for dashboard server to open in browser
      // with iframe containing the served app
      event.preventDefault()
      shell.openExternal('http://localhost:3000/')
      // shell.openExternal('file:///Users/hschinsk/vueElectron/dashboard/index.html')
    },
    onRefresh (event, done) {
      setTimeout(() => {
        console.log('close')
        done()
      }, 2000)
    },
    stop () {},
    removeProject (proj) {
      // console.log('Projs length in project list before remove ' + this.projs.length)
      var idx = this.projects.indexOf(proj)
      console.log('Project to remove ' + proj.path + idx)
      this.projs.splice(idx, 1)
      console.log('Projs length in project list after remove ' + this.projs.length)
    }
  },
  created () {
    console.log('Projs length in project list ' + this.projects.length)
  }
}
</script>
