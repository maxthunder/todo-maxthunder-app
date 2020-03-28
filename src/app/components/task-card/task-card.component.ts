import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Task } from 'src/app/task';
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task: Task;
  @Output() refreshAfterDelete: EventEmitter<null> = new EventEmitter<null>();
  isCompleted: boolean;

  constructor(private taskService: TaskService) {
    this.isCompleted = false;
  }

  delete() {
    if (!this.task.isCompleted) {
      this.taskService.deleteTask(this.task);
    } else {
      this.taskService.deleteCompletedTask(this.task);
    }
    this.refreshAfterDelete.emit();
  }

}
