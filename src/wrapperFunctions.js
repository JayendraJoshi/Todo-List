import "./styles.css";
import { ProjectList } from "./projectList";
import { handleProjects, Project } from "./project";
import { handleTasks, Task } from "./task";
import {
  handleProjectDomManipulation,
  handleTaskDomManipulation,
  handleGeneralDomManipulation,
} from "./dom";

export const wrapperFunctions = function () {
  const projectList = new ProjectList();

  const projectFunctions = handleProjects();
  const projectDomFunctions = handleProjectDomManipulation();

  const taskFunctions = handleTasks();
  const taskDomFunctions = handleTaskDomManipulation();

  const generalDomFunctions = handleGeneralDomManipulation();

  function clickEventOnAddProjectButton() {
    if (!document.querySelector(".projectForm")) {
      projectDomFunctions.createAndAppendProjectFormOnProjectContainer();
    }
  }
  function clickEventOnProjectDiv(targetProjectDiv) {
    const targetProject = projectList.getProjectByID(targetProjectDiv.id);
    generalDomFunctions.setContentContainerTitle(targetProject.name);
    projectList.setActiveProjectByID(targetProject.id);
    const activeProject = projectList.getActiveProject();
    const tasks = activeProject.getTasks();
    taskDomFunctions.resetContentOfTasksList();
    taskDomFunctions.appendTasksToTasksList(tasks);
  }
  function clickEventOnAddProjectFormButton(event) {
    event.preventDefault();
    const projectForm = document.querySelector(".projectForm");
    const projectName = projectDomFunctions.getNameValueOfProjectForm();
    const project = projectFunctions.createProject(projectName);
    projectList.addProject(project);
    projectList.setActiveProjectByID(project.id);
    projectDomFunctions.createAndAppendProjectDivToProjectContainer(project);
    generalDomFunctions.setContentContainerTitle(project.name);
    projectForm.remove();
  }
  function clickEventOnCancelProjectFormButton(event) {
    event.preventDefault();
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
    targetProject.setName(newName);
    projectDomFunctions.updateProjectDivName(projectDiv, targetProject);
    generalDomFunctions.removeHiddenClass(projectDiv);
    const projectEditForm = document.querySelector(".projectForm");
    projectEditForm.remove();
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
  }

  function startUpFunctions() {
    taskDomFunctions.createAndAppendAddTaskButtonToContentDiv();
    projectDomFunctions.createDefaultProjectDiv();
  }
  function clickEventOnTaskFormAddButton(event) {
    const taskForm = document.querySelector(".taskForm");
    event.preventDefault();
    const activeProject = projectList.getActiveProject();
    const inputValues = taskDomFunctions.getInputValuesOfTaskForm();
    const task = taskFunctions.createNewTask(inputValues);
    task.setProjectID(activeProject.id);
    activeProject.addTask(task);
    taskDomFunctions.createAndAppendTaskDivToContentDiv(task);
    taskForm.remove();
  }
  function clickEventOnTaskFormCancelButton(event) {
    const taskForm = document.querySelector(".taskForm");
    event.preventDefault();
    taskForm.remove();
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
  }
  function clickEventOnEditButton(taskDiv) {
    const taskEditForm = taskDomFunctions.createTaskForm();
    taskEditForm.classList.add("editform");
    const activeProject = projectList.getActiveProject();
    const targetTask = activeProject.getTaskByID(taskDiv.id);
    const inputValues = taskFunctions.getAllInputValuesFromTask(targetTask);
    taskDomFunctions.fillTaskValuesIntoTaskEditForm(taskEditForm, inputValues);
    taskDomFunctions.insertTaskFormBefore(taskEditForm, taskDiv);
    generalDomFunctions.addHiddenClass(taskDiv);
  }
  function clickEventOnEditCancelChangeButton(taskDiv) {
    const editform = document.querySelector(".editform");
    editform.remove();
    generalDomFunctions.removeHiddenClass(taskDiv);
    console.log("removed");
  }
  function clickEventOnEditAddTaskButton(taskDiv) {
    const activeProject = projectList.getActiveProject();
    const targetTask = activeProject.getTaskByID(taskDiv.id);
    const newValues = taskDomFunctions.getInputValuesOfEditForm();
    taskFunctions.updateTask(targetTask, newValues);
    taskDomFunctions.updateTaskDivValues(taskDiv, targetTask);
    generalDomFunctions.removeHiddenClass(taskDiv);
    const editform = document.querySelector(".editform");
    editform.remove();
  }
  function clickEventOnDeleteTaskButton(taskDiv) {
    const activeProject = projectList.getActiveProject();
    activeProject.deleteTaskByID(taskDiv.id);
    const liParent = taskDiv.closest("li");
    liParent.remove();
    taskDiv.remove();
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
      } else {
        generalDomFunctions.setContentContainerTitle("");
      }
    }
  }
  function clickEventOnAllTasksDiv() {
    taskDomFunctions.resetContentOfTasksList();
    taskDomFunctions.appendTasksToTasksList(projectList.getAllTasks(projectList));
    generalDomFunctions.setContentContainerTitle("All tasks");
  }
  function clickEventOnTodayTaskDiv() {
    taskDomFunctions.resetContentOfTasksList();
    taskDomFunctions.appendTasksToTasksList(taskFunctions.getTodaysTasks(projectList));
    generalDomFunctions.setContentContainerTitle("Today");
  }
  function clickEventOnUnplannedTaskDiv() {
    taskDomFunctions.resetContentOfTasksList();
    taskDomFunctions.appendTasksToTasksList(taskFunctions.getUnplannedTasks(projectList));
    generalDomFunctions.setContentContainerTitle("Unplanned");
  }
  function clickEventOnNext7DaysDiv() {
    taskDomFunctions.resetContentOfTasksList();
    taskDomFunctions.appendTasksToTasksList(taskFunctions.getNext7DaysTasks(projectList));
    generalDomFunctions.setContentContainerTitle("Next 7 Days");
  }
  function clickEventOnImportantTaskDiv() {
    taskDomFunctions.resetContentOfTasksList();
    taskDomFunctions.appendTasksToTasksList(taskFunctions.getImportantTasks(projectList));
    generalDomFunctions.setContentContainerTitle("Important");
  }
  function clickEventOnFilter(className) {
    switch (className) {
      case "allTasks":
        clickEventOnAllTasksDiv();
        break;
      case "today":
        clickEventOnTodayTaskDiv();
        break;
      case "unplanned":
        clickEventOnUnplannedTaskDiv();
        break;
      case "next7Days":
        clickEventOnNext7DaysDiv();
        break;
      case "important":
        clickEventOnImportantTaskDiv();
        break;
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
  };
};
