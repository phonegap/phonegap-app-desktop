<template>
    <el-dialog title="New Project" :visible.sync="newProjectDialogVisible" size="full">
    <el-steps :space="250" :active="active">
    <el-step title="Step 1" description="SELECT A TEMPLATE"></el-step>
    <el-step title="Step 2" description="PROJECT DETAILS"></el-step>  
    
    
    <!--<transition name="el-fade-in">-->
    <div v-show="!showProjProps">        
        <el-form >
        <el-form-item>
            <el-radio class="radio" v-model="templateName" label="1">Hello World</el-radio>
        </el-form-item>
        <el-form-item> 
            <el-radio class="radio" v-model="templateName" label="2">Blank</el-radio>
        </el-form-item>
        <el-form-item> 
            <el-radio class="radio" v-model="templateName" label="3">Framework7</el-radio>
        </el-form-item>
            <el-form-item> 
            <el-radio class="radio" v-model="templateName" label="4">Push Notifications</el-radio>
            </el-form-item>
            <el-form-item> 
            <el-radio class="radio" v-model="templateName" label="5">Wikitude</el-radio>
            </el-form-item>
            <el-form-item> 
            <el-radio class="radio" v-model="templateName" label="6">React Hot Loader</el-radio>
            </el-form-item>  
        <el-button @click="showProjProps=true;active=2">Ok</el-button>              
        </el-form>
    </div>
    <!--</transition>-->
    
    <div>
    <!--<transition name="el-fade-in">-->
        <div v-show="showProjProps">
            <project-props-form></project-props-form>
        </div>
    <!--</transition>-->
    </div>            
    </el-steps>
    <span slot="footer" class="dialog-footer">
        <el-button @click="newProjectDialogVisible = true; showProjProps=false; active=1;">Back</el-button>
        <el-button @click="newProjectDialogVisible = false; showProjProps=false;">Cancel</el-button>
        <el-button type="primary" @click="newProjectDialogVisible = false; showProjProps=false;">Ok</el-button>            
    </span>
</el-dialog>
</template>
<script>
import ProjectPropsForm from './ProjectPropsForm'

export default {
  name: 'new-project-dialog',
  components: {
    'project-props-form': ProjectPropsForm
  },
  data () {
    return {
      showProjProps: false,
      showClose: false,
      newProjectDialogVisible: true,
      active: 1
    }
  }
}
</script>

