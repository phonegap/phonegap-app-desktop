<template>
  <!-- App -->
  <div id="app">

    <!-- Right Panel -->
    <f7-panel right cover layout="dark" class="theme-blue">
      <f7-view id="right-panel-view" navbar-through :dynamic-navbar="true">
        <f7-navbar title="Settings" sliding></f7-navbar>
        <f7-pages>
          <f7-page>            
            <f7-block>
              <f7-list form style="text-align: left;"> 
                <f7-list-item>
                  <f7-label>Server Port</f7-label>                                    
                  <f7-input type="text" placeholder="3000"/>                                    
                </f7-list-item>  
                <f7-list-item>                              
                  <f7-label>Collect Diagnostics</f7-label>                                    
                  <input type="checkbox" name="diag-checkbox" checked style="font-size: 16px"/>
                <!--<f7-list-item checkbox name="my-checkbox" value="1" checked>                -->
                </f7-list-item> 
                <f7-list-item>
                  <f7-label></f7-label>                                                      
                </f7-list-item>  
              </f7-list>
            </f7-block>            
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>

    <!-- Main Views -->
    <f7-views class="theme-blue">
        <f7-view id="main-view" class="view-main" navbar-through :dynamic-navbar="true" main>
        <f7-navbar>
          <f7-nav-left>
            <f7-link icon="icon-plus" open-popup="#popup-new"></f7-link>                        
          </f7-nav-left>
          <f7-nav-center sliding>PhoneGap Desktop</f7-nav-center>
          <f7-nav-right>                       
            <f7-link icon-f7="settings" open-panel="right"></f7-link>
          </f7-nav-right>
        </f7-navbar>
        <!-- Pages -->
        <f7-pages >
          <project-list v-bind:projects="projects"/>
        </f7-pages>
      </f7-view>   
          <new-project v-bind:projects="projects"/>       
    </f7-views>
  </div>      
</template>
    

<script>
  import ProjectList from './components/ProjectList'
  import NewProject from './components/NewProject'
  export default {
    name: 'app',
    components: {
      'project-list': ProjectList,
      'new-project': NewProject
    },
    data () {
      return {
        projects: []
      }
    },
    methods: {//
    },
    created () {
      this.projects = window.store.fetch()
    }
  }
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
      );
    background-position: center;
    display: flex;
    font-family: Lato, Helvetica, sans-serif;
    justify-content: center;
    text-align: center;
  }
  .btn {
    margin-right: 10px;
    width: 115px;
    
  }
  </style>
  <style>
  /* Tooltip container */
  .tooltip {
      position: relative;
      display: inline-block;    
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
      visibility: hidden;
      width: 120px;
      height: 30px;
      font-size: 12px;
      background-color: burlywood;
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;
      margin-top: 20px;
      /*margin-left: 100px;*/
      position: absolute;
      z-index: 1;
  }

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>
/*
    .desc {
      font-size: x-small;
    }
        
    /*.view-detail {
      display: block;
      width: 500px;
    }  
    .view-main {
      float: left;        
      width: 300px;
      border-right: 1px solid #b2b2b2;
    }    
    .view-detail .navbar .navbar-inner .back {
      display: none;
    }
    .item-link .item-content .item-inner {
      background-image: none;
    }*/
</style>
