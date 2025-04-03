import {Component, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Task} from "../../models/task";
import {TaskService} from "../../services/task.service";
import {take} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent implements OnDestroy {
  tasks: Task[];
  completedTasks: Task[];
  private unsubscribe$ = new Subject<void>();

  constructor(private taskService: TaskService) {
    this.taskService.loadActiveTasks()
      .pipe(take(1))
      .subscribe(
        data => this.tasks = data,
        err => console.error(err),
      );
    this.taskService.loadCompletedTasks()
      .pipe(take(1))
      .subscribe(
        data => {
          this.completedTasks = data;
        },
        err => console.error(err),
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getAllCompletedTasks() {
    this.taskService.loadCompletedTasks()
      .pipe(take(1))
      .subscribe(
        data => this.completedTasks = data,
        err => console.error(err),
      );
  }
}
