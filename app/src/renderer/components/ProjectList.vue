<template>
  <f7-page>    
    <f7-navbar sliding>
      <f7-nav-left>
        <f7-link icon="fa fa-bars" open-panel="left"></f7-link>
      </f7-nav-left>
      <f7-nav-center>
        PhoneGap Desktop
      </f7-nav-center>
    </f7-navbar>
    <f7-block inner>      
      <f7-card v-for="project in projects">
        <f7-card-header>      
          <div class="col-10">Local Path:</div>
          <div class="col-90"><a href="">{{project.path}}</a></div>
        </f7-card-header>
        <f7-card-content>
          <div class="row">
              <div class="col-33"><img :src="project.icon" width="64" height="64"/>          </div>
              <div class="col-33"><div class="name"><h2>{{ project.name }}</h2></div></div>
            <div class="col-33"><f7-chip :text="project.version" bg="bluegray" color="white"></div>
              
          </div>
<!--          
          
          
          
            <div class="col-33"><h4>Local Path:</h4></div>
            <div class="col-33"><a href="">{{project.path}}</a></div>
            <div class="col-33"></div>-->
          
      
          <!--<img src="../img/pg-logo.png">-->
        </f7-card-content>
        <f7-card-footer>
          <f7-link @click="start">Start</f7-link>
          <f7-link @click="stop">Stop</f7-link>
          <f7-link @click="remove">Remove</f7-link>          
        </f7-card-footer>
      </f7-card>
      <div style="height: 56px">&nbsp;</div>     
    </f7-block>    
  </f7-page>  
</template>

<script>
export default {
  name: 'project-list',
  data () {
    return {
      // Had to specify these here to load statically from dist
      arIcon: 'ar-icon.png',
      stIcon: 'st-icon.png',
      pgIcon: 'pg-icon.png',
      pushIcon: 'push-icon.png',
      show: false,
      projects: []
    }
  },
  methods: {
    addProjects () {
      this.projects = [{name: 'Star Track', version: 'v1.1.2', path: '~/my-phonegap-projects/star-track', icon: this.stIcon}, {name: 'Push Sample', version: 'v2.1.0', path: '~/my-phonegap-projects/push-demo', icon: this.pushIcon}, {name: 'Wikitude Demo', version: 'v0.1.2', path: '~/my-phonegap-projects/wikitude-demo', icon: this.arIcon}, {name: 'Blank', version: 'v1.0.1', path: '~/my-phonegap-projects/blank-demo', icon: this.pgIcon}, {name: 'Awesome Sauce', version: 'v1.1.2', path: '~/my-phonegap-projects/awesome-sauce', icon: this.pgIcon}]
      window.localStorage.setItem('projects', JSON.stringify(this.projects))
    },
    getProjects () {
      this.projects = JSON.parse(window.localStorage.getItem('projects'))
    }
  },
  created () {
    this.projects = []
    this.addProjects()
    this.getProjects()
    console.log('Projs ' + this.projects)
  }
}
</script>
