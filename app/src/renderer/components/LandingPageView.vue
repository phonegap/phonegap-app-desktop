<template>
  <div>
    <!--<img src="./LandingPageView/assets/icon1.png" alt="electron-vue">    
    <img src="./LandingPageView/assets/logo.png" alt="electron-vue">
    <img src="./LandingPageView/assets/pg-logo.png" alt="electron-vue">-->
    <img src="./LandingPageView/assets/ar-icon.png" alt="electron-vue">
    <h1>Welcome.</h1>
    <current-page></current-page>
    <versions></versions>
    <links></links>
  </div>
</template>

<script>
  import CurrentPage from './LandingPageView/CurrentPage'
  import Links from './LandingPageView/Links'
  import Versions from './LandingPageView/Versions'
  export default {
    components: {
      CurrentPage,
      Links,
      Versions
    },
    name: 'landing-page2'
  }
</script>

<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>
