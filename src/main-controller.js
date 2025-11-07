import "./styles.css";
import { handleProjectList, ProjectList } from "./project-list";
import { handleProjects } from "./project";
import { handleTasks } from "./task";
import {
  handleProjectDomManipulation,
  handleTaskDomManipulation,
  handleGeneralDomManipulation,
} from "./dom";
import Sortable from "sortablejs";

export const mainControllerFunctions = function () {
  const projectList = new ProjectList();
  const projectListFunctions = handleProjectList();

  const projectFunctions = handleProjects();
  const projectDomFunctions = handleProjectDomManipulation();

  const taskFunctions = handleTasks();
  const taskDomFunctions = handleTaskDomManipulation();

  const generalDomFunctions = handleGeneralDomManipulation();

  // General
  function startUpFunctions() {
    if (storageAvailableToBeRead("localStorage")) {
      if (localStorage.getItem("projectList")) {
        loadDataFromStorage();
      } else {
        initializeDefaultProject();
        taskDomFunctions.createAndAppendAddTaskButtonToContentDiv();
      }
    }
  }
  function createAndAppendAddTaskButtonToContentDiv() {
    taskDomFunctions.createAndAppendAddTaskButtonToContentDiv();
  }
  function clickEventOnDocument(event) {
    const isClickedInsideOptionsContainer =
      event.target.closest(".optionsContainer");
    if (!isClickedInsideOptionsContainer) {
      removeActiveClassFromOptionsButtonsContainer();
    }
  }
  // Filter
  function clickEventOnFiltersList(event) {
    const targetFilter = event.target.closest(".filter");
    if (targetFilter) {
      clickEventOnFilter(targetFilter);
    }
  }
  function updateFilterViewIfActive() {
    const activeFilterElement = document.querySelector(".active-view.filter");
    if (activeFilterElement) {
      clickEventOnFilter(activeFilterElement);
    }
  }
  function clickEventOnFilter(filterDiv) {
    generalDomFunctions.removeActiveViewClass();
    generalDomFunctions.addActiveViewClass(filterDiv);
    const filterType = filterDiv.dataset.filterType;
    projectList.setActiveFilterType(filterType);
    applyFilter(filterType);
  }
  function applyFilter(filterType) {
    closeOpenTaskForm();
    closeOpenProjectForm();
    taskDomFunctions.hideAddTaskButton();
    if (filterType == "all") {
      taskDomFunctions.showAllTasks();
    } else if (filterType == "today") {
      taskDomFunctions.showTodayTasks(taskFunctions);
    } else if (filterType == "unplanned") {
      taskDomFunctions.showUnplannedTasks(taskFunctions);
    } else if (filterType == "next7Days") {
      taskDomFunctions.showNext7DaysTasks(taskFunctions);
    } else if (filterType == "important") {
      taskDomFunctions.showImportantTasks(taskFunctions);
    }
    generalDomFunctions.updateContentContainerTitle();
    updateStorage();
  }
  // Projects
  function clickEventOnProjectFormToEditProjectDiv(event, projectDiv) {
    if (event.target.classList.contains("projectFormAddButton")) {
      event.preventDefault();
      clickEventOnProjectEditFormAddButton(projectDiv);
    } else if (event.target.classList.contains("projectFormCancelButton")) {
      event.preventDefault();
      closeOpenProjectForm();
    }
  }
  function clickEventOnProjectFormToAddNewProjectDiv(
    event,
    setEventOnAddTaskButton,
  ) {
    if (event.target.classList.contains("projectFormAddButton")) {
      clickEventOnAddProjectFormButton();
      if (!document.querySelector(".addTaskButton")) {
        event.preventDefault();
        createAndAppendAddTaskButtonToContentDiv();
        setEventOnAddTaskButton();
      }
    } else if (event.target.classList.contains("projectFormCancelButton")) {
      event.preventDefault();
      closeOpenProjectForm();
    }
  }
  function makeProjectsListItemsDraggalble() {
    const projectsList = document.querySelector(".projectsList");
    if (projectsList) {
      new Sortable(projectsList, {
        draggable: ".project",
        handle: ".dragSpan",
        onUpdate: function () {
          adjustProjectList();
        },
      });
    }
  }
  function clickEventOnProjectList(
    event,
    setEventOnProjectFormToEditProjectDiv,
  ) {
    if (event.target.closest(".projectForm")) {
      return;
    }
    const targetProjectDiv = event.target.closest(".project");
    if (targetProjectDiv) {
      if (event.target.classList.contains("renameButton")) {
        closeOpenTaskForm();
        closeOpenProjectForm();
        clickEventOnProjectButtonToRename(targetProjectDiv);
        setEventOnProjectFormToEditProjectDiv(targetProjectDiv);
      } else if (event.target.classList.contains("deleteButton")) {
        clickEventOnDeleteProjectButton(targetProjectDiv);
      } else if (event.target.classList.contains("optionsSpan")) {
        clickEventOnProjectOptionIcon(targetProjectDiv);
      } else {
        clickEventOnProjectDiv(targetProjectDiv);
      }
    }
  }
  function clickEventOnAddProjectButton(
    setEventOnProjectFormToAddNewProjectDiv,
  ) {
    closeOpenTaskForm();
    closeOpenProjectForm();
    if (!document.querySelector(".projectForm")) {
      projectDomFunctions.createAndAppendProjectFormOnProjectContainer();
    }
    setEventOnProjectFormToAddNewProjectDiv();
    updateStorage();
  }
  function clickEventOnAddProjectFormButton() {
    const projectForm = document.querySelector(".projectForm");
    const projectName = projectDomFunctions.getNameValueOfProjectForm();
    if (projectName.length != 0) {
      generalDomFunctions.removeActiveViewClass();
      const project = projectFunctions.createProject(projectName);
      projectList.addProject(project);
      projectList.setActiveProjectByID(project.id);
      projectDomFunctions.createAndAppendProjectDivToProjectContainer(project);
      const projectDiv = document.getElementById(project.id);
      generalDomFunctions.addActiveViewClass(projectDiv);
      generalDomFunctions.updateContentContainerTitle();
      taskDomFunctions.updateTaskVisibility(
        projectList.getActiveProject().getTasks(),
      );
      if (document.querySelector(".addTaskButton")) {
        generalDomFunctions.removeHiddenClass(
          document.querySelector(".addTaskButton"),
        );
      }
    }
    projectForm.remove();
    updateStorage();
  }
  function initializeDefaultProject() {
    const defaultProject = projectFunctions.createProject("default");
    projectList.addProject(defaultProject);
    projectList.setActiveProjectByID(defaultProject.id);
    generalDomFunctions.removeActiveViewClass();
    projectDomFunctions.createAndAppendProjectDivToProjectContainer(
      defaultProject,
    );
    generalDomFunctions.addActiveViewClass(
      document.getElementById(defaultProject.id),
    );
    generalDomFunctions.updateContentContainerTitle();
  }
  function closeOpenProjectForm() {
    const projectForm = document.querySelector(".projectForm");
    if (projectForm) {
      if (projectForm.classList.contains("projectEditForm")) {
        projectForm.remove();
        const projectDiv = document.querySelector(".project-beeing-edited");
        generalDomFunctions.removeHiddenClass(projectDiv);
        projectDiv.classList.remove("project-beeing-edited");
      } else {
        projectForm.remove();
      }
    }
  }
  function clickEventOnProjectDiv(projectDiv) {
    const project = projectList.getProjectByID(projectDiv.id);
    projectList.setActiveProjectByID(project.id);
    const activeProject = projectList.getActiveProject();
    generalDomFunctions.updateContentContainerTitle();
    taskDomFunctions.updateTaskVisibility(activeProject.getTasks());
    generalDomFunctions.removeHiddenClass(
      document.querySelector(".addTaskButton"),
    );
    closeOpenTaskForm();
    generalDomFunctions.removeActiveViewClass();
    generalDomFunctions.addActiveViewClass(projectDiv);
    updateStorage();
  }
  function clickEventOnProjectOptionIcon(projectDiv) {
    if (document.querySelector(".optionsButtonsContainer.active")) {
      removeActiveClassFromOptionsButtonsContainer();
    }
    const optionsButtonsContainer = projectDiv.querySelector(
      ".optionsButtonsContainer",
    );
    optionsButtonsContainer.classList.toggle("active");
  }
  function clickEventOnProjectButtonToRename(projectDiv) {
    const projectForm = projectDomFunctions.createProjectForm();
    projectForm.classList.add("projectEditForm");
    const projectName = projectList.getNameOfProjectByID(projectDiv.id);
    projectDomFunctions.fillCurrentProjectNameIntoProjectForm(
      projectForm,
      projectName,
    );
    projectDomFunctions.insertProjectFormBefore(projectForm, projectDiv);
    generalDomFunctions.addHiddenClass(projectDiv);
    projectDiv.classList.add("project-beeing-edited");
  }
  function clickEventOnProjectEditFormAddButton(projectDiv) {
    const newName = projectDomFunctions.getNameValueOfProjectForm();
    const targetProject = projectList.getProjectByID(projectDiv.id);
    if (newName.length != 0) {
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
    if (wasActive) {
      closeOpenTaskForm();
      if (projectDomFunctions.areThereProjectDivsLeft()) {
        const firstProjectDiv = projectDomFunctions.getFirstProjectDiv();
        projectList.setActiveProjectByID(firstProjectDiv.id);
        generalDomFunctions.removeActiveViewClass();
        generalDomFunctions.addActiveViewClass(firstProjectDiv);
        generalDomFunctions.updateContentContainerTitle();
        taskDomFunctions.updateTaskVisibility(
          projectList.getActiveProject().getTasks(),
        );
      } else {
        projectList.setActiveProjectByID(null);
        generalDomFunctions.updateContentContainerTitle();
        taskDomFunctions.updateTaskVisibility([]);
        generalDomFunctions.addHiddenClass(
          document.querySelector(".addTaskButton"),
        );
      }
    }
    updateStorage();
  }
  function adjustProjectList() {
    projectListFunctions.reorderProjects(
      projectDomFunctions.getAllProjectDivs(),
    );
    updateStorage();
  }
  // Tasks
  function adjustTaskList(taskDiv) {
    const activeProject = projectList.getActiveProject();
    if (activeProject) {
      projectListFunctions.reorderTasks(
        activeProject.getTasks(),
        activeProject.getID(),
      );
    } else {
      const task = projectList.getSpecificTaskByID(taskDiv.id);
      const projectID = task.getProjectID();
      const project = projectList.getProjectByID(projectID);
      projectListFunctions.reorderTasks(project.getTasks(), projectID);
    }

    updateStorage();
  }
  function clickEventOnTasksList(
    event,
    tasksList,
    setEventOnTaskFormToEditTaskDiv,
  ) {
    if (tasksList && tasksList.childElementCount > 0) {
      const taskDiv = event.target.closest(".task");
      if (event.target.classList.contains("editButton")) {
        closeOpenProjectForm();
        closeOpenTaskForm();
        clickEventOnEditButton(taskDiv);
        setEventOnTaskFormToEditTaskDiv();
      } else if (event.target.classList.contains("deleteButton")) {
        clickEventOnDeleteTaskButton(taskDiv);
      } else if (event.target.classList.contains("optionsSpan")) {
        clickEventOnTaskOptionIcon(taskDiv);
      }
    }
  }
  function changeEventOnTasksList(event, tasksList) {
    if (tasksList && tasksList.childElementCount > 0) {
      if (event.target.classList.contains("isTaskImportantInput")) {
        clickEventOnTaskImportantCheckBox(event);
      }
    }
  }
  function makeTasksListItemsDraggable() {
    const tasksList = document.querySelector(".tasksList");
    if (tasksList) {
      new Sortable(tasksList, {
        draggable: ".liItem",
        handle: ".dragSpan",
        onUpdate: function (event) {
          const taskDiv = event.item.querySelector(".task");
          adjustTaskList(taskDiv);
        },
      });
    }
  }
  function clickEventOnTaskOptionIcon(taskDiv) {
    if (document.querySelector(".optionsButtonsContainer.active")) {
      removeActiveClassFromOptionsButtonsContainer();
    }
    const optionsButtonsContainer = taskDiv.querySelector(
      ".optionsButtonsContainer",
    );
    optionsButtonsContainer.classList.toggle("active");
  }
  function removeActiveClassFromOptionsButtonsContainer() {
    const activeContainer = document.querySelector(
      ".optionsButtonsContainer.active",
    );
    if (activeContainer) {
      activeContainer.classList.remove("active");
    }
  }
  function closeOpenTaskForm() {
    const taskForm = document.querySelector(".taskForm");
    if (taskForm) {
      if (taskForm.classList.contains("taskEditForm")) {
        taskForm.remove();
        const taskDiv = document.querySelector(".task-beeing-edited");
        generalDomFunctions.removeHiddenClass(taskDiv);
        taskDiv.classList.remove("task-beeing-edited");
      } else {
        taskForm.remove();
      }
    }
  }
  function clickEventOnTaskFormToEditTaskDiv(event) {
    if (event.target.classList.contains("isTaskImportantInput")) {
      event.stopPropagation();
      return;
    } else if (event.target.classList.contains("taskFormCancelButton")) {
      event.preventDefault();
      closeOpenTaskForm();
    }
  }
  function submitEventOnTaskFormToEditTaskDiv(event) {
    const taskDiv = document.querySelector(".task-beeing-edited");
    console.log(taskDiv);
    clickEventOnEditAddTaskButton(taskDiv);
    event.preventDefault();
  }
  function changeEventOnTaskFormToEditTaskDiv(event) {
    if (event.target.classList.contains("isTaskImportantInput")) {
      event.stopPropagation();
      return;
    }
  }
  function clickEventOnTaskFormCancelButton(event) {
    if (event.target.classList.contains("taskFormCancelButton")) {
      closeOpenTaskForm();
    }
  }

  function clickEventOnAddTaskButton(setEventOnTaskFormOnNewTaskDiv) {
    closeOpenProjectForm();
    closeOpenTaskForm();
    taskDomFunctions.createAndAppendTaskFormOnContentDiv();
    setEventOnTaskFormOnNewTaskDiv();
    updateStorage();
  }
  function clickEventOnTaskFormAddButton(event) {
    const taskForm = event.target.closest(".taskForm");
    const activeProject = projectList.getActiveProject();
    const formValues = taskDomFunctions.getInputValuesOfGivenForm(taskForm);
    const task = taskFunctions.createNewTask(formValues);
    task.setProjectID(activeProject.id);
    activeProject.addTask(task);
    taskDomFunctions.createAndAppendTaskDivToContentDiv(task);
    taskForm.remove();
    updateStorage();
    event.preventDefault();
  }
  function clickEventOnTaskImportantCheckBox(event) {
    const taskID = event.target.closest(".task").id;
    const task = projectList.getSpecificTaskByID(taskID);
    if (task.getIsImportant() === true) {
      task.setIsImportant(false);
    } else {
      task.setIsImportant(true);
    }
    event.target.checked = task.getIsImportant();
    updateFilterViewIfActive();
    updateStorage();
  }
  function clickEventOnEditButton(taskDiv) {
    const taskForm = taskDomFunctions.createTaskForm();
    taskForm.classList.add("taskEditForm");
    const task = projectList.getSpecificTaskByID(taskDiv.id);
    const formValues = taskFunctions.getTaskFormValues(task);
    taskDomFunctions.fillTaskValuesIntoTaskForm(taskForm, formValues);
    taskDomFunctions.insertTaskFormBefore(taskForm, taskDiv);
    generalDomFunctions.addHiddenClass(taskDiv);
    taskDiv.classList.add("task-beeing-edited");
  }
  function clickEventOnEditAddTaskButton(taskDiv) {
    const task = projectList.getSpecificTaskByID(taskDiv.id);
    const taskEditForm = document.querySelector(".taskEditForm");
    const formValues = taskDomFunctions.getInputValuesOfGivenForm(taskEditForm);
    taskFunctions.updateTask(task, formValues);
    taskDomFunctions.updateTaskDivValues(taskDiv, task);
    generalDomFunctions.removeHiddenClass(taskDiv);
    closeOpenTaskForm();
    updateFilterViewIfActive();
    updateStorage();
  }
  function clickEventOnDeleteTaskButton(taskDiv) {
    const task = projectList.getSpecificTaskByID(taskDiv.id);
    const projectID = task.getProjectID();
    const project = projectList.getProjectByID(projectID);
    project.deleteTaskByID(taskDiv.id);
    const liParent = taskDiv.closest("li");
    liParent.remove();
    taskDiv.remove();
    updateFilterViewIfActive();
    updateStorage();
  }
  // Common for Projects and Tasks
  function clickEventOnMenuSpan() {
    const aside = document.querySelector("aside");
    aside.classList.toggle("hidden");
  }
  // Storage
  function storageAvailableToBeRead(type) {
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
        storage &&
        storage.length !== 0
      );
    }
  }
  function updateStorage() {
    try {
      localStorage.setItem("projectList", JSON.stringify(projectList));
      console.log(JSON.stringify(projectList).length);
    } catch (e) {
      console.log("Failed to save to localStorage: " + e);
    }
  }
  function loadDataFromStorage() {
    projectList.fromJson(JSON.parse(localStorage.getItem("projectList")));

    for (const project of projectList.getAllProjects()) {
      projectDomFunctions.createAndAppendProjectDivToProjectContainer(project);
      for (const task of project.getTasks()) {
        taskDomFunctions.createAndAppendTaskDivToContentDiv(task);
      }
    }
    generalDomFunctions.updateContentContainerTitle();

    if (!document.querySelector(".addTaskButton")) {
      taskDomFunctions.createAndAppendAddTaskButtonToContentDiv();
    }
    if (projectList.getActiveProject()) {
      const activeProject = projectList.getActiveProject();
      taskDomFunctions.updateTaskVisibility(activeProject.getTasks());
      const activeProjectDiv = document.querySelector(
        `.project[id="${activeProject.id}"]`,
      );
      generalDomFunctions.addActiveViewClass(activeProjectDiv);
    } else if (projectList.getActiveFilterType()) {
      applyFilter(projectList.getActiveFilterType());
      const activeFilterDiv = document.querySelector(
        `[data-filter-type="${projectList.getActiveFilterType()}"]`,
      );
      generalDomFunctions.addActiveViewClass(activeFilterDiv);
      if (projectList.getAllProjects().length == 0) {
        taskDomFunctions.hideAddTaskButton();
      }
    } else {
      taskDomFunctions.hideAddTaskButton();
    }
  }
  return {
    clickEventOnAddProjectButton,
    clickEventOnAddTaskButton,
    startUpFunctions,
    clickEventOnDocument,
    makeTasksListItemsDraggable,
    clickEventOnTasksList,
    changeEventOnTasksList,
    clickEventOnTaskFormToEditTaskDiv,
    submitEventOnTaskFormToEditTaskDiv,
    changeEventOnTaskFormToEditTaskDiv,
    clickEventOnTaskFormCancelButton,
    makeProjectsListItemsDraggalble,
    clickEventOnProjectList,
    clickEventOnProjectFormToEditProjectDiv,
    clickEventOnProjectFormToAddNewProjectDiv,
    clickEventOnFiltersList,
    clickEventOnMenuSpan,
    clickEventOnTaskFormAddButton,
  };
};
