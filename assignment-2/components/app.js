// components/app.js
window.App = {
  components: { JobList: window.JobList },
  template: '#app-tpl',
  data() { return { jobs: window.JOBS }; }
};
