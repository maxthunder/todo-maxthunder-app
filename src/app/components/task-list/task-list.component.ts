import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/task';
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Array<Task>;
  description: string;

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  add() {
    this.tasks = this.taskService.addNewTask(this.description);
    this.description = '';
  }

  delete(task) {
    this.tasks = this.taskService.deleteTask(task);
  }

  toggleTask(task) {
    task.isMarked = !task.isMarked;
  }

  toggleAllTasks() {
    this.taskService.toggleAllTasks()
  }

  isAllTasksChecked() {
    return this.taskService.isAllTasksChecked()
  }

  deleteAllMarkTasks() {
    return this.taskService.deleteAllMarkedTasks()
  }
}
