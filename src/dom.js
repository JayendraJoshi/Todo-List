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
    const taskFormNameLabelText = document.createElement("span");
    taskFormNameLabelText.textContent = "Name";
    taskFormNameLabel.appendChild(taskFormNameLabelText);
    const taskFormNameInput = document.createElement("input");
    taskFormNameInput.name = "nameInput";
    taskFormNameInput.type = "text";
    taskFormNameInput.maxLength=25;
    taskFormNameInput.classList.add("taskFormNameInput");
    taskFormNameLabel.appendChild(taskFormNameInput);

    const taskFormDescriptionLabel = document.createElement("label");
    const taskFormDescriptionLabelText = document.createElement("span");
    taskFormDescriptionLabelText.textContent = "Description";
    taskFormDescriptionLabel.appendChild(taskFormDescriptionLabelText);
    const taskFormDescriptionInput = document.createElement("input");
    taskFormDescriptionInput.name = "descriptionInput";
    taskFormDescriptionInput.type = "text";
    taskFormDescriptionInput.maxLength = 500;
    taskFormDescriptionInput.classList.add("taskFormDescriptionInput");
    taskFormDescriptionLabel.appendChild(taskFormDescriptionInput);

    const taskFormDateLabel = document.createElement("label");
    const taskFormDateLabelText = document.createElement("span");
    taskFormDateLabelText.textContent = "Due Date";
    taskFormDateLabel.appendChild(taskFormDateLabelText);
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
    const taskFormImportantLabelText = document.createElement("span");
    taskFormImportantLabelText.textContent = "Important";
    taskFormImportantLabel.appendChild(taskFormImportantLabelText);
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
    const name = formElement.querySelector(".taskFormNameInput").value;
    const description = formElement.querySelector(
        ".taskFormDescriptionInput"
    ).value;
    const dueDate = formElement.querySelector(".taskFormDateInput").value; 
    const isImportant = formElement.querySelector(
        ".isTaskImportantFormInput"
    ).checked;
    return {
      name,
      description,
      dueDate,
      isImportant,
    };
  }
  function createTaskDiv(task) {
    const taskDiv = document.createElement("div");

    const taskLeftElements = document.createElement("div");
    taskLeftElements.classList.add("taskLeftElements");
    const dragSpan = document.createElement("span");
    dragSpan.classList.add("dragSpan");
    dragSpan.classList.add("material-symbols-outlined")
    dragSpan.textContent="drag_indicator";
    const circleLabel = document.createElement("label");
    const circleChecked = document.createElement("span");
    circleChecked.classList.add("material-symbols-outlined");
    circleChecked.textContent="check_circle";
    circleChecked.classList.add("checkedCircle");
    const circleUnchecked = document.createElement("span");
    circleUnchecked.classList.add("material-symbols-outlined");
    circleUnchecked.textContent="circle";
    circleUnchecked.classList.add("uncheckedCircle");
    const circleCheckBox = document.createElement("input");
    circleCheckBox.type = "checkbox";
    circleCheckBox.classList.add("hidden-circleCheckbox");
    circleLabel.appendChild(circleCheckBox);
    circleLabel.appendChild(circleUnchecked);
    circleLabel.appendChild(circleChecked);
    taskLeftElements.appendChild(dragSpan);
    taskLeftElements.appendChild(circleLabel);
    

    const taskDetailsElements = document.createElement("div");
    taskDetailsElements.classList.add("taskDetailsElements");
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

    taskDetailsElements.appendChild(taskNameDiv);
    taskDetailsElements.appendChild(taskDescriptionDiv);

    const taskRightElements = document.createElement("div");
    taskRightElements.classList.add("taskRightElements");

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

    taskRightElements.appendChild(taskDueDateDiv);
    taskRightElements.appendChild(isTaskImportantLabel);
    taskRightElements.appendChild(optionsContainer);

    taskDiv.classList.add("task");
    taskDiv.id = task.id;
    taskDiv.draggable = true;
    taskDiv.appendChild(taskLeftElements);
    taskDiv.appendChild(taskDetailsElements);
    taskDiv.appendChild(taskRightElements);
    
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
  function fillTaskValuesIntoTaskForm(taskForm, formValues) {
    for (const element of taskForm.elements) {
      if (element.classList.contains("taskFormNameInput")) {
        element.value = formValues.name;
      } else if (element.classList.contains("taskFormDescriptionInput")) {
        element.value = formValues.description;
      } else if (element.classList.contains("taskFormDateInput")) {
        if (formValues.dueDate && formValues.dueDate instanceof Date) {
          const day = String(formValues.dueDate.getDate()).padStart(2, "0");
          const month = String(formValues.dueDate.getMonth() + 1).padStart(
            2,
            "0"
          );
          const year = formValues.dueDate.getFullYear();
          element.value = `${year}-${month}-${day}`;
        } else {
          element.value = "";
        }
      } else if (element.classList.contains("isTaskImportantFormInput")) {
        element.checked = formValues.isImportant;
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
  function hideAddTaskButton(){
    const addTaskButton = document.querySelector(".addTaskButton");
    if(addTaskButton){
      generalDomFunctions.addHiddenClass(addTaskButton);
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
    hideAddTaskButton
  };
};
export const handleProjectDomManipulation = function () {
  const addProjectButton = document.querySelector(".addProjectButton");
  const projectContainer = document.querySelector(".projectContainer");
  const projectFunctions = handleProjects();
  const projectList = new ProjectList();
  const generalDomFunctions = handleGeneralDomManipulation();
  // projectform
  function createProjectForm() {
    const projectForm = document.createElement("form");
    const projectFormNameLabel = document.createElement("label");
    const projectFormNameLabelText = document.createElement("span");
    projectFormNameLabelText.textContent = "Project Name";
    projectFormNameLabel.appendChild(projectFormNameLabelText);
    const projectFormNameInput = document.createElement("input");
    projectFormNameInput.classList.add("projectFormNameInput");
    projectFormNameInput.type = "text";
    projectFormNameInput.maxLength = 25;
    projectFormNameInput.required=true;
    projectFormNameLabel.appendChild(projectFormNameInput);
    const projectFormAddButton = document.createElement("button");
    projectFormAddButton.textContent = "Add";
    projectFormAddButton.type = "submit";
    projectFormAddButton.classList.add("projectFormAddButton");
    const projectFormCancelButton = document.createElement("button");
    projectFormCancelButton.textContent = "Cancel";
    projectFormCancelButton.classList.add("projectFormCancelButton");
    projectForm.appendChild(projectFormNameLabel);
    projectForm.appendChild(projectFormAddButton);
    projectForm.appendChild(projectFormCancelButton);
    projectForm.classList.add("projectForm");
    return projectForm;
  }
  function addProjectFormToDOM(projectForm) {
    projectContainer.insertBefore(projectForm, addProjectButton);
  }
  function insertProjectFormBefore(projectEditForm, referenceElement) {
    const projectsList = document.querySelector(".projectsList");
    projectsList.insertBefore(projectEditForm, referenceElement);
  }
  function fillCurrentProjectNameIntoProjectForm(projectForm,projectName) {
    for (const element of projectForm) {
      if (element.classList.contains("projectFormNameInput")) {
        element.value = projectName;
      }
    }
  }
  function getNameValueOfProjectForm() {
    const projectName = document.querySelector(".projectFormNameInput");
    return projectName.value;
  }
  // handle projectdivs
  function createProjectDiv(project) {
    const projectDiv = document.createElement("div");
    projectDiv.id = project.id;
    projectDiv.draggable = true;
    projectDiv.classList.add("project");
    return projectDiv;
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
  function updateProjectDivName(projectDiv, project) {
    const projectNameElement = projectDiv.querySelector(".projectName");
    projectNameElement.textContent = project.name;
  }
  function setFirstProjectDivToNewActiveProject() {
    const firstProjectDiv = getFirstProjectDiv();
    projectList.setActiveProjectByID(firstProjectDiv.id);
    generalDomFunctions.removeActiveViewClass();
    generalDomFunctions.addActiveViewClass(firstProjectDiv);
    generalDomFunctions.updateContentContainerTitle();
  }
  function appendProjectDivToProjectContainer(projectDiv) {
    const projectsList = document.querySelector(".projectsList");
    projectsList.appendChild(projectDiv);
  }
  // get project divs or values
  function areThereProjectDivsLeft() {
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
  // helper functions
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
    insertProjectFormBefore,
    updateProjectDivName,
    areThereProjectDivsLeft,
    setFirstProjectDivToNewActiveProject,
    fillCurrentProjectNameIntoProjectForm,
    getAllProjectDivs,
    createProjectDivChildren,
    getFirstProjectDiv
  };
};
export const handleGeneralDomManipulation = function () {
  const projectList = new ProjectList();

  const FILTER_TITLES = {
    "today": "Today's Tasks",
    "important": "Important Tasks",
    "next7Days": "Tasks due in next 7 Days",
    "unplanned": "Unplanned Tasks",
    "all": "All Tasks"
};

  function addHiddenClass(element) {
    element.classList.add("hidden");
  }
  function removeHiddenClass(element) {
    element.classList.remove("hidden");
  }
  function updateContentContainerTitle() {
    const title = document.querySelector(".contentTitleContainer h2");
    const activeFilter = projectList.getActiveFilterType();
    const activeProject = projectList.getActiveProject();
    if(activeFilter){
     title.textContent = FILTER_TITLES[projectList.getActiveFilterType()];
    }else if(activeProject){
      title.textContent= activeProject.name;
    }else{
      title.textContent = "Looks pretty empty in here..";
    }
  }
  function getClassOfFilter(filter){
    const classes = Array.from(filter.classList);
    const filterClass = classes.find(className => classes.includes(className));
    return filterClass
  }
  function addActiveViewClass(element){
    element.classList.add("active-view");
  }
  function removeActiveViewClass(){
    const activelyViewedElement = document.querySelector(".active-view")
    if(activelyViewedElement){
      activelyViewedElement.classList.remove("active-view");
    }
    
  }
  return {
    addHiddenClass,
    removeHiddenClass,
    updateContentContainerTitle,
    getClassOfFilter,
    addActiveViewClass,
    removeActiveViewClass
  };
};
