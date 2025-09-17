export class Project{
    constructor(name){
        this.name = name;
        this.tasks = [];
        this.id = crypto.randomUUID();
    }
    addTask(task){
        this.tasks.push(task);
    }
    getTasks(){
        return this.tasks;
    }
    getTaskByID(id){
        return this.tasks.find(function(task){
           return task.id === id;
        })
    }
    deleteTaskByID(id){
        const filteredTasks = this.tasks.filter(task => task.id!==id);
        this.tasks = filteredTasks;    
    }
}
export class ProjectList{
    constructor(){
        if(ProjectList.instance){
            return ProjectList.instance;
        }
        ProjectList.instance=this;
        this.list = [];
        this.activeProject = null;
    }
    addProject(project){
        this.list.push(project);
    }
    getProjectByID(id){
       return this.list.find(function(project){
           return project.id === id;
        })
    }
    deleteProjectByID(id){
        const filteredProjects = this.list.filter(project => project.id!==id);
        this.list = filteredProjects;   
    }
    getAllProjects(){
        return this.list;
    }
    setActiveProjectByID(id){
        this.activeProject = this.getProjectByID(id);
    }
    getActiveProject(){
        return this.activeProject;
    }
}


export const handleProjects = function(){

  
    const addProjectButton = document.querySelector(".addProjectButton");
    const projectContainer = document.querySelector(".projectContainer");
     function createProjectForm(){
        const projectForm = document.createElement("form");
        const projectInput = document.createElement("input");
        projectInput.classList.add("projectNameInput");
        projectInput.type="text";
        const addButton = document.createElement("button");
        addButton.textContent="Add";
        addButton.type="submit";
        addButton.classList.add("addButton");
        const cancelButton = document.createElement("button");
        cancelButton.textContent="Cancel";
        cancelButton.classList.add("cancelButton");
        projectForm.appendChild(projectInput);
        projectForm.appendChild(addButton);
        projectForm.appendChild(cancelButton);
        projectForm.classList.add("projectForm");
        return projectForm;
    };
    
    function addProjectFormToDOM(projectForm){
       projectContainer.insertBefore(projectForm, addProjectButton);
    }
    function createProjectDiv(project){
        const projectDiv = document.createElement("div");
        const nameElement = document.createElement("h3");
        nameElement.classList.add("projectName");
        nameElement.textContent = project.name;
        projectDiv.id = project.id;
        projectDiv.classList.add("project");
        projectDiv.appendChild(nameElement);
        return projectDiv;
    }
    function createProjectButtons(){
        const renameButton = document.createElement("button");
        renameButton.textContent="Rename";
        renameButton.classList.add("renameButton");
        const deleteButton = document.createElement("button");
        deleteButton.textContent="Delete";
        deleteButton.classList.add("deleteButton");
        return{
            renameButton,
            deleteButton
        }
    }
    function appendButtonsToProjectDiv(buttons,projectDiv){
        projectDiv.appendChild(buttons.renameButton);
        projectDiv.appendChild(buttons.deleteButton);
    }
    function appendProjectDivToProjectContainer(projectDiv){
        const projectsList = document.querySelector(".projectsList");
        projectsList.appendChild(projectDiv);
    }
    function getNameValueOfProjectForm(){
        const projectName = document.querySelector(".projectNameInput");
        return projectName.value;
    }

    function insertProjectEditFormBefore(projectEditForm,referenceElement){
        const projectsList = document.querySelector(".projectsList");
        projectsList.insertBefore(projectEditForm,referenceElement);
    }
    function updateProject(project,newName){
        project.name = newName;
    }
    function updateProjectDivName(projectDiv,targetProject){
        const projectNameElement = projectDiv.querySelector(".projectName");
        projectNameElement.textContent = targetProject.name;
    }
   function createAndAppendProjectFormOnProjectContainer(){
        addProjectFormToDOM(createProjectForm());
    }
    function createAndAppendProjectDivToProjectContainer(project){
        const projectDiv = createProjectDiv(project);
        appendButtonsToProjectDiv(createProjectButtons(),projectDiv);
        appendProjectDivToProjectContainer(projectDiv);
    }
    function createProjectBasedOnProjectFormInput(){
        return new Project(getNameValueOfProjectForm());
    }
    
    return{
        createAndAppendProjectFormOnProjectContainer,
        createAndAppendProjectDivToProjectContainer,
        createProjectBasedOnProjectFormInput,
        createProjectForm,
        addProjectFormToDOM,
        createProjectDiv,
        appendProjectDivToProjectContainer,
        getNameValueOfProjectForm,
        insertProjectEditFormBefore,
        updateProject,
        updateProjectDivName
    }
}
