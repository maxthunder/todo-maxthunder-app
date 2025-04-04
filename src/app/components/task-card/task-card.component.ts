import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Task } from 'src/app/models/task';
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
  // TODO  - consider converting to standalone plz
})
export class TaskCardComponent {
  @Input() task: Task;
  @Output() refreshTasks: EventEmitter<null> = new EventEmitter<null>();

  constructor(private _taskService: TaskService) { }

  /**
   * If task is active, then update task to be completed.
   * If task is completed, then delete task from app.
   */
  closeTask() {
    if (!this.task.isCompleted) {// update active task to be completed
      this.task.isCompleted = true;
      this._taskService.updateTask(this.task)
        .subscribe(() => this.refreshTasks.emit());
    } else {// delete task from backend/database
      this._taskService.deleteTask(this.task)
        .subscribe(() => this.refreshTasks.emit());
    }
  }

  rehydrateTask() {
    if (this.task.isCompleted) {
      this.task.isCompleted = false;
      this._taskService.updateTask(this.task)
        .subscribe(() => this.refreshTasks.emit());
    }
  }
}
