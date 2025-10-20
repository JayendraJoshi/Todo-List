import "./styles.css";
import { handleProjectList,ProjectList } from "./projectList";
import { handleProjects} from "./project";
import { handleTasks} from "./task";
import {
  handleProjectDomManipulation,
  handleTaskDomManipulation,
  handleGeneralDomManipulation,
} from "./dom";

export const wrapperFunctions = function () {
  const projectList = new ProjectList();
  const projectListFunctions = handleProjectList();

  const projectFunctions = handleProjects();
  const projectDomFunctions = handleProjectDomManipulation();

  const taskFunctions = handleTasks();
  const taskDomFunctions = handleTaskDomManipulation();

  const generalDomFunctions = handleGeneralDomManipulation();

  // general
  function startUpFunctions() {
    if(storageAvailable("localStorage")){
      if(localStorage.getItem("projectList")){
        loadDataFromStorage();
      }else{
        initializeDefaultProject();
        taskDomFunctions.createAndAppendAddTaskButtonToContentDiv();
      }
    }
  }
  function createAndAppendAddTaskButtonToContentDiv(){
    taskDomFunctions.createAndAppendAddTaskButtonToContentDiv();
  }
  // filter
  function clickEventOnAllTasksDiv() {
    taskDomFunctions.updateTaskVisibility(projectList.getAllTasks());
  }
  function clickEventOnTodayTaskDiv() {
    taskDomFunctions.updateTaskVisibility(taskFunctions.getTodaysTasks(projectList));
  }
  function clickEventOnUnplannedTaskDiv() {
    taskDomFunctions.updateTaskVisibility(taskFunctions.getUnplannedTasks(projectList)); 
  }
  function clickEventOnNext7DaysDiv() {
    taskDomFunctions.updateTaskVisibility(taskFunctions.getNext7DaysTasks(projectList));
  }
  function clickEventOnImportantTaskDiv() {
    taskDomFunctions.updateTaskVisibility(taskFunctions.getImportantTasks(projectList));
  }
  function updateFilterViewIfActive(){
    const activeFilterElement = document.querySelector(".active-view.filter");
    if(activeFilterElement){
      clickEventOnFilter(activeFilterElement);
    }
  }
  function clickEventOnFilter(targetFilter) {
    generalDomFunctions.removeActiveViewClass();
    generalDomFunctions.addActiveViewClass(targetFilter);
    const filterType = targetFilter.dataset.filterType;
    projectList.setActiveFilterType(filterType);
    callTargetFilterEvent(filterType);
  }
  function callTargetFilterEvent(filterType){
    closeOpenTaskForm();
    closeOpenProjectForm();
    taskDomFunctions.hideAddTaskButton();
    if (filterType == "all") {
        clickEventOnAllTasksDiv();
    } else if (filterType == "today") {
        clickEventOnTodayTaskDiv();
    } else if (filterType == "unplanned") {
        clickEventOnUnplannedTaskDiv();
    } else if (filterType == "next7Days") {
        clickEventOnNext7DaysDiv();
    } else if (filterType == "important") {
        clickEventOnImportantTaskDiv();
    }
    generalDomFunctions.updateContentContainerTitle();
    updateStorage();
  }
  // projects
  function clickEventOnAddProjectButton() {
    if (!document.querySelector(".projectForm")) {
      projectDomFunctions.createAndAppendProjectFormOnProjectContainer();
    }
    updateStorage();
  }
  function clickEventOnAddProjectFormButton(event) {
    //event.preventDefault();
    const projectForm = document.querySelector(".projectForm");
    const projectName = projectDomFunctions.getNameValueOfProjectForm();
    if(projectName.length!=0){
     const project = projectFunctions.createProject(projectName);
    projectList.addProject(project);
    projectList.setActiveProjectByID(project.id);
    projectDomFunctions.createAndAppendProjectDivToProjectContainer(project);
    generalDomFunctions.updateContentContainerTitle();
    taskDomFunctions.updateTaskVisibility(projectList.getActiveProject().getTasks()); 
    if(document.querySelector(".addTaskButton")){
      generalDomFunctions.removeHiddenClass(document.querySelector(".addTaskButton"));
    }
    }
    projectForm.remove();
    generalDomFunctions.removeActiveViewClass();
    updateStorage();
  }
  function initializeDefaultProject() {
    const defaultProject = projectFunctions.createProject("default");
    projectList.addProject(defaultProject);
    projectList.setActiveProjectByID(defaultProject.id);
    
    projectDomFunctions.createAndAppendProjectDivToProjectContainer(defaultProject);
    generalDomFunctions.updateContentContainerTitle();
  }
  function closeOpenProjectForm(){
    const projectForm = document.querySelector(".projectForm");
    if(projectForm){
      if(projectForm.classList.contains("projectEditForm")){
        projectForm.remove();
        const projectDiv = document.querySelector(".project-beeing-edited");
        generalDomFunctions.removeHiddenClass(projectDiv);
        projectDiv.classList.remove("project-beeing-edited");
      }else{
        projectForm.remove();
      }
    }
  }
  function clickEventOnProjectDiv(targetProjectDiv) {
    const targetProject = projectList.getProjectByID(targetProjectDiv.id);
    projectList.setActiveProjectByID(targetProject.id);
    const activeProject = projectList.getActiveProject();
    generalDomFunctions.updateContentContainerTitle();
    taskDomFunctions.updateTaskVisibility(activeProject.getTasks());
    generalDomFunctions.removeHiddenClass(document.querySelector(".addTaskButton"));
    closeOpenTaskForm();
    generalDomFunctions.removeActiveViewClass();
    generalDomFunctions.addActiveViewClass(targetProjectDiv);
    updateStorage();
  }
  function clickEventOnProjectOptionIcon(projectDiv){
    if(document.querySelector(".optionsButtonsContainer.active")){
        removeActiveClassFromOptionsButtonsContainer();
      }
    const optionsButtonsContainer = projectDiv.querySelector(".optionsButtonsContainer");
    optionsButtonsContainer.classList.toggle("active");
  }
  function clickEventOnProjectButtonToRename(projectDiv) {
    const projectForm = projectDomFunctions.createProjectForm();
    projectForm.classList.add("projectEditForm");
    const projectName = projectList.getNameOfProjectByID(projectDiv.id);
    projectDomFunctions.fillCurrentProjectNameIntoProjectForm(
      projectForm,
      projectName
    );
    projectDomFunctions.insertProjectFormBefore(
      projectForm,
      projectDiv
    );
    generalDomFunctions.addHiddenClass(projectDiv);
    projectDiv.classList.add("project-beeing-edited");
  }
  function clickEventOnProjectEditFormAddButton(projectDiv) {
    const newName = projectDomFunctions.getNameValueOfProjectForm();
    const targetProject = projectList.getProjectByID(projectDiv.id);
    if(newName.length!=0){
      targetProject.setName(newName);
      projectDomFunctions.updateProjectDivName(projectDiv, targetProject);
    }
    generalDomFunctions.removeHiddenClass(projectDiv);
    const projectEditForm = document.querySelector(".projectForm");
    projectEditForm.remove();
    generalDomFunctions.updateContentContainerTitle();
    updateStorage();
  }
  function clickEventOnDeleteProjectButton(projectDiv) {
    const wasActive = projectList.getActiveProject()?.id === projectDiv.id;
    projectList.deleteProjectByID(projectDiv.id);
    projectDiv.remove();
    if(wasActive){
       if (projectDomFunctions.areThereProjectDivsleft()) {
          const firstProjectDiv = projectDomFunctions.getFirstProjectDiv();
          projectList.setActiveProjectByID(firstProjectDiv.id);
          generalDomFunctions.removeActiveViewClass();
          generalDomFunctions.addActiveViewClass(firstProjectDiv);
          generalDomFunctions.updateContentContainerTitle();
          taskDomFunctions.updateTaskVisibility(projectList.getActiveProject().getTasks());
      } else {
        projectList.setActiveProjectByID(null);
        generalDomFunctions.updateContentContainerTitle();
        taskDomFunctions.updateTaskVisibility([]);
        generalDomFunctions.addHiddenClass(document.querySelector(".addTaskButton"));
      }
    } 
    updateStorage();
  }
  function adjustProjectList(){
    projectListFunctions.reorderProjects(projectDomFunctions.getAllProjectDivs());
    updateStorage();
  }
  // tasks
  function adjustTaskList(){
    const activeProject = projectList.getActiveProject();
    projectListFunctions.reorderTasks(activeProject.getTasks(),activeProject.getID());
    updateStorage();
  }
  function clickEventOnTaskOptionIcon(taskDiv){
    if(document.querySelector(".optionsButtonsContainer.active")){
        removeActiveClassFromOptionsButtonsContainer();
      }
    const optionsButtonsContainer = taskDiv.querySelector(".optionsButtonsContainer");
    optionsButtonsContainer.classList.toggle("active");
  }
  function removeActiveClassFromOptionsButtonsContainer(){
    const activeContainer = document.querySelector(".optionsButtonsContainer.active");
    if (activeContainer) {
        activeContainer.classList.remove("active");
    }
  }
  function closeOpenTaskForm(){
    const taskForm = document.querySelector(".taskForm");
    if(taskForm){
      if(taskForm.classList.contains("taskEditForm")){
        taskForm.remove();
        const taskDiv = document.querySelector(".task-beeing-edited");
        generalDomFunctions.removeHiddenClass(taskDiv);
        taskDiv.classList.remove("task-beeing-edited");
      }else{
        taskForm.remove();
      }
    }
  }
  function clickEventOnAddTaskButton() {
    taskDomFunctions.createAndAppendTaskFormOnContentDiv();
    updateStorage();
  }
  function clickEventOnTaskFormAddButton(event) {
    const taskForm = event.target.closest(".taskForm");
    const activeProject = projectList.getActiveProject();
    const inputValues = taskDomFunctions.getInputValuesOfGivenForm(taskForm);
    const task = taskFunctions.createNewTask(inputValues);
    task.setProjectID(activeProject.id);
    activeProject.addTask(task);
    taskDomFunctions.createAndAppendTaskDivToContentDiv(task);
    taskForm.remove();
    updateStorage();
  }
  function clickEventOnTaskImportantCheckBox(event) {
    const taskID = event.target.closest(".task").id;
    const targetTask = projectList.getSpecificTaskByID(taskID);
    if (targetTask.getIsImportant() === true) {
      targetTask.setIsImportant(false);
    } else {
      targetTask.setIsImportant(true);
    }
    event.target.checked = targetTask.getIsImportant();
    updateFilterViewIfActive();
    updateStorage();
  }
  function clickEventOnEditButton(taskDiv) {
    const taskForm = taskDomFunctions.createTaskForm();
    taskForm.classList.add("taskEditForm");
    const activeProject = projectList.getActiveProject();
    const targetTask = activeProject.getTaskByID(taskDiv.id);
    const inputValues = taskFunctions.getAllInputValuesFromTask(targetTask);
    taskDomFunctions.fillTaskValuesIntoTaskForm(taskForm, inputValues);
    taskDomFunctions.insertTaskFormBefore(taskForm, taskDiv);
    generalDomFunctions.addHiddenClass(taskDiv);
    taskDiv.classList.add("task-beeing-edited");
  }
  function clickEventOnEditAddTaskButton(taskDiv) {
    const activeProject = projectList.getActiveProject();
    const targetTask = activeProject.getTaskByID(taskDiv.id);
    const taskEditForm = document.querySelector(".taskEditForm");
    const newValues = taskDomFunctions.getInputValuesOfGivenForm(taskEditForm);
    taskFunctions.updateTask(targetTask, newValues);
    taskDomFunctions.updateTaskDivValues(taskDiv, targetTask);
    generalDomFunctions.removeHiddenClass(taskDiv);
    taskEditForm.remove();
    updateFilterViewIfActive();
    updateStorage();
  }
  function clickEventOnDeleteTaskButton(taskDiv) {
    const activeProject = projectList.getActiveProject();
    activeProject.deleteTaskByID(taskDiv.id);
    const liParent = taskDiv.closest("li");
    liParent.remove();
    taskDiv.remove();
    updateStorage();
  }
  // common for projects and tasks 
  function clickEventOnMenuSpan(){
    const aside = document.querySelector("aside");
    aside.classList.toggle("hidden");
  }
  // storage
  function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
  }
  function updateStorage(){
    if(storageAvailable("localStorage")){
      localStorage.setItem("projectList",JSON.stringify(projectList));
    }
    //actie-view muss noch gespeichert werden
  }
  function loadDataFromStorage(){
     projectList.fromJson(JSON.parse(localStorage.getItem("projectList")));

      //appends all project and tasks divs
      for(const project of projectList.getAllProjects()){
        projectDomFunctions.createAndAppendProjectDivToProjectContainer(project);
        for(const task of project.getTasks()){
          taskDomFunctions.createAndAppendTaskDivToContentDiv(task);
        }
      }
      //sets title
      generalDomFunctions.updateContentContainerTitle();
      //shows only active tasks 
      if(!document.querySelector(".addTaskButton")){
        taskDomFunctions.createAndAppendAddTaskButtonToContentDiv();
      }
      if(projectList.getActiveProject()){
        console.log("activeProject found");
        const activeProject = projectList.getActiveProject();
        taskDomFunctions.updateTaskVisibility(activeProject.getTasks());
        const activeProjectDiv = document.querySelector(`.project[id="${activeProject.id}"]`);
        generalDomFunctions.addActiveViewClass(activeProjectDiv);
      }
      else if(projectList.getActiveFilterType()){
        console.log("activeFilter found");
        callTargetFilterEvent(projectList.getActiveFilterType());
        const activeFilterDiv = document.querySelector(`[data-filter-type="${projectList.getActiveFilterType()}"]`);
        generalDomFunctions.addActiveViewClass(activeFilterDiv);
        if(projectList.getAllProjects().length==0){
          console.log("no project found");
          taskDomFunctions.hideAddTaskButton();
        }
      }
      else{
        console.log("nothing applies");
        taskDomFunctions.hideAddTaskButton();
      }
      
    }
  return {
    clickEventOnAddProjectButton,
    clickEventOnAddProjectFormButton,
    clickEventOnTaskFormAddButton,
    clickEventOnProjectDiv,
    clickEventOnAddTaskButton,
    clickEventOnEditButton,
    clickEventOnTaskImportantCheckBox,
    clickEventOnEditAddTaskButton,
    clickEventOnDeleteTaskButton,
    clickEventOnProjectButtonToRename,
    clickEventOnProjectEditFormAddButton,
    clickEventOnDeleteProjectButton,
    startUpFunctions,
    clickEventOnFilter,
    adjustProjectList,
    adjustTaskList,
    clickEventOnTaskOptionIcon,
    clickEventOnProjectOptionIcon,
    clickEventOnMenuSpan,
    removeActiveClassFromOptionsButtonsContainer,
    closeOpenProjectForm,
    closeOpenTaskForm,
    createAndAppendAddTaskButtonToContentDiv
  };
};
