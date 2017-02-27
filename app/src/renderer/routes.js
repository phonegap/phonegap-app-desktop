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
    path: 'about',
    name: 'about',
    component: require('components/about')
  }
]
