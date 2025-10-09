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
    const importantIcon = document.createElement("span");
    importantIcon.textContent="star";
    importantIcon.classList.add("material-symbols-outlined", "checkbox-icon");
    const taskImportantLabel = document.createElement("label");
    taskImportantInput.classList.add("isTaskImportantInput", "hidden-checkbox");

    taskImportantLabel.appendChild(taskImportantInput);
    taskImportantLabel.appendChild(importantIcon);

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
    const importantIcon = document.createElement("span");
    importantIcon.textContent="star";
    importantIcon.classList.add("material-symbols-outlined", "checkbox-icon");
    const isTaskImportantLabel = document.createElement("label");
    isTaskImportantLabel.appendChild(isTaskImportantInput);
    isTaskImportantLabel.appendChild(importantIcon);
    if (task.getIsImportant() === true) {
      isTaskImportantInput.checked = true;
    } else {
      isTaskImportantInput.checked = false;
    }
    isTaskImportantInput.classList.add("isTaskImportantInput", "hidden-checkbox");
    if (task.dueDate instanceof Date && !isNaN(task.dueDate)) {
      console.log("is valid date")
      const day = String(task.dueDate.getDate()).padStart(2, "0");
      const month = String(task.dueDate.getMonth() + 1).padStart(2, "0");
      const year = task.dueDate.getFullYear();
      taskDueDateDiv.textContent = `${day}-${month}-${year}`;
    } else {
      taskDueDateDiv.textContent = "unplanned";
    }
    const optionsSpan = document.createElement("span");
    optionsSpan.classList.add("optionsSpan");
    optionsSpan.classList.add("material-symbols-outlined");
    optionsSpan.textContent="more_vert";
    const dragSpan = document.createElement("span");
    dragSpan.classList.add("dragSpan");
    dragSpan.classList.add("material-symbols-outlined")
    dragSpan.textContent="drag_indicator";
    const editTaskButton = document.createElement("button");
    editTaskButton.textContent = "Edit";
    editTaskButton.classList.add("editButton");
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.textContent = "Delete";
    deleteTaskButton.classList.add("deleteButton");
    const optionsButtonsContainer = document.createElement("div");
    optionsButtonsContainer.classList.add("optionsButtonsContainer");
    optionsButtonsContainer.appendChild(editTaskButton);
    optionsButtonsContainer.appendChild(deleteTaskButton);
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("optionsContainer");
    optionsContainer.appendChild(optionsButtonsContainer);
    optionsContainer.appendChild(optionsSpan);
    taskDiv.classList.add("task");
    taskDiv.id = task.id;
    taskDiv.draggable = true;
    taskDiv.appendChild(dragSpan);
    taskDiv.appendChild(taskNameDiv);
    taskDiv.appendChild(taskDescriptionDiv);
    taskDiv.appendChild(taskDueDateDiv);
    taskDiv.appendChild(isTaskImportantLabel);
    taskDiv.appendChild(optionsContainer);
    return taskDiv;
  }
  function updateTaskDivValues(taskDiv, task) {
    const taskName = taskDiv.querySelector(".taskName");
    const taskDescription = taskDiv.querySelector(".taskDescription");
    const taskDate = taskDiv.querySelector(".taskDate");
    const taskIsImportant = taskDiv.querySelector(".isTaskImportantInput");

    taskName.textContent = task.name;
    taskDescription.textContent = task.description;

    if (task.dueDate instanceof Date && !isNaN(task.dueDate)) {
      const day = String(task.dueDate.getDate()).padStart(2, "0");
      const month = String(task.dueDate.getMonth() + 1).padStart(2, "0");
      const year = task.dueDate.getFullYear();
      taskDate.textContent = `${day}-${month}-${year}`;
    } else {
      taskDate.textContent = "unplanned";
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
  function addHiddenClassToTasks(tasksDivList) {
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
      if(!tasksSet){
        return [];
      }
      else if(tasksSet.has(taskDiv.id)){
        activeTaskDivsList.push(taskDiv);
      }
    }
    return activeTaskDivsList;
  }
  function getTaskIDsToMakeVisible(tasksToShow) {
     if (tasksToShow && tasksToShow.constructor.name === 'NodeList') {
        tasksToShow = Array.from(tasksToShow);
    }
    if(tasksToShow.length!=0){
      return new Set(tasksToShow.map(task => task.id));
    }
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
    addHiddenClassToTasks(document.querySelectorAll(".task"));
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
    updateTaskVisibility,
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
    projectInput.required=true;
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
    projectDiv.id = project.id;
    projectDiv.draggable = true;
    projectDiv.classList.add("project");
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
    const projectDiv = createProjectDiv(defaultProject);
    appendElementsToProjectDiv(createProjectDivChildren(project.name), projectDiv);
    appendProjectDivToProjectContainer(projectDiv);
    updateContentContainerTitle();
  }
  function createProjectDivChildren(projectName) {
    const nameElement = document.createElement("h3");
    nameElement.classList.add("projectName");
    nameElement.textContent = projectName;
    const renameButton = document.createElement("button");
    renameButton.textContent = "Rename";
    renameButton.classList.add("renameButton");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");
    const optionsSpan = document.createElement("span");
    optionsSpan.classList.add("optionsSpan");
    optionsSpan.classList.add("material-symbols-outlined");
    optionsSpan.textContent="more_vert";
    const dragSpan = document.createElement("span");
    dragSpan.classList.add("dragSpan");
    dragSpan.classList.add("material-symbols-outlined")
    dragSpan.textContent="drag_indicator";
    return {
      nameElement,
      renameButton,
      deleteButton,
      optionsSpan,
      dragSpan,
    };
  }
  function appendElementsToProjectDiv(elements, projectDiv) {
    const optionsButtonsContainer = document.createElement("div");
    optionsButtonsContainer.classList.add("optionsButtonsContainer");
    optionsButtonsContainer.appendChild(elements.renameButton);
    optionsButtonsContainer.appendChild(elements.deleteButton);
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("optionsContainer");
    optionsContainer.appendChild(optionsButtonsContainer);
    optionsContainer.appendChild(elements.optionsSpan);
    projectDiv.appendChild(elements.dragSpan);
    projectDiv.appendChild(elements.nameElement);
    projectDiv.appendChild(optionsContainer);
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
    generalDomFunctions.updateContentContainerTitle();
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
    appendElementsToProjectDiv(createProjectDivChildren(project.name), projectDiv);
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
    getAllProjectDivs,
    createProjectDivChildren,
    appendElementsToProjectDiv,

  };
};
export const handleGeneralDomManipulation = function () {
  const projectList = new ProjectList();

  function addHiddenClass(element) {
    element.classList.add("hidden");
  }
  function removeHiddenClass(element) {
    element.classList.remove("hidden");
  }
  function updateContentContainerTitle() {
    const title = document.querySelector(".contentTitleContainer h2");
    const activeFilter = document.querySelector(".activeFilter");
    const activeProject = projectList.getActiveProject();
    if(activeFilter){
      if(activeFilter.classList.contains("today")){
      title.textContent = "Today's Tasks";
      }else if(activeFilter.classList.contains("important")){
        title.textContent = "Important Tasks";
      }else if(activeFilter.classList.contains("next7Days")){
        title.textContent = "Tasks due in next 7 Days";
      }else if(activeFilter.classList.contains("unplanned")){
        title.textContent = "Unplanned Tasks";
      }else if(activeFilter.classList.contains("allTasks")){
        title.textContent = "All Tasks";
      }
    }else if(activeProject){
      title.textContent= activeProject.name;
    }else{
      title.textContent = "Looks pretty empty in here..";
    }
  }
  function setActiveFilterClass(element){
    element.classList.add("activeFilter");
  }
  function removeCurrentActiveFilterClass(){
    const currentActiveFilter = document.querySelector(".activeFilter");
    if(currentActiveFilter){
      currentActiveFilter.classList.remove("activeFilter");
    }
  }

  return {
    addHiddenClass,
    removeHiddenClass,
    updateContentContainerTitle,
    setActiveFilterClass,
    removeCurrentActiveFilterClass,
  };
};
