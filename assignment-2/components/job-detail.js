// components/job-detail.js
window.JobDetail = {
  template: '#job-detail-tpl',
  data() { return { jobs: window.JOBS }; },
  computed: {
    job() {
      const id = this.$route.params.id;
      return this.jobs.find(j => j.job_id === id) || null;
    }
  }
};
