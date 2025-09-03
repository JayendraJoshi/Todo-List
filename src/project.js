import { Task } from  "./task";

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
}
export class ProjectList{
    constructor(){
        if(ProjectList.instance){
            return ProjectList.instance;
        }
        ProjectList.instance=this;
        this.list = [];
    }
    addProject(project){
        this.list.push(project);
    }
    getProjectByID(id){
        this.list.forEach(function(project){
            if(project.id === id){
                return project;
            }
            else{
                return null;
            }
        })

    }
}
export const handleProjects = function(){
    const addProjectButton = document.querySelector(".addProjectButton");
    const projectContainer = document.querySelector(".projectContainer");
    const projectList = new ProjectList();
    function getInputValue(){
        const name = document.querySelector(".formInput");
        return name.value;
        }
    function createNewProject(name){
        const project = new Project(name);
        return project;
    }
    function addToProjectsList(project){
        projectList.addProject(project);
    }
    function createProjectForm(){
        const projectForm = document.createElement("form");
        const projectInput = document.createElement("input");
        projectInput.classList.add("formInput");
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
       projectContainer.insertBefore(projectForm,addProjectButton);
    }
    function createProjectDiv(name, id){
        const projectDiv = document.createElement("div");
        projectDiv.textContent = name;
        projectDiv.id = id;
        return projectDiv;
    }
    function appendProjectDivToDOM(projectDiv){
        projectContainer.insertBefore(projectDiv,addProjectButton);
    }
    return{
        getInputValue,
        createNewProject,
        addToProjectsList,
        createProjectForm,
        addProjectFormToDOM,
        createProjectDiv,
        appendProjectDivToDOM,
    }
}