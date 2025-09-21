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
    setActiveProjectByID(id){
        this.activeProject = this.getProjectByID(id);
    }
    getActiveProject(){
        return this.activeProject;
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
}