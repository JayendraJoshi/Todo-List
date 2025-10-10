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
    const taskFormNameLabel = document.createElement("label");
    const taskFormNameInput = document.createElement("input");
    taskFormNameInput.name = "nameInput";
    taskFormNameInput.type = "text";
    taskFormNameInput.maxLength=25;
    taskFormNameInput.classList.add("taskFormNameInput");
    taskFormNameLabel.appendChild(taskFormNameInput);

    const taskFormDescriptionLabel = document.createElement("label");
    const taskFormDescriptionInput = document.createElement("input");
    taskFormDescriptionInput.name = "descriptionInput";
    taskFormDescriptionInput.type = "text";
    taskFormDescriptionInput.maxLength = 500;
    taskFormDescriptionInput.classList.add("taskFormDescriptionInput");
    taskFormDescriptionLabel.appendChild(taskFormDescriptionInput);

    const taskFormDateLabel = document.createElement("label");
    const taskFormDateInput = document.createElement("input");
    taskFormDateInput.name = "dateInput";
    taskFormDateLabel.appendChild(taskFormDateInput);
    taskFormDateInput.classList.add("taskFormDateInput");
    taskFormDateInput.type = "date";

    const taskFormAddButton = document.createElement("button");
    taskFormAddButton.textContent = "Add";
    taskFormAddButton.classList.add("TaskFormAddButton");
    taskFormAddButton.type = "submit";

    const taskFormCancelButton = document.createElement("button");
    taskFormCancelButton.textContent = "Cancel";
    taskFormCancelButton.classList.add("taskFormCancelButton");

    const taskFormImportantInput = document.createElement("input");
    taskFormImportantInput.type = "checkbox";
    const taskFormImportantIcon = document.createElement("span");
    taskFormImportantIcon.textContent="star";
    taskFormImportantIcon.classList.add("material-symbols-outlined", "checkbox-icon");
    const taskFormImportantLabel = document.createElement("label");
    taskFormImportantInput.classList.add("isTaskImportantFormInput", "hidden-checkbox");

    taskFormImportantLabel.appendChild(taskFormImportantInput);
    taskFormImportantLabel.appendChild(taskFormImportantIcon);

    taskForm.appendChild(taskFormNameLabel);
    taskForm.appendChild(taskFormDescriptionLabel);
    taskForm.appendChild(taskFormDateLabel);
    taskForm.appendChild(taskFormImportantLabel);
    taskForm.appendChild(taskFormAddButton);
    taskForm.appendChild(taskFormCancelButton);
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
  function getInputValuesOfGivenForm(formElement) {
    const taskFormName = formElement.querySelector(".taskFormNameInput").value;
    const taskFormDescription = formElement.querySelector(
        ".taskFormDescriptionInput"
    ).value;
    const taskFormDueDate = formElement.querySelector(".taskFormDateInput").value; 
    const isTaskFormImportant = formElement.querySelector(
        ".isTaskImportantFormInput"
    ).checked;
    return {
      taskFormName,
      taskFormDescription,
      taskFormDueDate,
      isTaskFormImportant,
    };
  }
  function createTaskDiv(task) {
    const taskDiv = document.createElement("div");

    const taskLeftElements = document.createElement("div");
    const dragSpan = document.createElement("span");
    dragSpan.classList.add("dragSpan");
    dragSpan.classList.add("material-symbols-outlined")
    dragSpan.textContent="drag_indicator";

    //taskLeftElements.appendChild(dragSpan);

    const taskDetailElements = document.createElement("div");
    const taskNameDiv = document.createElement("div");
    taskNameDiv.textContent = task.getName();
    taskNameDiv.classList.add("taskName");
    const taskDescriptionDiv = document.createElement("div");
    taskDescriptionDiv.classList.add("taskDescription");
    const taskDescriptionDetails = document.createElement("details");
    const taskDescriptionParagraph = document.createElement("p");
    taskDescriptionParagraph.textContent=task.getDescription();
    taskDescriptionParagraph.classList.add("taskDescriptionText");
    const taskDescriptionSummary = document.createElement("summary");
    taskDescriptionSummary.textContent="Description";
    taskDescriptionDetails.appendChild(taskDescriptionSummary);
    taskDescriptionDetails.appendChild(taskDescriptionParagraph);
    taskDescriptionDiv.appendChild(taskDescriptionDetails);
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
    const taskDescriptionParagraph = taskDiv.querySelector(".taskDescriptionText");
    const taskDate = taskDiv.querySelector(".taskDate");
    const taskIsImportant = taskDiv.querySelector(".isTaskImportantInput");

    taskName.textContent = task.getName();
    taskDescriptionParagraph.textContent = task.getDescription();

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
  function fillTaskValuesIntoTaskForm(taskForm, inputValues) {
    for (const element of taskForm.elements) {
      if (element.classList.contains("taskFormNameInput")) {
        element.value = inputValues.taskName;
      } else if (element.classList.contains("taskFormDescriptionInput")) {
        element.value = inputValues.taskDescription;
      } else if (element.classList.contains("taskFormDateInput")) {
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
      } else if (element.classList.contains("isTaskImportantFormInput")) {
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
    createTaskDiv,
    appendTaskDivOnDOM,
    insertTaskFormBefore,
    updateTaskDivValues,
    getInputValuesOfGivenForm,
    appendTasksToTasksList,
    fillTaskValuesIntoTaskForm,
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
    const projectFormNameInput = document.createElement("input");
    projectFormNameInput.classList.add("projectNameInput");
    projectFormNameInput.type = "text";
    projectFormNameInput.maxLength = 20;
    projectFormNameInput.required=true;
    const projectFormAddButton = document.createElement("button");
    projectFormAddButton.textContent = "Add";
    projectFormAddButton.type = "submit";
    projectFormAddButton.classList.add("addButton");
    const projectFormCancelButton = document.createElement("button");
    projectFormCancelButton.textContent = "Cancel";
    projectFormCancelButton.classList.add("cancelButton");
    projectForm.appendChild(projectFormNameInput);
    projectForm.appendChild(projectFormAddButton);
    projectForm.appendChild(projectFormCancelButton);
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
