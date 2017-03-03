<template>
  
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
                    <f7-input id="nm" type="text" v-model="name" placeholder="Name"/>            
                    <f7-link icon-f7="info" open-popover="#popover-name"></f7-link>
                    <f7-popover id="popover-name">
                      <div class="popover-angle"></div>
                        <div class="popover-inner">
                            <p>The display name for your app.</p>                                                            
                        </div>                
                    </f7-popover>      
                </f7-list-item>

                <f7-list-item>
                  <f7-input type="text" v-model="id" placeholder="ID"/>
                  <f7-link icon-f7="info" open-popover="#popover-id"></f7-link>
                  <f7-popover id="popover-id">
                      <div class="popover-angle"></div>
                        <div class="popover-inner">                              
                            <p>The unique identifier across app stores. We recommend you use a reverse domain namespace format (ie: com.phonegap.helloworld).</p>                                                            
                        </div>                
                  </f7-popover>             
                </f7-list-item>

                <f7-list-item>
                  <f7-input id="localPath" type="text" v-model="localPath" placeholder="Local Path"/>
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
        <f7-button @click="addProject" color="green" class="btn" style="float: right" fill close-popup="#popup-new">Done</f7-button>          
      </f7-popup>    
</template>

<script>
export default {
  name: 'new-project',
  props: ['projects'],
  data () {
    return {
      name: '',
      localPath: '',
      id: '',
      // Had to specify these here to load statically from dist
      arIcon: 'ar-icon.png',
      stIcon: 'st-icon.png',
      pgIcon: 'pg-icon.png',
      pushIcon: 'push-icon.png'
    }
  },
  methods: {
    selectPath () {
      console.log('selecting path')
      var dialog = require('electron').remote.dialog
      this.localPath = dialog.showOpenDialog({properties: ['openDirectory']})
      console.log('New Path ' + this.localPath)
    },
    addProject () {
      let proj = {name: this.name, id: this.id, version: '1.0.0', icon: this.pgIcon, path: this.localPath}
      this.projects.push(proj)
      // clear form fields
      this.name = this.id = this.icon = this.localPath = ''
      console.log('This ' + this.name)
    }
  }
}
</script>
