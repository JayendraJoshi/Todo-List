import { handleTasks } from "./task";
import { handleProjects} from "./project";
import { ProjectList } from "./projectList";

export const handleTaskDomManipulation = function () {
  const contentDiv = document.querySelector(".content");
  const generalDomFunctions = handleGeneralDomManipulation();

  function createButton() {
    return document.createElement("button");
  }
  function addAttributesForAddTaskButton(addTaskButton) {
    addTaskButton.classList.add("addTaskButton");
    addTaskButton.textContent = "+ Add Task";
    return addTaskButton;
  }
  function appendButtonOnContentDiv(button) {
    contentDiv.appendChild(button);
  }
  function createTaskForm() {
    const taskForm = document.createElement("form");
    taskForm.classList.add("taskForm");
    const taskNameLabel = document.createElement("label");
    const taskNameInput = document.createElement("input");
    taskNameInput.name = "nameInput";
    taskNameInput.type = "text";
    taskNameInput.classList.add("taskNameInput");
    taskNameLabel.appendChild(taskNameInput);

    const taskDescriptionLabel = document.createElement("label");
    const taskDescriptionInput = document.createElement("input");
    taskDescriptionInput.name = "descriptionInput";
    taskDescriptionInput.type = "text";
    taskDescriptionInput.classList.add("taskDescriptionInput");
    taskDescriptionLabel.appendChild(taskDescriptionInput);

    const taskDateLabel = document.createElement("label");
    const taskDateInput = document.createElement("input");
    taskDateInput.name = "dateInput";
    taskDateLabel.appendChild(taskDateInput);
    taskDateInput.classList.add("taskDateInput");
    taskDateInput.type = "date";

    const taskAddButton = document.createElement("button");
    taskAddButton.textContent = "Add";
    taskAddButton.classList.add("TaskFormAddButton");
    taskAddButton.type = "submit";

    const taskCancelButton = document.createElement("button");
    taskCancelButton.textContent = "Cancel";
    taskCancelButton.classList.add("TaskFormCancelButton");

    const taskImportantInput = document.createElement("input");
    taskImportantInput.type = "checkbox";
    const taskImportantLabel = document.createElement("label");
    taskImportantLabel.textContent = "Important";
    taskImportantInput.classList.add("isTaskImportantInput");

    taskImportantLabel.appendChild(taskImportantInput);

    taskForm.appendChild(taskNameLabel);
    taskForm.appendChild(taskDescriptionLabel);
    taskForm.appendChild(taskDateLabel);
    taskForm.appendChild(taskImportantLabel);
    taskForm.appendChild(taskAddButton);
    taskForm.appendChild(taskCancelButton);
    return taskForm;
  }
  function appendTaskFormOnContentDiv(taskForm) {
    const addTaskButton = document.querySelector(".addTaskButton");
    contentDiv.insertBefore(taskForm, addTaskButton);
  }
  function insertTaskFormBefore(taskForm, referenceElement) {
    const li = referenceElement.parentElement;
    li.insertBefore(taskForm, referenceElement);
  }
  function getInputValuesOfTaskForm() {
    const taskName = document.querySelector(".taskNameInput").value;
    const taskDescription = document.querySelector(
      ".taskDescriptionInput"
    ).value;
    const taskDueDate = document.querySelector(".taskDateInput").value;
    const isTaskImportant = document.querySelector(
      ".isTaskImportantInput"
    ).checked;
    return {
      taskName,
      taskDescription,
      taskDueDate,
      isTaskImportant,
    };
  }
  function getInputValuesOfGivenEditForm(formElement) {
    const taskName = formElement.querySelector(".taskNameInput").value;
    const taskDescription = formElement.querySelector(
        ".taskDescriptionInput"
    ).value;
    const taskDueDate = formElement.querySelector(".taskDateInput").value; // ✅ Now selects the correct input!
    const isTaskImportant = formElement.querySelector(
        ".isTaskImportantInput"
    ).checked;
    return {
      taskName,
      taskDescription,
      taskDueDate,
      isTaskImportant,
    };
  }
  function createTaskDiv(task) {
    const taskDiv = document.createElement("div");
    const taskNameDiv = document.createElement("div");
    taskNameDiv.textContent = task.getName();
    taskNameDiv.classList.add("taskName");
    const taskDescriptionDiv = document.createElement("div");
    taskDescriptionDiv.textContent = task.getDescription();
    taskDescriptionDiv.classList.add("taskDescription");
    const taskDueDateDiv = document.createElement("div");
    taskDueDateDiv.classList.add("taskDate");
    const isTaskImportantInput = document.createElement("input");
    isTaskImportantInput.type = "checkbox";
    const isTaskImportantLabel = document.createElement("label");
    isTaskImportantLabel.textContent = "Important";
    isTaskImportantLabel.appendChild(isTaskImportantInput);
    if (task.getIsImportant() === true) {
      isTaskImportantInput.checked = true;
    } else {
      isTaskImportantInput.checked = false;
    }
    isTaskImportantInput.classList.add("isTaskImportantInput");
    if (task.dueDate instanceof Date) {
      const day = String(task.dueDate.getDate()).padStart(2, "0");
      const month = String(task.dueDate.getMonth() + 1).padStart(2, "0");
      const year = task.dueDate.getFullYear();
      taskDueDateDiv.textContent = `${day}-${month}-${year}`;
    } else {
      taskDueDateDiv.textContent = "";
    }
    const optionButton = document.createElement("button");
    const editSpan1 = document.createElement("span");
    const editSpan2 = document.createElement("span");
    const editSpan3 = document.createElement("span");
    optionButton.appendChild(editSpan1);
    optionButton.appendChild(editSpan2);
    optionButton.appendChild(editSpan3);
    optionButton.classList.add("optionButton");
    const editDiv = document.createElement("div");
    editDiv.appendChild(optionButton);
    const optionDiv = document.createElement("div");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("editButton");
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.textContent = "Delete";
    deleteTaskButton.classList.add("deleteButton");
    optionDiv.appendChild(optionButton);
    optionDiv.appendChild(editButton);
    optionDiv.appendChild(deleteTaskButton);
    taskDiv.classList.add("task");
    taskDiv.id = task.id;
    taskDiv.draggable = true;
    taskDiv.appendChild(taskNameDiv);
    taskDiv.appendChild(taskDescriptionDiv);
    taskDiv.appendChild(taskDueDateDiv);
    taskDiv.appendChild(isTaskImportantLabel);
    taskDiv.appendChild(optionDiv);
    return taskDiv;
  }
  function updateTaskDivValues(taskDiv, task) {
    const taskName = taskDiv.querySelector(".taskName");
    const taskDescription = taskDiv.querySelector(".taskDescription");
    const taskDate = taskDiv.querySelector(".taskDate");
    const taskIsImportant = taskDiv.querySelector(".isTaskImportantInput");

    taskName.textContent = task.name;
    taskDescription.textContent = task.description;

    if (task.dueDate instanceof Date) {
      const day = String(task.dueDate.getDate()).padStart(2, "0");
      const month = String(task.dueDate.getMonth() + 1).padStart(2, "0");
      const year = task.dueDate.getFullYear();
      taskDate.textContent = `${day}-${month}-${year}`;
    } else {
      taskDate.textContent = "";
    }

    taskIsImportant.checked = task.getIsImportant();
  }
  function appendTaskDivOnDOM(taskDiv) {
    const li = document.createElement("li");
    li.classList.add("liItem");
    const ul = document.querySelector(".tasksList");
    li.appendChild(taskDiv);
    ul.appendChild(li);
  }
  function appendTasksToTasksList(taskArray) {
    for (let i = 0; i < taskArray.length; i++) {
      createAndAppendTaskDivToContentDiv(taskArray[i]);
    }
  }
  function fillTaskValuesIntoTaskEditForm(taskEditForm, inputValues) {
    for (const element of taskEditForm.elements) {
      if (element.classList.contains("taskNameInput")) {
        element.value = inputValues.taskName;
      } else if (element.classList.contains("taskDescriptionInput")) {
        element.value = inputValues.taskDescription;
      } else if (element.classList.contains("taskDateInput")) {
        if (inputValues.taskDate && inputValues.taskDate instanceof Date) {
          const day = String(inputValues.taskDate.getDate()).padStart(2, "0");
          const month = String(inputValues.taskDate.getMonth() + 1).padStart(
            2,
            "0"
          );
          const year = inputValues.taskDate.getFullYear();
          element.value = `${year}-${month}-${day}`;
        } else {
          element.value = "";
        }
      } else if (element.classList.contains("isTaskImportantInput")) {
        element.checked = inputValues.isImportant;
      }
    }
  }
  function addHiddenCLassToTasks(tasksDivList) {
     for (const taskDiv of tasksDivList){
        const liItem = taskDiv.closest("li");
      generalDomFunctions.addHiddenClass(liItem);
    }
  }
  function removeHiddenClassFromTasks(tasksDivList){
     for (const taskDiv of tasksDivList) {
      const liItem = taskDiv.closest("li");
      generalDomFunctions.removeHiddenClass(liItem);
    }
  }
  function getTaskDivsFromTaskIDSet(tasksSet){
    const tasksDivList = document.querySelectorAll(".task");
    const activeTaskDivsList = [];
    for (const taskDiv of tasksDivList) {
      if(tasksSet.has(taskDiv.id)){
        activeTaskDivsList.push(taskDiv);
      }
    }
    return activeTaskDivsList;
  }
  function getTaskIDsToMakeVisible(tasksToShow) {
    return new Set(tasksToShow.map(task => task.getID()));
}
  function createAndAppendAddTaskButtonToContentDiv() {
    const button = createButton();
    appendButtonOnContentDiv(addAttributesForAddTaskButton(button));
  }
  function createAndAppendTaskDivToContentDiv(task) {
    appendTaskDivOnDOM(createTaskDiv(task));
  }
  function createAndAppendTaskFormOnContentDiv() {
    appendTaskFormOnContentDiv(createTaskForm());
  }
  function updateTaskVisibility(tasksToDisplay){
    addHiddenCLassToTasks(document.querySelectorAll(".task"));
    const setOfTargetTaskIDs = getTaskIDsToMakeVisible(tasksToDisplay);
    const targetTaskDivs = getTaskDivsFromTaskIDSet(setOfTargetTaskIDs);
    removeHiddenClassFromTasks(targetTaskDivs);
  }
  return {
    createAndAppendAddTaskButtonToContentDiv,
    createAndAppendTaskDivToContentDiv,
    createAndAppendTaskFormOnContentDiv,
    createTaskForm,
    createButton,
    addAttributesForAddTaskButton,
    appendButtonOnContentDiv,
    createTaskForm,
    appendTaskFormOnContentDiv,
    getInputValuesOfTaskForm,
    createTaskDiv,
    appendTaskDivOnDOM,
    insertTaskFormBefore,
    updateTaskDivValues,
    getInputValuesOfGivenEditForm,
    appendTasksToTasksList,
    fillTaskValuesIntoTaskEditForm,
    createAndAppendAddTaskButtonToContentDiv,
    updateTaskVisibility
  };
};
export const handleProjectDomManipulation = function () {
  const addProjectButton = document.querySelector(".addProjectButton");
  const projectContainer = document.querySelector(".projectContainer");
  const projectFunctions = handleProjects();
  const projectList = new ProjectList();
  const generalDomFunctions = handleGeneralDomManipulation();

  function createProjectForm() {
    const projectForm = document.createElement("form");
    const projectInput = document.createElement("input");
    projectInput.classList.add("projectNameInput");
    projectInput.type = "text";
    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.type = "submit";
    addButton.classList.add("addButton");
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancelButton");
    projectForm.appendChild(projectInput);
    projectForm.appendChild(addButton);
    projectForm.appendChild(cancelButton);
    projectForm.classList.add("projectForm");
    return projectForm;
  }
  function addProjectFormToDOM(projectForm) {
    projectContainer.insertBefore(projectForm, addProjectButton);
  }
  function createProjectDiv(project) {
    const projectDiv = document.createElement("div");
    const nameElement = document.createElement("h3");
    nameElement.classList.add("projectName");
    nameElement.textContent = project.name;
    projectDiv.id = project.id;
    projectDiv.draggable = true;
    projectDiv.classList.add("project");
    projectDiv.appendChild(nameElement);
    return projectDiv;
  }
  function hasActiveProjectDivBeenDeleted() {
    const activeDivID = projectList.getActiveProject().id;
    if (document.querySelector(`div[id="${activeDivID}"]`)) {
      return false;
    } else {
      return true;
    }
  }
  function createDefaultProjectDiv() {
    setDefaultProjectDiv();
  }
  function setDefaultProjectDiv() {
    const defaultProject =projectFunctions.createProject("default");
    projectList.addProject(defaultProject);
    projectList.setActiveProjectByID(defaultProject.id);
    createAndAppendProjectDivToProjectContainer(defaultProject);
    generalDomFunctions.setContentContainerTitle(defaultProject.name);
  }
  function createProjectButtons() {
    const renameButton = document.createElement("button");
    renameButton.textContent = "Rename";
    renameButton.classList.add("renameButton");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");
    return {
      renameButton,
      deleteButton,
    };
  }
  function appendButtonsToProjectDiv(buttons, projectDiv) {
    projectDiv.appendChild(buttons.renameButton);
    projectDiv.appendChild(buttons.deleteButton);
  }
  function appendProjectDivToProjectContainer(projectDiv) {
    const projectsList = document.querySelector(".projectsList");
    projectsList.appendChild(projectDiv);
  }
  function getNameValueOfProjectForm() {
    const projectName = document.querySelector(".projectNameInput");
    return projectName.value;
  }
  function insertProjectEditFormBefore(projectEditForm, referenceElement) {
    const projectsList = document.querySelector(".projectsList");
    projectsList.insertBefore(projectEditForm, referenceElement);
  }
  function updateProjectDivName(projectDiv, targetProject) {
    const projectNameElement = projectDiv.querySelector(".projectName");
    projectNameElement.textContent = targetProject.name;
  }
  function areThereProjectDivsleft() {
    const projectsList = document.querySelector(".projectsList");

    if (projectsList.querySelector(".project")) {
      return true;
    } else {
      return false;
    }
  }
  function getFirstProjectDiv(){
    const projectsList = document.querySelector(".projectsList");
    return projectsList.firstElementChild;
  }
  function getAllProjectDivs(){
    const projectsList = document.querySelector(".projectsList");
    const projectsDivNodeList = projectsList.querySelectorAll(".project");
    const projectsArray = Array.from(projectsDivNodeList);
    return projectsArray;
  }
  function setFirstProjectDivToNewActiveProject() {
    const firstProjectDiv = getFirstProjectDiv();
    projectList.setActiveProjectByID(firstProjectDiv.id);
    console.log("Active Project =" + projectList.getActiveProject());
    generalDomFunctions.setContentContainerTitle(projectList.getActiveProject().name);
  }
  function fillCurrentProjectNameIntoProjectRenameForm(
    projectRenameForm,
    projectName
  ) {
    for (const element of projectRenameForm) {
      if (element.classList.contains("projectNameInput")) {
        element.value = projectName;
      }
    }
  }
  function createAndAppendProjectFormOnProjectContainer() {
    addProjectFormToDOM(createProjectForm());
  }
  function createAndAppendProjectDivToProjectContainer(project) {
    const projectDiv = createProjectDiv(project);
    appendButtonsToProjectDiv(createProjectButtons(), projectDiv);
    appendProjectDivToProjectContainer(projectDiv);
  }

  return {
    createAndAppendProjectFormOnProjectContainer,
    createAndAppendProjectDivToProjectContainer,
    createProjectForm,
    addProjectFormToDOM,
    createProjectDiv,
    appendProjectDivToProjectContainer,
    getNameValueOfProjectForm,
    insertProjectEditFormBefore,
    updateProjectDivName,
    areThereProjectDivsleft,
    hasActiveProjectDivBeenDeleted,
    setDefaultProjectDiv,
    setFirstProjectDivToNewActiveProject,
    fillCurrentProjectNameIntoProjectRenameForm,
    createDefaultProjectDiv,
    getAllProjectDivs
  };
};
export const handleGeneralDomManipulation = function () {
  function addHiddenClass(element) {
    element.classList.add("hidden");
  }
  function removeHiddenClass(element) {
    element.classList.remove("hidden");
  }
  function setContentContainerTitle(name) {
    const title = document.querySelector(".contentTitleContainer h2");
    title.textContent = name;
  }

  return {
    addHiddenClass,
    removeHiddenClass,
    setContentContainerTitle
  };
};
