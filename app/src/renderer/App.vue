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
          <project-list/>
        </f7-pages>
      </f7-view>   
      
      <f7-popup id="popup-new" tablet-fullscreen class="theme-bluegray">        
        <f7-navbar>
          <f7-nav-left>            
          </f7-nav-left>
          <f7-nav-center sliding>New App Project</f7-nav-center>
          <f7-nav-right>                                  
          </f7-nav-right>
        </f7-navbar>

        <f7-card>
            <f7-card-content>            
              <f7-list form>
                <f7-list-item>
                    <f7-input id="nm" type="text" placeholder="Name"/>            
                    <f7-link icon-f7="info" open-popover="#popover-name"></f7-link>
                    <f7-popover id="popover-name">
                      <div class="popover-angle"></div>
                        <div class="popover-inner">
                            <p>The display name for your app.</p>                                                            
                        </div>                
                    </f7-popover>      
                </f7-list-item>

                <f7-list-item>
                  <f7-input type="text" placeholder="ID"/>
                  <f7-link icon-f7="info" open-popover="#popover-id"></f7-link>
                  <f7-popover id="popover-id">
                      <div class="popover-angle"></div>
                        <div class="popover-inner">                              
                            <p>The unique identifier across app stores. We recommend you use a reverse domain namespace format (ie: com.phonegap.helloworld).</p>                                                            
                        </div>                
                  </f7-popover>             
                </f7-list-item>

                <f7-list-item>
                  <f7-input id="localPath" type="text" placeholder="Local Path"/>
                  <f7-button class="btn" fill color="blue" @click='selectPath'>Browse ...</f7-button>
                  <f7-link icon-f7="info" open-popover="#popover-path"></f7-link>                          
                  <f7-popover id="popover-path">
                      <div class="popover-angle"></div>
                        <div class="popover-inner">                              
                            <p>The location where the project will be stored on your computer.</p>                                                            
                        </div>                
                  </f7-popover>                     
                </f7-list-item>                      
            </f7-list>   
          </f7-card-content>            
        </f7-card>

        <f7-grid>
          <f7-col>         
            <f7-card>        
            <f7-card-header>Choose a Layout...</f7-card-header>
            <f7-card-content>  
              <f7-list>           
                  <f7-list-item radio name="my-radio" value="1" title="Blank" checked></f7-list-item>          
                  <f7-list-item radio name="my-radio" value="2" title="Split View"></f7-list-item>              
                  <f7-list-item radio name="my-radio" value="3" title="Tabs"></f7-list-item>          
              </f7-list>  
            </f7-card-content>            
          </f7-card>
          </f7-col>
          
          <f7-col>
          <f7-card>
            <f7-card-header>or Sample Template</f7-card-header>
            <f7-card-content>
              <f7-list>   
                <f7-list-item radio name="my-radio" value="4" title="Star Track"></f7-list-item>          
                <f7-list-item radio name="my-radio" value="5" title="React Hot Loader"></f7-list-item>              
                <f7-list-item radio name="my-radio" value="6" title="Augmented Reality"></f7-list-item>
              </f7-list>   
            </f7-card-content>                    
          </f7-card>      
          
          </f7-col>
        </f7-grid>
        <f7-button @click="addProj" color="green" class="btn" style="float: right" fill close-popup="#popup-new">Done</f7-button>          
      </f7-popup>    
    </f7-views>
  </div>
      
</template>
    

<script>
  import store from 'renderer/vuex/store'
  import ProjectList from './components/ProjectList'
  export default {
    name: 'app',
    store,
    components: {
      'project-list': ProjectList
    },
    data () {
      return {}
    },
    methods: {
      selectPath () {
        console.log('selecting path')
        var dialog = require('electron').remote.dialog
        var path = dialog.showOpenDialog({properties: ['openDirectory']})
        console.log(path)
        // this.$$('localPath').val(path)
        document.getElementById('localPath').value = path
      },
      addProj () {
        console.log('Proj ' + ProjectList)
      }
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
