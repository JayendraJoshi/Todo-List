import { isToday, isAfter, isBefore, addDays, startOfDay } from "date-fns";
export class Task {
  constructor(name, description, isImportant) {
    this.name = name;
    this.description = description;
    this.dueDate = "";
    this.id = crypto.randomUUID();
    this.projectID = null;
    this.isImportant = isImportant;
  }
  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  setDescription(description) {
    this.description = description;
  }
  getDescription() {
    return this.description;
  }
  setDueDate(dueDate) {
     if (dueDate) {
        this.dueDate = new Date(dueDate);
    } else {
        this.dueDate = "unplanned"; 
    }
  }
  getDueDate() {
    return this.dueDate;
  }
  getID(){
    return this.id;
  }
  setID(id){
    this.id = id;
  }
  setProjectID(id) {
    this.projectID = id;
  }
  getProjectID() {
    return this.projectID;
  }
  setIsImportant(isImportant) {
    this.isImportant = isImportant;
  }
  getIsImportant() {
    return this.isImportant;
  }
  static fromJson(jsonTask, projectID){
    const task = new Task(jsonTask.name,jsonTask.description,jsonTask.isImportant);
    task.setID(jsonTask.id);
    task.setDueDate(jsonTask.dueDate);
    task.setProjectID(projectID);
    return task;
  }
}
export const handleTasks = function () {
  function updateTask(task, formValues) {
    task.setName(formValues.name);
    task.setDescription(formValues.description);
    if (formValues.dueDate) {
      task.setDueDate(formValues.dueDate);
    } else {
      task.setDueDate("");
    }
    task.setIsImportant(formValues.isImportant);
  }
  function createNewTask(formValues) {
      const newTask = new Task(
        formValues.name,
        formValues.description,
        formValues.isImportant
      );
      newTask.setDueDate(formValues.dueDate);
      return newTask;
  }
  function getTodaysTasks(projectList) {
    const todaysTasks = [];
    const allProjects = projectList.getAllProjects();
    for (let i = 0; i < allProjects.length; i++) {
      let tasks = allProjects[i].getTasks();
      for (let j = 0; j < tasks.length; j++) {
        if (isToday(tasks[j].dueDate)) {
          todaysTasks.push(tasks[j]);
        }
      }
    }
    return todaysTasks;
  }
  function isDateInNext7Days(date) {
    const today = startOfDay(new Date());
    const sevenDaysFromNow = addDays(today, 7);
    return isAfter(date, today) && isBefore(date, sevenDaysFromNow);
  }
  function getNext7DaysTasks(projectList) {
    const next7DaysTasks = [];
    const allProjects = projectList.getAllProjects();
    for (let i = 0; i < allProjects.length; i++) {
      let tasks = allProjects[i].getTasks();
      for (let j = 0; j < tasks.length; j++) {
        if (isDateInNext7Days(tasks[j].dueDate)) {
          next7DaysTasks.push(tasks[j]);
          console.log(tasks[j]);
        }
      }
    }
    return next7DaysTasks;
  }
  function getImportantTasks(projectList) {
    const importantTasks = [];
    const allProjects = projectList.getAllProjects();
    for (let i = 0; i < allProjects.length; i++) {
      let tasks = allProjects[i].getTasks();
      for (let j = 0; j < tasks.length; j++) {
        if (tasks[j].getIsImportant() === true) {
          importantTasks.push(tasks[j]);
        }
      }
    }
    return importantTasks;
  }
  function getUnplannedTasks(projectList) {
    const unplannedTasks = [];
    const allProjects = projectList.getAllProjects();
    for (let i = 0; i < allProjects.length; i++) {
      let tasks = allProjects[i].getTasks();
      for (let j = 0; j < tasks.length; j++) {
        if (tasks[j].dueDate == "unplanned") {
          unplannedTasks.push(tasks[j]);
        }
      }
    }
    return unplannedTasks;
  }
  function getTaskFormValues(task) {
    return {
      name: task.getName(),
      description: task.getDescription(),
      dueDate: task.getDueDate(),
      isImportant: task.getIsImportant(),
    };
  }

  return {
    updateTask,
    createNewTask,
    getTodaysTasks,
    getNext7DaysTasks,
    getImportantTasks,
    getUnplannedTasks,
    getTaskFormValues
  };
};
