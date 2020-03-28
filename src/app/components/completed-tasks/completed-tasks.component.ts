import {Component, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Task} from "../../models/task";
import {TaskService} from "../../services/task.service";
import {takeUntil} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent implements OnDestroy {
  @Output() refreshAfterRehydration: EventEmitter<null> = new EventEmitter<null>();
  tasks: Array<Task>;
  completedTasks: Array<Task>;
  private unsubscribe$ = new Subject<void>();

  constructor(private taskService: TaskService) {
    this.taskService.getTasks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.tasks = response
        },
        (error: HttpErrorResponse) => {
          console.error("Unable to establish connection with ToDo REST service")
        });

    this.getAllCompletedTasks();
    this.completedTasks.forEach(function (task) {
      task.isCompleted = true;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getAllCompletedTasks() {
    this.completedTasks = this.taskService.getCompletedTasks();
  }

  rehydrateTask(task) {
    this.taskService.rehydrateTask(task);
    this.refreshAfterRehydration.emit();
  }
}
