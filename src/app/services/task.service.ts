import {EventEmitter, Injectable, Output} from '@angular/core';
import { Task } from '../task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private readonly tasks: Array<Task>;
  private readonly completedTasks: Array<Task>;

  constructor() {
    this.tasks = [];
    this.completedTasks = [];
  }


  // Tasks

  getTasks() {
    return this.tasks.slice();
  }

  addNewTask(desc) {
    let task: Task = {description : desc, timestamp : new Date(), isCompleted: false};
    this.tasks.push(task);
    return this.getTasks();
  }

  deleteTask(task) {
    this.addNewCompletedTask(task);
    this.tasks.splice(this.tasks.indexOf(task), 1);
    return this.getTasks();
  }

  deleteAllTasks() {
    for (const task of this.tasks) {
      this.deleteTask(task);
    }
  }


  // Completed Tasks

  getCompletedTasks() {
    return this.completedTasks.slice();
  }

  addNewCompletedTask(task: Task) {
    task.timestamp = new Date();
    task.isCompleted = true;
    this.completedTasks.push(task);
    return this.getCompletedTasks();
  }

  deleteCompletedTask(task) {
    this.completedTasks.splice(this.completedTasks.indexOf(task), 1);
    return this.getCompletedTasks();
  }

}
