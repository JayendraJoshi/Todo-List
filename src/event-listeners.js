import { mainControllerFunctions } from "./main-controller";
import Sortable from "sortablejs";

export const setEventListeners = function () {
  const mainFunctions = mainControllerFunctions();

  // Filter events
  function setEventOnFiltersList() {
    const filtersList = document.querySelector(".filtersList");
    filtersList.addEventListener("click", function (event) {
      const targetFilter = event.target.closest(".filter");
      if (targetFilter) {
        mainFunctions.clickEventOnFilter(targetFilter);
      }
    });
  }
  // Project events
  function setEventOnAddProjectButton() {
    const addProjectButton = document.querySelector(".addProjectButton");
    addProjectButton.addEventListener("click", function () {
      mainFunctions.closeOpenTaskForm();
      mainFunctions.closeOpenProjectForm();
      mainFunctions.clickEventOnAddProjectButton();
      setEventOnProjectForm();
    });
  }
  function setEventOnProjectForm(projectDiv) {
    const projectForm = document.querySelector(".projectForm");
    if (projectDiv) {
      projectForm.addEventListener("click", function (event) {
        if (event.target.classList.contains("projectFormAddButton")) {
          event.preventDefault();
          mainFunctions.clickEventOnProjectEditFormAddButton(projectDiv);
        } else if (event.target.classList.contains("projectFormCancelButton")) {
          event.preventDefault();
          mainFunctions.closeOpenProjectForm();
        }
      });
    } else {
      projectForm.addEventListener("click", function (event) {
        if (event.target.classList.contains("projectFormAddButton")) {
          mainFunctions.clickEventOnAddProjectFormButton();
          if (!document.querySelector(".addTaskButton")) {
            event.preventDefault();
            mainFunctions.createAndAppendAddTaskButtonToContentDiv();
            setEventOnAddTaskButton();
          }
        } else if (event.target.classList.contains("projectFormCancelButton")) {
          event.preventDefault();
          mainFunctions.closeOpenProjectForm();
        }
      });
    }
  }
  function setEventOnProjectElements() {
    const projectsList = document.querySelector(".projectsList");
    projectsList.addEventListener("click", function (event) {
      if (event.target.closest(".projectForm")) {
        return;
      }
      const targetProjectDiv = event.target.closest(".project");
      if (targetProjectDiv) {
        if (event.target.classList.contains("renameButton")) {
          mainFunctions.closeOpenTaskForm();
          mainFunctions.closeOpenProjectForm();
          mainFunctions.clickEventOnProjectButtonToRename(targetProjectDiv);
          setEventOnProjectForm(targetProjectDiv);
        } else if (event.target.classList.contains("deleteButton")) {
          mainFunctions.clickEventOnDeleteProjectButton(targetProjectDiv);
        } else if (event.target.classList.contains("optionsSpan")) {
          mainFunctions.clickEventOnProjectOptionIcon(targetProjectDiv);
        } else {
          mainFunctions.clickEventOnProjectDiv(targetProjectDiv);
        }
      }
    });
  }
  function makeProjectsListItemsDraggalble() {
    const projectsList = document.querySelector(".projectsList");
    if (projectsList) {
      new Sortable(projectsList, {
        draggable: ".project",
        handle: ".dragSpan",
        onUpdate: function () {
          mainFunctions.adjustProjectList();
        },
      });
    }
  }
  // Task events
  function setEventOnAddTaskButton() {
    const addTaskButton = document.querySelector(".addTaskButton");
    if (addTaskButton) {
      addTaskButton.addEventListener("click", function () {
        mainFunctions.closeOpenProjectForm();
        mainFunctions.closeOpenTaskForm();
        mainFunctions.clickEventOnAddTaskButton();
        setEventOnTaskForm();
      });
    }
  }
  function setEventOnTaskForm(taskDiv) {
    const taskForm = document.querySelector(".taskForm");
    if (taskDiv) {
      taskForm.addEventListener("click", function (event) {
        if (event.target.classList.contains("isTaskImportantInput")) {
          event.stopPropagation();
          return;
        } else if (event.target.classList.contains("taskFormCancelButton")) {
          event.preventDefault();
          mainFunctions.closeOpenTaskForm();
        }
      });
      taskForm.addEventListener("submit", function (event) {
        mainFunctions.clickEventOnEditAddTaskButton(taskDiv);
        event.preventDefault();
      });
      taskForm.addEventListener("change", function (event) {
        if (event.target.classList.contains("isTaskImportantInput")) {
          event.stopPropagation();
          return;
        }
      });
    } else {
      taskForm.addEventListener("click", function (event) {
        if (event.target.classList.contains("taskFormCancelButton")) {
          mainFunctions.closeOpenTaskForm();
        }
      });
      taskForm.addEventListener("submit", function (event) {
        mainFunctions.clickEventOnTaskFormAddButton(event);
        event.preventDefault();
      });
    }
  }
  function setEventOnTaskElements() {
    const tasksList = document.querySelector(".tasksList");
    tasksList.addEventListener("change", function (event) {
      if (tasksList.childElementCount > 0) {
        if (event.target.classList.contains("isTaskImportantInput")) {
          mainFunctions.clickEventOnTaskImportantCheckBox(event);
        }
      }
    });
    tasksList.addEventListener("click", function (event) {
      if (tasksList.childElementCount > 0) {
        const taskDiv = event.target.closest(".task");
        if (event.target.classList.contains("editButton")) {
          mainFunctions.closeOpenProjectForm();
          mainFunctions.closeOpenTaskForm();
          mainFunctions.clickEventOnEditButton(taskDiv);
          setEventOnTaskForm(taskDiv);
        } else if (event.target.classList.contains("deleteButton")) {
          mainFunctions.clickEventOnDeleteTaskButton(taskDiv);
        } else if (event.target.classList.contains("optionsSpan")) {
          mainFunctions.clickEventOnTaskOptionIcon(taskDiv);
        }
      }
    });
  }
  function makeTasksListItemsDraggable() {
    const tasksList = document.querySelector(".tasksList");
    if (tasksList) {
      new Sortable(tasksList, {
        draggable: ".liItem",
        handle: ".dragSpan",
        onUpdate: function (event) {
          const taskDiv = event.item.querySelector(".task");
          mainFunctions.adjustTaskList(taskDiv);
        },
      });
    }
  }
  // Project & Task common events
  function setEventOnAllObjectButtonContainer() {
    document.addEventListener("click", function (event) {
      const isClickedInsideOptionsContainer =
        event.target.closest(".optionsContainer");
      if (!isClickedInsideOptionsContainer) {
        mainFunctions.removeActiveClassFromOptionsButtonsContainer();
      }
    });
  }
  // Menu icon event
  function setEventOnMenuSpan() {
    const menuSpan = document.querySelector(".menuSpan");
    menuSpan.addEventListener("click", function () {
      mainFunctions.clickEventOnMenuSpan();
    });
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
    setEventOnProjectElements();
    makeProjectsListItemsDraggalble();
    makeTasksListItemsDraggable();
  }
  return {
    entryPointEventListener,
  };
};
