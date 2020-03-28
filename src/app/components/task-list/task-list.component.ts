import {Component, OnDestroy} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Task} from 'src/app/models/task';
import {TaskService} from "../../services/task.service";
import {takeUntil} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnDestroy {
  tasks: Array<Task>;
  description: string;
  private unsubscribe$ = new Subject<void>();

  constructor(private taskService: TaskService) {
    this.getAllTasks();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getAllTasks() {
    // this.tasks = this.taskService.getTasks();
    this.taskService.getTasks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.tasks = response;
        },
        (error: HttpErrorResponse) => {
          console.error("Unable to establish connection with ToDo REST service");
        });
  }

  add() {
    this.taskService.addNewTask(this.description)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.tasks = response
        },
        (error: HttpErrorResponse) => {
          console.error("Unable to establish connection with ToDo REST service")
        });

    this.description = '';
  }

  delete(task) {
    this.taskService.deleteTask(task)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.tasks = response
        },
        (error: HttpErrorResponse) => {
          console.error("Unable to establish connection with ToDo REST service")
        });
  }

  deleteAllTasks() {
    return this.taskService.deleteAllTasks()
  }

  // Test Data

  generateTestData() {
    this.taskService.addNewTask("Walk the dog.");
    this.taskService.addNewTask("Wash the dishes.");
    this.taskService.addNewTask("Mow the lawn.");
  }
}
