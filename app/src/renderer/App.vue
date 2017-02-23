<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left reveal layout="dark">
      <!--<f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">-->
      <f7-view id="left-panel-view">
        <f7-navbar title="Left Panel"></f7-navbar>
        <f7-pages>
          <f7-page>
            <f7-block inner>
              <p>Left panel content goes here</p>
            </f7-block>
            <f7-block-title>Load page in panel</f7-block-title>
            <f7-list>
              <f7-list-item link="/about/" title="About"></f7-list-item>
              <f7-list-item link="/form/" title="Form"></f7-list-item>
            </f7-list>
            <f7-block-title>Load page in main view</f7-block-title>
            <f7-list>
              <f7-list-item link="/about/" title="About" link-view="#main-view" link-close-panel></f7-list-item>
              <f7-list-item link="/form/" title="Form" link-view="#main-view" link-close-panel></f7-list-item>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>

    <!-- Right Panel -->
    <f7-panel right cover layout="dark">
      <!--<f7-view id="right-panel-view" navbar-through :dynamic-navbar="true">-->
      <f7-view id="right-panel-view">
        <f7-navbar title="Right Panel" sliding></f7-navbar>
        <f7-pages>
          <f7-page>
            <f7-block>
              <p>Right panel content goes here</p>
            </f7-block>
            <f7-block-title>Load page in panel</f7-block-title>
            <f7-list>
              <f7-list-item link="/about/" title="About"></f7-list-item>
              <f7-list-item link="/form/" title="Form"></f7-list-item>
            </f7-list>
            <f7-block-title>Load page in main view</f7-block-title>
            <f7-list>
              <f7-list-item link="/about/" title="About" link-view="#main-view" link-close-panel></f7-list-item>
              <f7-list-item link="/form/" title="Form" link-view="#main-view" link-close-panel></f7-list-item>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>

    <!-- Main Views -->
    <f7-views theme="cyan">
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <!-- Navbar -->
        <f7-navbar>
          <f7-nav-left>
            <f7-link icon="icon-plus" open-panel="left"></f7-link>
          </f7-nav-left>
          <f7-nav-center sliding>PhoneGap Projects</f7-nav-center>
          <f7-nav-right>            
            <f7-link icon-f7="settings"></f7-link>
            <!--<f7-link icon="icon f7-icon home" open-panel="left">home</f7-link>          -->            
          </f7-nav-right>
        </f7-navbar>
        <!-- Pages -->
        <f7-pages >
          <project-list/>          
        </f7-pages>
      </f7-view>    
  </div>
</template>

<f7-popup tablet-fullscreen>
  <p>Project Name</p>
</f7-popup>
<f7-link open-popup>New Project</f7-link>  
    
    

<script>
  import store from 'renderer/vuex/store'
  import ProjectList from './components/ProjectList'
  export default {
    store,
    components: {
      'project-list': ProjectList
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
</style>
