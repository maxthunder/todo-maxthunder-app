import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Task } from 'src/app/models/task';
import {TaskService} from "../../services/task.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task: Task;
  @Output() refreshTasks: EventEmitter<null> = new EventEmitter<null>();
  isCompleted: boolean;

  constructor(private taskService: TaskService) {
    this.isCompleted = false;
  }

  delete() {
    if (!this.task.isCompleted) {
      this.task.isCompleted=true;
      this.taskService.updateTask(this.task)
        .pipe(take(1))
        .subscribe(
          () => this.refreshTasks.emit(),
          err => console.error(err),
        );
    } else {
      this.taskService.deleteTask(this.task)
        .pipe(take(1))
        .subscribe(
          () => this.refreshTasks.emit(),
          err => console.error(err),
        );
    }
  }

  rehydrate() {
    if (this.task.isCompleted) {
      this.task.isCompleted=false;
      this.taskService.updateTask(this.task)
        .pipe(take(1))
        .subscribe(
          () => this.refreshTasks.emit(),
          err => console.error(err),
        );
    }
  }

}
