module.exports = class Todo{
    constructor(tasks,type){
        this.tasks = tasks;
        this.type = type;
        this.tasks?.sort(this.prioritize);
    }
    prioritize(task1,task2){
        if(task1.priority > task2.priority){
            return 1;
        }
        if(task1.priority < task2.priority){
            return -1;
        }
        return 0;
    }
    display(){
        console.log(this.tasks);
    }
}