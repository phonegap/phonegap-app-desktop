<template>
    <el-form :label-position="left" label-width="100px" :model="projectProps">
      <el-form-item label="Name">
          <el-input v-model="projectProps.projName"></el-input>
      </el-form-item>
      <el-form-item label="Local Path">
          <el-input v-model="projectProps.projPath"></el-input>         
          <el-button @click="selectPath">...</el-button>    
      </el-form-item>
      <el-form-item label="ID">
          <el-input v-model="projectProps.projID"></el-input>
      </el-form-item>
    
    </el-form>
</template>
<style>
  .el-input {
    width: 260px;
  }
</style>
<script>
  export default {
    name: 'project-props-form',
    data () {
      return {
        labelPosition: 'right',
        projectProps: {
          projName: '',
          projPath: '',
          projID: ''
        }
      }
    },
    methods: {
      addProject () {
        let proj = {name: this.projName, id: this.projID, version: '1.0.0', icon: this.pgIcon, path: this.localPath}
        this.projects.push(proj)
        // clear form fields
        this.projName = this.projID = this.icon = this.projPath = ''
      },
      selectPath () {
        console.log('Selecting project path')
        var dialog = require('electron').remote.dialog
        this.projectProps.projPath = dialog.showOpenDialog({properties: ['openDirectory']})
        console.log('Path ' + this.localPath)
      }
    }
  }
</script>
