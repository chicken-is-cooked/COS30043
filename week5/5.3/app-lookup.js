// Defining the list of units in an array (điền đúng mẫu, không thêm bớt)
var units = [
  {code:'ICT10001', desc:'Problem Solving with ICT', cp:12.5, type:'Core'},
  {code:'COS10005', desc:'Web Development', cp:12.5, type:'Core'},
  {code:'INF10003', desc:'Introduction to Business Information Systems', cp:12.5, type:'Core'},
  {code:'INF10002', desc:'Database Analysis and Design', cp:12.5, type:'Core'},
  {code:'COS10009', desc:'Introduction to Programming', cp:12.5, type:'Core'},
  {code:'INF30029', desc:'Information Technology Project Management', cp:12.5, type:'Core'},
  {code:'ICT30005', desc:'Professional Issues in Information Technology', cp:12.5, type:'Core'},
  {code:'ICT30001', desc:'Information Technology Project', cp:12.5, type:'Core'},
  {code:'COS20016', desc:'Operating System Configuration', cp:12.5, type:'Software Development'},
  {code:'SWE20001', desc:'Development Project 1 - Tools and Practices', cp:12.5, type:'Software Development'},
  {code:'COS30015', desc:'IT Security', cp:12.5, type:'Software Development'},
  {code:'COS30043', desc:'Interface Design and Development', cp:12.5, type:'Software Development'},
  {code:'COS30017', desc:'Software Development for Mobile Devices', cp:12.5, type:'Software Development'}
];

// creating a component for the units to pass in the router
const Unit = {
  data() { 
    return { units }; 
  },
  // define the template for the route results
  template: `
    <div v-if="filteredUnits.length" class="card shadow-sm">
      <div class="card-body">
        <h4 class="card-title mb-3">{{ filteredUnits[0].code }} — {{ filteredUnits[0].desc }}</h4>
        <p class="mb-1"><strong>Credit Point:</strong> {{ filteredUnits[0].cp }}</p>
        <p class="mb-3"><strong>Type:</strong> {{ filteredUnits[0].type }}</p>
        <router-link to="/">← Back to all units</router-link>
      </div>
    </div>
    <div v-else class="alert alert-warning" role="alert">
      Unit not found. <router-link to="/">Go back</router-link>
    </div>
  `,
  computed: {
    // filter function (returns the selected unit object)
    filteredUnits: function() {
      const id = this.$route.params.id; // lấy :id từ URL
      return this.units.filter(u => u.code === id);
    }
  }
};

// Creating the VueRouter
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [{
    path: '/unit/:id',
    component: Unit
  }]
});

// create new app instance
const app = Vue.createApp({});

// creating component for the lookup table
app.component('app-lookup2', {
  data: function() {
    return { units };
  },
  // defining template for the app
  template: `
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>Unit Code</th>
            <th>Unit</th>
            <th>Credit Point</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in units" :key="u.code">
            <td><router-link :to="'/unit/' + u.code">{{ u.code }}</router-link></td>
            <td>{{ u.desc }}</td>
            <td>{{ u.cp }}</td>
            <td>{{ u.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// use router, mount to app
app.use(router);
app.mount('#app');
