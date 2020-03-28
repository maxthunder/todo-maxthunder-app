import { Injectable } from '@angular/core';
import { Task } from '../task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private readonly tasks: Array<Task>;

  constructor() {
    this.tasks = [];
  }

  getTasks() {
    return this.tasks.slice();
  }

  addNewTask(desc) {
    let task: Task = {description : desc, isMarked: false};
    this.tasks.push(task);
    return this.getTasks();
  }

  deleteTask(task) {
    // TODO replace with service call
    this.tasks.splice(this.tasks.indexOf(task), 1);
    return this.getTasks();
  }

  toggleAllTasks() {
    this.tasks.forEach(function (task) {
      task.isMarked = !task.isMarked;
    })
  }

  isAllTasksChecked(): boolean {
    let flag: boolean = true;
    this.tasks.forEach(function (task) {
      if (!task.isMarked) flag = false;
    });
    return flag;
  }

  isAllTasksUnchecked(): boolean {
    let flag: boolean = true;
    this.tasks.forEach(function (task) {
      if (task.isMarked) flag = false;
    });
    return flag;
  }

  deleteAllMarkedTasks() {
    for (const task of this.tasks)
      if (task.isMarked)
        this.deleteTask(task);
  }
}
