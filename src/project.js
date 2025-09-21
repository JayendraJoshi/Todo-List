export class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.id = crypto.randomUUID();
  }
  setName(name) {
    this.name = name;
  }
  addTask(task) {
    this.tasks.push(task);
  }
  getTasks() {
    return this.tasks;
  }
  getTaskByID(id) {
    return this.tasks.find(function (task) {
      return task.id === id;
    });
  }
  deleteTaskByID(id) {
    const filteredTasks = this.tasks.filter((task) => task.id !== id);
    this.tasks = filteredTasks;
  }
}

export const handleProjects = function () {

  function createProject(name){
    return new Project(name);
  }

  return {
    createProject
  };
};
