// Global component theo style của bạn
window.ToDoList = {
  name: 'ToDoList',
  data() {
    return {
      newTask: '',

      tasks: []
    };
  },
  methods: {
    addTask() {
      const text = this.newTask.trim();
      if (!text) return;

      this.tasks.unshift({ id: Date.now(), text, high: false });
      this.newTask = '';
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    },
    togglePriority(task) {
      task.high = !task.high;
    }
  },
  template: '#todo-list-tpl'
};
