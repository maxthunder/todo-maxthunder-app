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
  @Output() refreshCompletedTasks: EventEmitter<null> = new EventEmitter<null>();
  isCompleted: boolean;

  constructor(private taskService: TaskService) {
    this.isCompleted = false;
  }

  delete() {
    if (!this.task.isCompleted) {
      this.taskService.completeTask(this.task)
        .pipe(take(1))
        .subscribe(
          () => this.refreshCompletedTasks.emit(),
          err => console.error(err),
        );
    } else {
      this.taskService.deleteCompletedTask(this.task);
      this.refreshCompletedTasks.emit();
    }
  }

  rehydrate() {
    if (this.task.isCompleted) {
      this.taskService.rehydrateTask(this.task);
      this.refreshCompletedTasks.emit();
    }
  }

}
