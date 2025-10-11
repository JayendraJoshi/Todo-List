import { Project } from "./project";
export class ProjectList{
    constructor(){
        if(ProjectList.instance){
            return ProjectList.instance;
        }
        ProjectList.instance=this;
        this.list = [];
        this.activeProject = null;
        this.activeFilterType = null;
    }
    addProject(project){
        this.list.push(project);
    }
    getProjectByID(id){
       return this.list.find(function(project){
           return project.id === id;
        })
    }
    getNameOfProjectByID(id){
        const targetProject = this.getProjectByID(id);
        return targetProject.name;
    }
    deleteProjectByID(id){
        const filteredProjects = this.list.filter(project => project.id!==id);
        this.list = filteredProjects;   
    }
    getAllProjects(){
        return this.list;
    }
    setProjectsList(projectList){
        this.list = projectList;
    }
    setActiveProjectByID(id){
        this.activeFilter = null;
        this.activeProject = this.getProjectByID(id);
    }
    getActiveProject(){
        return this.activeProject;
    }
    setActiveFilterType(type){
        this.activeFilter = type;
        this.activeProject = null;
    }
    getActiveFilterType(){
        return this.activeFilter;
    }
    getSpecificTaskByID(id){
        const allProjects = this.list;
        for(let i =0; i< allProjects.length;i++){
            let tasks = allProjects[i].getTasks();
            for( let j = 0; j <tasks.length;j++){
                if(tasks[j].getID()===id){
                    return tasks[j];
                }   
            }
        }
    }
    getAllTasks(){
        const allTasks = [];
        const allProjects = this.list;
        for(let i =0; i< allProjects.length;i++){
            let tasks = allProjects[i].getTasks();
            for( let j = 0; j <tasks.length;j++){
                allTasks.push(tasks[j]);
            }
        }
        return allTasks;
    }
    fromJson(jsonProjectList){
        this.setProjectsList(jsonProjectList.list.map(jsonProject => Project.fromJson(jsonProject)));
        this.setActiveProjectByID(jsonProjectList.activeProject.id); 
    }
}
    export const handleProjectList = function(){
        const projectList = new ProjectList();
        function reorderProjects(projectDivArray){
            const reorderedProjectList = [];
            for(const projectDiv of projectDivArray){
                reorderedProjectList.push(projectList.getProjectByID(projectDiv.id));
            }
            projectList.setProjectsList(reorderedProjectList);
        }
        function reorderTasks(newTaskArray,projectID){
            const targetProject = projectList.getProjectByID(projectID);
            targetProject.setTasksArray(newTaskArray);
        }
        return{
            reorderProjects,
            reorderTasks,
        }
        
    }