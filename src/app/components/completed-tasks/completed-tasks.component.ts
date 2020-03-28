import { Component, OnInit } from '@angular/core';
import {Task} from "../../task";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent {
  completedTasks: Array<Task>;
  description: string;

  constructor(private taskService: TaskService) {
    // sanitize tasks
    this.getAllCompletedTasks();
    this.completedTasks.forEach(function (task) {
      task.isCompleted = true;
    });
  }

  getAllCompletedTasks() {
    this.completedTasks = this.taskService.getCompletedTasks();
  }
}
