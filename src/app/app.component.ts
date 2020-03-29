import {Component, OnDestroy} from '@angular/core';
import {TaskService} from "./services/task.service";
import {Task} from "./models/task";
import {take, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'todo-maxthunder-app';
  private completedTasks: Array<Task>;
  private unsubscribe$ = new Subject<void>();


  constructor(private taskService: TaskService) {
    this.completedTasks = [];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  hasCompletedTasks() {
    // this.taskService.loadCompletedTasks()
    //   .pipe(take(1))
    //   .subscribe(
    //     data => {
    //       this.completedTasks = data
    //     },
    //     err => {
    //       console.error("Unable to establish connection with ToDo REST service")
    //     });

    return this.completedTasks.length > 0;
  }
}
