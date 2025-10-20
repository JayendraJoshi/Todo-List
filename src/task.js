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
  function updateTask(task, newValues) {
    task.setName(newValues.taskFormName);
    task.setDescription(newValues.taskFormDescription);
    console.log(newValues.taskDueDate);
    if (newValues.taskFormDueDate) {
      task.setDueDate(newValues.taskFormDueDate);
    } else {
      task.setDueDate("");
    }
    task.setIsImportant(newValues.isTaskFormImportant);
  }
  function createNewTask(values) {
      const newTask = new Task(
        values.taskFormName,
        values.taskFormDescription,
        values.isTaskFormImportant
      );
      newTask.setDueDate(values.taskFormDueDate);
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
  function getAllInputValuesFromTask(targetTask) {
    const taskName = targetTask.getName();
    const taskDescription = targetTask.getDescription();
    const taskDate = targetTask.getDueDate();
    const isImportant = targetTask.getIsImportant();

    return {
      taskName,
      taskDescription,
      taskDate,
      isImportant,
    };
  }

  return {
    updateTask,
    createNewTask,
    getTodaysTasks,
    getNext7DaysTasks,
    getImportantTasks,
    getUnplannedTasks,
    getAllInputValuesFromTask
  };
};
