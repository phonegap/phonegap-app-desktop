export default [
  {
    path: '',
    component: require('components/ProjectList')
  },
  {
    path: '/',
    component: require('components/ProjectList')
  },
  {
    path: '*',
    component: require('components/ProjectList')
  },
  {
    path: 'project-list',
    component: require('components/ProjectList')
  },
  {
    path: 'form',
    name: 'form',
    component: require('components/form')
  },
  {
    path: 'about',
    name: 'about',
    component: require('components/about')
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    name: 'dynamic-route',
    component: require('components/dynamic-route')
  }
]
