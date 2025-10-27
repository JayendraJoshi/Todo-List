import { Task } from "./task";
export class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.id = crypto.randomUUID();
  }
  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
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
  setTasksArray(tasks) {
    this.tasks = tasks;
  }
  deleteTaskByID(id) {
    const filteredTasks = this.tasks.filter((task) => task.id !== id);
    this.tasks = filteredTasks;
  }
  getID() {
    return this.id;
  }
  setID(id) {
    this.id = id;
  }
  static fromJson(jsonProject) {
    const project = new Project(jsonProject.name);
    project.setID(jsonProject.id);
    project.setTasksArray(
      jsonProject.tasks.map((jsonTask) =>
        Task.fromJson(jsonTask, project.getID()),
      ),
    );
    return project;
  }
}

export const handleProjects = function () {
  function createProject(name) {
    return new Project(name);
  }

  return {
    createProject,
  };
};
