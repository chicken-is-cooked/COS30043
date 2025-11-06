const app = Vue.createApp({})

app.component('todo-list', {
    data:function() {
        return {
            newTask: '',
            tasks: []
        }
    },
    template:`
      <div class="container-fluid">
              <div class="row mb-4">
                <div class="col-12">
                  <label class="form-label fw-bold text-primary mb-2">Enter a new task</label>
                  <div class="input-group">
                    <input type="text" class="form-control form-control-lg" v-model="newTask" @keyup.enter="add" placeholder="What needs to be done?" />
                    <button class="btn btn-primary btn-lg px-4" @click="add">
                      <i class="bi bi-plus-circle me-1"></i>Add Task
                    </button>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <ul class="list-group list-group-flush">
                    <li v-for="(task, index) in tasks" :key="index" class="list-group-item d-flex justify-content-between align-items-start border rounded mb-2 shadow-sm">
                      <div class="ms-2 me-auto">
                        <div class="fw-medium fs-5 mb-1">{{ task.text }}</div>
                        <span v-if="task.high" class="badge bg-danger rounded-pill">
                          <i class="bi bi-exclamation-triangle me-1"></i>High Priority
                        </span>
                        <span v-else class="badge bg-info rounded-pill">
                          <i class="bi bi-info-circle me-1"></i>Low Priority
                        </span>
                      </div>

                      <div class="btn-group" role="group">
                        <button @click="togglePriority(task)" class="btn btn-outline-secondary btn-sm">
                          <i class="bi bi-arrow-up-down me-1"></i>
                          {{ task.high ? 'Lower Priority' : 'High Priority' }}
                        </button>
                        <button @click="deleteTask(index)" class="btn btn-outline-danger btn-sm">
                          <i class="bi bi-trash me-1"></i>Delete
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>`,
    methods: {
        add:function(){
            const text = this.newTask.trim();
            if (!text) return;

            const status = this.newTask.trim();
            if(status){
                this.tasks.push(
                    { text, high: false }
                );
                this.newTask = '';
            }

            },deleteTask:function(index){
                this.tasks.splice(index, 1);
            },
            togglePriority(task) {
                task.high = !task.high;
            }
    }
});
app.mount('#app');
