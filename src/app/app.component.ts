import {Component, OnDestroy} from '@angular/core';
import {Task} from "./models/task";
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


  constructor() {
    this.completedTasks = [];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
