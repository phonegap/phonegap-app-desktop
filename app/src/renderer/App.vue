<template>
  <div id="app">
  <!--  <router-view></router-view>-->
  
    <!-- Add Project Popup -->
    <el-row class="tac">    
      <el-col :span="3">
      <el-popover
            ref="popover1"
            placement="right-start"
            width="180" height="40"
            trigger="click" transition="el-zoom-in-center">        
            <el-menu default-active="1" theme="dark">      
                <el-menu-item index="1" @click="handleCreate"><h4>Create New Project</h4></el-menu-item>
                <el-menu-item index="2" @click="handleOpen"><h4>Open Project</h4></el-menu-item>
            </el-menu>                   
      </el-popover>
            
      
      <!-- Help Popup -->
      <el-popover
            ref="popover2"
            placement="right-start"
            width="180" height="40"
            trigger="click" transition="el-zoom-in-center">                                       
              <el-menu default-active="1" theme="dark">      
                  <el-menu-item index="1" @click="handleAbout"><h4>About</h4></el-menu-item>
                  <el-menu-item index="2" @click="handleTutorials"><h4>Tutorials</h4></el-menu-item>
                  <el-menu-item index="3" @click="handleReport"><h4>Report Issue</h4></el-menu-item>
                  <el-menu-item index="4" @click="handleTerms"><h4>Terms of Use</h4></el-menu-item>
                  <el-menu-item index="5" @click="handlePrivacy"><h4>Privacy Policy</h4></el-menu-item>
              </el-menu>                                           
        </el-popover>

        <!-- Settings Dialog -->
        <el-dialog title="Settings" :visible.sync="settingsDialogVisible" size="large" :show-close="showClose">
          <el-form :label-position="lblPos">
            <el-form-item label="Server Port">
              {{ ipAddress }}<el-input v-model="port"></el-input>
            </el-form-item>

            <el-form-item label="Diagnostic & Usage Data">
              <el-checkbox v-model="checked">Send anonymous diagnostic and usage data?</el-checkbox>
            </el-form-item>          
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="settingsDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="settingsDialogVisible = false">Ok</el-button>
          </span>
        </el-dialog>

        <!--<div v-show="newProjectDialogVisible">-->
        <el-dialog title="New Project" :visible.sync="newProjectDialogVisible" size="full" :show-close="showClose">
          <el-steps :space="250" :active="active">
            <el-step title="Step 1" description="SELECT A TEMPLATE"></el-step>
            <el-step title="Step 2" description="PROJECT DETAILS"></el-step>  
            
            
          <!--<transition name="el-fade-in">-->
            <div v-show="!showProjProps">        
              <el-form >
              <el-radio-group v-model="templateChoice">
                <el-form-item>
                  <el-radio label='Blank'>Blank</el-radio>    
                </el-form-item>
                <el-form-item>
                  <el-radio label='Tabs'>Tabs</el-radio>    
                </el-form-item>
                <el-form-item>
                  <el-radio label='Split'>Split View</el-radio>    
                </el-form-item>    
                <el-form-item>
                  <el-radio label='Star'>Star Track</el-radio>    
                </el-form-item>   
                <el-form-item>
                  <el-radio label='Todos'>Todos</el-radio>    
                </el-form-item>                                                         
              </el-radio-group>                       
              </el-form>
              <el-button @click="onBtnNext">Next >></el-button>                           
            </div>
          <!--</transition>-->
            
            <div>
                <!--<transition name="el-zoom-in-top">-->
                <div v-show="showProjProps">
                  <project-props-form></project-props-form>
                  <el-button @click="onBtnBack"><< Back</el-button>                  
                </div>
                <!--</transition>-->
              </div>            
          </el-steps>
          <span slot="footer" class="dialog-footer">
            <el-button @click="onBtnCancel">Cancel</el-button>
            <el-button type="primary" @click="onBtnNewOk">Ok</el-button>            
          </span>
        </el-dialog>

        
        <!-- Menu -->
        <el-menu default-active="1" theme="dark" class="fixed">                
          <el-menu-item index="1" v-popover:popover1><h2><i class="el-icon-plus pad"></i></h2></el-menu-item>         
          <el-menu-item index="2"><h2><i class="el-icon-minus pad"></i></h2></el-menu-item>
          <el-menu-item index="3" @click="settingsDialogVisible=true"><h2><i class="el-icon-setting pad"></i></h2></el-menu-item>
          <el-menu-item index="4"><h2><i class="el-icon-document pad"></i></h2></el-menu-item>
          <el-menu-item v-popover:popover2 index="5"><h2><i class="el-icon-information pad"></i></h2></el-menu-item>
        </el-menu>         
      </el-col>

      
      <!-- Projects List -->
      <el-col :span="8">      
          <div v-for="project in projects" class="right">
            <el-card :body-style="{ padding: '0px' }" style="width: 400px; height: 150px;" class="grey">
              <div slot="header" class="clearfix header">
                <img :src="project.icon" width="64" height="64" class="image">        
                <span class="title">{{ project.name }}</span>
                <span class="version">{{ project.version }}</span>              
                <img class="img1" src="stop.svg">                  
                <img class="img1" src="start-active.svg">                  
                <div class="small">                
                  <span>Local path:</span> <span class="blue">{{ project.path }}</span>             
                </div>
              </div>
            </el-card>
          </div>
      </el-col>

  </el-row>
  </div>
</template>    

<script>
import store from 'renderer/vuex/store'
import NewProjectDialog from './components/NewProjectDialog'
import ProjectPropsForm from './components/ProjectPropsForm'

export default {
  store,
  components: {
    'new-project-dialog': NewProjectDialog,
    'project-props-form': ProjectPropsForm
  },
  data () {
    return {
      showProjProps: false,
      showClose: false,
      templateChoice: 'Blank',
      lblPos: 'top',
      ipAddress: '127.0.0.1:',
      port: '3000',
      projects: [],
      settingsDialogVisible: false,
      newProjectDialogVisible: false,
      checked: true,
      active: 1
    }
  },
  created () {
    this.projects = window.store.fetch()
  },
  methods: {
    onBtnNewOk () {
      this.showProjProps = false
      this.newProjectDialogVisible = false
      this.active = 1
    },
    onBtnCancel () {
      this.showProjProps = false
      this.newProjectDialogVisible = false
      this.active = 1
    },
    onBtnNext () {
      this.showProjProps = true
      this.active = 2
    },
    onBtnBack () {
      this.newProjectDialogVisible = true
      this.showProjProps = false
      this.active = 1
    },
    showPropsForm () {
      this.active = 2
    },
    handleCreate () {
      this.templateChoice = 'Blank'
      this.newProjectDialogVisible = true
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handlePrivacy () {
    },
    handleAbout () {
    },
    handleTutorials () {
    },
    handleTerms () {
    },
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'Test notification!',
        duration: 6000
      })
    }
  }
}
</script>

<style>
form {
  padding-top: 30px; 
}
.img1 {
  float: right;
  display: table; 
  margin-right: 5px; 
}
.fixed {
  position: fixed;
  height: 100%;
  padding-bottom: 200px;
  z-index: 0;
}
.clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
.small {
  padding-top: 10px;
  font-size: 12px;
  font-style: normal;
}
.grey {
  background-color: #E8E9E9;
}
.transition-box {    
    width: 350px;
    height: 500px;
    border-radius: 0px;
    margin-bottom: 1px;
    border-color: black;
    background-color: #E8E9E9;
    text-align: center;
    color: darkgray;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
.blue {
  color: blue;
}

.header {    
  margin: auto;
}
.title {
  position: absolute;
  padding-left: 5px;
  font-weight: bold;
}
.version {
  position: absolute;
  padding-top: 25px;
  padding-left: 5px;
  font-weight: normal;
}
.el-popover[x-placement^=right] .popper__arrow::after {
    bottom: -6px;
    left: 1px;
    border-right-color: #2D3033;
    border-left-width: 0;    
}
.el-popover[x-placement^=right] {    
    margin-left: 0px;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0px;
}
.el-menu--dark{background-color:#2D3033}
.el-submenu__title:hover{background-color:#2D3033}
.el-popover {background-color:#2D3033; padding: 0px; margin: 0px}

.pad {  
  height: 100px;
}
.el-menu-item {
  color: white;   
  
}

.right {
  padding-left: 70px;
}
.el-card {
  border: none;
}
  

</style>
