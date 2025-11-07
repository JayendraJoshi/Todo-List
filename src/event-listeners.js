import { mainControllerFunctions } from "./main-controller";

export const setEventListeners = function () {
  const mainFunctions = mainControllerFunctions();

  // Filter events
  function setEventOnFiltersList() {
    const filtersList = document.querySelector(".filtersList");
    filtersList.addEventListener(
      "click",
      mainFunctions.clickEventOnFiltersList,
    );
  }
  // Project events
  function setEventOnAddProjectButton() {
    const addProjectButton = document.querySelector(".addProjectButton");
    addProjectButton.addEventListener("click", () =>
      mainFunctions.clickEventOnAddProjectButton(
        setEventOnProjectFormToAddNewProjectDiv,
      ),
    );
  }
  function setEventOnProjectFormToEditProjectDiv(projectDiv) {
    const projectForm = document.querySelector(".projectForm");
    projectForm.addEventListener("click", (event) =>
      mainFunctions.clickEventOnProjectFormToEditProjectDiv(event, projectDiv),
    );
  }
  function setEventOnProjectFormToAddNewProjectDiv() {
    const projectForm = document.querySelector(".projectForm");
    projectForm.addEventListener("click", (event) =>
      mainFunctions.clickEventOnProjectFormToAddNewProjectDiv(
        event,
        setEventOnAddTaskButton,
      ),
    );
  }

  function setEventOnProjectList() {
    const projectsList = document.querySelector(".projectsList");
    projectsList.addEventListener("click", (event) =>
      mainFunctions.clickEventOnProjectList(
        event,
        setEventOnProjectFormToEditProjectDiv,
      ),
    );
  }
  // Task events
  function setEventOnAddTaskButton() {
    const addTaskButton = document.querySelector(".addTaskButton");
    addTaskButton.addEventListener("click", () =>
      mainFunctions.clickEventOnAddTaskButton(setEventOnTaskFormOnNewTaskDiv),
    );
  }
  function setEventOnTaskFormToEditTaskDiv() {
    const taskForm = document.querySelector(".taskForm");
    taskForm.addEventListener(
      "click",
      mainFunctions.clickEventOnTaskFormToEditTaskDiv,
    );
    taskForm.addEventListener(
      "submit",
      mainFunctions.submitEventOnTaskFormToEditTaskDiv,
    );
    taskForm.addEventListener(
      "change",
      mainFunctions.changeEventOnTaskFormToEditTaskDiv,
    );
  }
  function setEventOnTaskFormOnNewTaskDiv() {
    const taskForm = document.querySelector(".taskForm");
    taskForm.addEventListener(
      "click",
      mainFunctions.clickEventOnTaskFormCancelButton,
    );
    taskForm.addEventListener(
      "submit",
      mainFunctions.clickEventOnTaskFormAddButton,
    );
  }
  function setEventOnTaskElements() {
    const tasksList = document.querySelector(".tasksList");
    tasksList.addEventListener("change", (event) =>
      mainFunctions.changeEventOnTasksList(event, tasksList),
    );
    tasksList.addEventListener("click", (event) =>
      mainFunctions.clickEventOnTasksList(
        event,
        tasksList,
        setEventOnTaskFormToEditTaskDiv,
      ),
    );
  }
  // Project & Task common events
  function setEventOnAllObjectButtonContainer() {
    document.addEventListener("click", mainFunctions.clickEventOnDocument);
  }
  // Menu icon event
  function setEventOnMenuSpan() {
    const menuSpan = document.querySelector(".menuSpan");
    menuSpan.addEventListener("click", mainFunctions.clickEventOnMenuSpan);
  }
  // Entry
  function entryPointEventListener() {
    setEventOnAllObjectButtonContainer();
    setEventOnMenuSpan();
    setEventOnAddProjectButton();
    mainFunctions.startUpFunctions();
    setEventOnAddTaskButton();
    setEventOnFiltersList();
    setEventOnTaskElements();
    setEventOnProjectList();
    mainFunctions.makeProjectsListItemsDraggalble();
    mainFunctions.makeTasksListItemsDraggable();
  }
  return {
    entryPointEventListener,
  };
};
