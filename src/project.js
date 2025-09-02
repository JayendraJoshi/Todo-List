class Project{
    constructor(name){
        this.name = name;
        this.tasks = [];
    }
    addTask(task){
        this.tasks.push(task);
    }
    getTasks(){
        return this.tasks;
    }
}
class ProjectList{
    constructor(){
        if(ProjectList.instance){
            return ProjectList.insatnce;
        }
        ProjectList.insatnce=this;
        this.list = [];
    }
    addProject(project){
        this.list.push(project);
    }
}
