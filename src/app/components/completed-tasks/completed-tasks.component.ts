import { Component, Output, EventEmitter } from '@angular/core';
import {Task} from "../../task";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent {
  @Output() refreshAfterRehydration: EventEmitter<null> = new EventEmitter<null>();
  tasks: Array<Task>;
  completedTasks: Array<Task>;

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
    this.getAllCompletedTasks()
    this.completedTasks.forEach(function (task) {
      task.isCompleted = true;
    });
  }

  getAllCompletedTasks() {
    this.completedTasks = this.taskService.getCompletedTasks();
  }

  rehydrateTask(task) {
    this.taskService.rehydrateTask(task);
    this.refreshAfterRehydration.emit();
  }
}
