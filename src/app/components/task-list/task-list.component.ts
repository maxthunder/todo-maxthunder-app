import {Component, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";
import {Task} from 'src/app/models/task';
import {TaskService} from "../../services/task.service";
import {take, takeUntil,} from "rxjs/operators";

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
    this.loadActiveTasks();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadActiveTasks() {
    this.taskService.loadActiveTasks()
      .pipe(take(1))
      .subscribe(
        data => this.tasks = data,
        err => console.error(err),
      );
  }

  add() {
    this.taskService.addNewTask(this.description);
    this.loadActiveTasks();
    this.description = '';
  }

  delete(task) {
    this.taskService.completeTask(task);
    this.loadActiveTasks();
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
