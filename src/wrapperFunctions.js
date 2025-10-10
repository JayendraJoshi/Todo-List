import "./styles.css";
import { handleProjectList,ProjectList } from "./projectList";
import { handleProjects, Project } from "./project";
import { handleTasks, Task } from "./task";
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

  function clickEventOnAddProjectButton() {
    if (!document.querySelector(".projectForm")) {
      projectDomFunctions.createAndAppendProjectFormOnProjectContainer();
    }
    updateStorage();
  }
  function clickEventOnProjectDiv(targetProjectDiv) {
    const targetProject = projectList.getProjectByID(targetProjectDiv.id);
    projectList.setActiveProjectByID(targetProject.id);
    const activeProject = projectList.getActiveProject();
    generalDomFunctions.removeCurrentActiveFilterClass();
    generalDomFunctions.updateContentContainerTitle();
    taskDomFunctions.updateTaskVisibility(activeProject.getTasks());
    generalDomFunctions.removeHiddenClass(document.querySelector(".addTaskButton"));
    if(document.querySelector(".editform")){
      clickEventOnEditCancelChangeButton(document.querySelector(".task.hidden"));
    }
    clickEventOnTaskFormCancelButton();
    updateStorage();
  }
  function adjustProjectList(){
    projectListFunctions.reorderProjects(projectDomFunctions.getAllProjectDivs());
    updateStorage();
  }
  function adjustTaskList(){
    const activeProject = projectList.getActiveProject();
    projectListFunctions.reorderTasks(activeProject.getTasks(),activeProject.getID());
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
    generalDomFunctions.removeCurrentActiveFilterClass();
    generalDomFunctions.updateContentContainerTitle();
    taskDomFunctions.updateTaskVisibility(projectList.getActiveProject().getTasks()); 
    }
    projectForm.remove();
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
  function clickEventOnProjectOptionIcon(projectDiv){
    if(document.querySelector(".optionsButtonsContainer.active")){
        removeActiveClassFromOptionsButtonsContainer();
      }
    const optionsButtonsContainer = projectDiv.querySelector(".optionsButtonsContainer");
    optionsButtonsContainer.classList.toggle("active");
  }
  function clickEventOnCancelProjectFormButton(event) {
    //event.preventDefault();
    const projectForm = document.querySelector(".projectForm");
    projectForm.remove();
  }
  function clickEventOnProjectRenameButton(projectDiv) {
    const projectRenameForm = projectDomFunctions.createProjectForm();
    projectRenameForm.classList.add("projectRenameForm");
    const projectName = projectList.getNameOfProjectByID(projectDiv.id);
    projectDomFunctions.fillCurrentProjectNameIntoProjectRenameForm(
      projectRenameForm,
      projectName
    );
    projectDomFunctions.insertProjectEditFormBefore(
      projectRenameForm,
      projectDiv
    );
    generalDomFunctions.addHiddenClass(projectDiv);
  }
  function clickEventOnProjectRenameAddButton(projectDiv) {
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
  function clickEventOnProjectRenameCancelButton(projectDiv) {
    const projectRenameForm = document.querySelector(".projectRenameForm");
    projectRenameForm.remove();
    generalDomFunctions.removeHiddenClass(projectDiv);
  }
  function clickEventOnAddTaskButton() {
    if (!document.querySelector(".taskForm")) {
      taskDomFunctions.createAndAppendTaskFormOnContentDiv();
    }
    updateStorage();
  }
  function startUpFunctions() {
    taskDomFunctions.createAndAppendAddTaskButtonToContentDiv();
    if(storageAvailable("localStorage")){
      if(localStorage.getItem("projectList")){
        loadDataFromStorage();
      }else{
        projectDomFunctions.createDefaultProjectDiv();
      }
    }
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
  function clickEventOnTaskFormCancelButton() {
    const taskForm = document.querySelector(".taskForm");
    if(taskForm){
      taskForm.remove();
    }
  }
  function clickEventOnTaskImportantCheckBox(event) {
    const taskID = event.target.closest("div").id;
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
    if(document.querySelector(".editform")){
      const hiddenTaskDiv = document.querySelector(".task.hidden");
      clickEventOnEditCancelChangeButton(hiddenTaskDiv);
    }
    const taskForm = taskDomFunctions.createTaskForm();
    taskForm.classList.add("editform");
    const activeProject = projectList.getActiveProject();
    const targetTask = activeProject.getTaskByID(taskDiv.id);
    const inputValues = taskFunctions.getAllInputValuesFromTask(targetTask);
    taskDomFunctions.fillTaskValuesIntoTaskForm(taskForm, inputValues);
    taskDomFunctions.insertTaskFormBefore(taskForm, taskDiv);
    generalDomFunctions.addHiddenClass(taskDiv);
  }
  function clickEventOnEditCancelChangeButton(taskDiv) {
    const editform = document.querySelector(".editform");
    editform.remove();
    generalDomFunctions.removeHiddenClass(taskDiv);
  }
  function clickEventOnEditAddTaskButton(taskDiv) {
    const activeProject = projectList.getActiveProject();
    const targetTask = activeProject.getTaskByID(taskDiv.id);
    const editform = document.querySelector(".editform");
    const newValues = taskDomFunctions.getInputValuesOfGivenForm(editform);
    taskFunctions.updateTask(targetTask, newValues);
    taskDomFunctions.updateTaskDivValues(taskDiv, targetTask);
    generalDomFunctions.removeHiddenClass(taskDiv);
    editform.remove();
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
  function clickEventOnDeleteProjectButton(projectDiv) {
    projectList.deleteProjectByID(projectDiv.id);
    projectDiv.remove();
    const value = projectDomFunctions.hasActiveProjectDivBeenDeleted();
    if (!value) {
      return;
    } else {
      if (projectDomFunctions.areThereProjectDivsleft()) {
        projectDomFunctions.setFirstProjectDivToNewActiveProject();
        taskDomFunctions.updateTaskVisibility(projectList.getActiveProject().getTasks());
      } else {
        projectList.setActiveProjectByID(null);
        generalDomFunctions.removeCurrentActiveFilterClass();
        generalDomFunctions.updateContentContainerTitle();
        taskDomFunctions.updateTaskVisibility([]);
      }
    }
    updateStorage();
  }
  function clickEventOnMenuSpan(){
    const aside = document.querySelector("aside");
    aside.classList.toggle("hidden");
  }
  function clickEventOnAllTasksDiv() {
    taskDomFunctions.updateTaskVisibility(projectList.getAllTasks());
    generalDomFunctions.updateContentContainerTitle();
  }
  function clickEventOnTodayTaskDiv() {
    taskDomFunctions.updateTaskVisibility(taskFunctions.getTodaysTasks(projectList))
    generalDomFunctions.updateContentContainerTitle();
  }
  function clickEventOnUnplannedTaskDiv() {
    taskDomFunctions.updateTaskVisibility(taskFunctions.getUnplannedTasks(projectList)); 
    generalDomFunctions.updateContentContainerTitle();
  }
  function clickEventOnNext7DaysDiv() {
    taskDomFunctions.updateTaskVisibility(taskFunctions.getNext7DaysTasks(projectList));
   generalDomFunctions.updateContentContainerTitle();
  }
  function clickEventOnImportantTaskDiv() {
    taskDomFunctions.updateTaskVisibility(taskFunctions.getImportantTasks(projectList));
    generalDomFunctions.updateContentContainerTitle();
  }
  function updateFilterViewIfActive(){
    const activeFilterElement = document.querySelector(".activeFilter");
    if(activeFilterElement){
      clickEventOnFilter(activeFilterElement);
    }
  }
  function clickEventOnFilter(targetFilter) {
    generalDomFunctions.addHiddenClass(document.querySelector(".addTaskButton"));
    clickEventOnTaskFormCancelButton();
    generalDomFunctions.removeCurrentActiveFilterClass();
    generalDomFunctions.setActiveFilterClass(targetFilter);
    if (targetFilter.classList.contains("allTasks")) {
        clickEventOnAllTasksDiv();
    } else if (targetFilter.classList.contains("today")) {
        clickEventOnTodayTaskDiv();
    } else if (targetFilter.classList.contains("unplanned")) {
        clickEventOnUnplannedTaskDiv();
    } else if (targetFilter.classList.contains("next7Days")) {
        clickEventOnNext7DaysDiv();
    } else if (targetFilter.classList.contains("important")) {
        clickEventOnImportantTaskDiv();
    }
  }
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
      if(projectList.getActiveProject()){
        taskDomFunctions.updateTaskVisibility(projectList.getActiveProject().getTasks());
      }
    }
  return {
    clickEventOnAddProjectButton,
    clickEventOnAddProjectFormButton,
    clickEventOnCancelProjectFormButton,
    clickEventOnTaskFormAddButton,
    clickEventOnTaskFormCancelButton,
    clickEventOnProjectDiv,
    clickEventOnAddTaskButton,
    clickEventOnEditButton,
    clickEventOnTaskImportantCheckBox,
    clickEventOnEditAddTaskButton,
    clickEventOnEditCancelChangeButton,
    clickEventOnDeleteTaskButton,
    clickEventOnProjectRenameButton,
    clickEventOnProjectRenameAddButton,
    clickEventOnDeleteProjectButton,
    clickEventOnProjectRenameCancelButton,
    startUpFunctions,
    clickEventOnFilter,
    adjustProjectList,
    adjustTaskList,
    clickEventOnTaskOptionIcon,
    clickEventOnProjectOptionIcon,
    clickEventOnMenuSpan,
    removeActiveClassFromOptionsButtonsContainer,
  };
};
