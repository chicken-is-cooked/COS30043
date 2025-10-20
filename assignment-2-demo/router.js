// style/router.js
window.router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/overview' },
    { path: '/overview', component: window.JobOverview, name: 'overview' },
    { path: '/job/:id', component: window.JobDetail, name: 'job' },
    { path: '/:pathMatch(.*)*', redirect: '/overview' } // fallback
  ]
});
