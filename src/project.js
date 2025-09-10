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
    getAllProjects(){
        return this.list;
    }
    setActiveProject(id){
        this.activeProject = this.getProjectByID(id);
    }
    getActiveProject(){
        return this.activeProject;
    }
}


export const handleProjects = function(){

    const projectUtilFunctions = function(){
    const addProjectButton = document.querySelector(".addProjectButton");
    const projectContainer = document.querySelector(".projectContainer");
     function createProjectForm(){
        const projectForm = document.createElement("form");
        const projectInput = document.createElement("input");
        projectInput.classList.add("projectName");
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
        projectDiv.textContent = project.name;
        projectDiv.id = project.id;
        return projectDiv;
    }
    function appendProjectDivToProjectContainer(projectDiv){
        const projectsList = document.querySelector(".projectsList");
        projectsList.appendChild(projectDiv);
    }
    function getNameValueOfProjectForm(){
        const projectName = document.querySelector(".projectName");
        return projectName.value;
    }
    return{
        createProjectForm,
        addProjectFormToDOM,
        createProjectDiv,
        appendProjectDivToProjectContainer,
        getNameValueOfProjectForm,
        }
    }
    const utilFunctions = projectUtilFunctions();

   function createAndAppendProjectFormOnProjectContainer(){
        utilFunctions.addProjectFormToDOM(utilFunctions.createProjectForm());
    }
    function createAndAppendProjectDivToProjectContainer(project){
        utilFunctions.appendProjectDivToProjectContainer(utilFunctions.createProjectDiv(project))
    }
    function createProjectBasedOnProjectFormInput(){
        return new Project(utilFunctions.getNameValueOfProjectForm());
    }
    
    return{
        createAndAppendProjectFormOnProjectContainer,
        createAndAppendProjectDivToProjectContainer,
        createProjectBasedOnProjectFormInput,
    }
}
