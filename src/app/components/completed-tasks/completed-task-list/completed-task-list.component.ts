import {Component, OnDestroy, Input, OnInit} from '@angular/core';
import {Task} from "../../../models/task";
import {TaskService} from "../../../services/task.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-completed-task-list',
  templateUrl: './completed-task-list.component.html',
  styleUrls: ['./completed-task-list.component.css']
})
export class CompletedTaskListComponent implements OnInit, OnDestroy {
  @Input() activeTasks: Task[];
  @Input() completedTasks: Task[];

  private _unsubscribe$ = new Subject<void>();

  constructor(private _taskService: TaskService) {}

  ngOnInit() {
    this._taskService.loadActiveTasks()
      .subscribe(data => this.activeTasks = data);
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  getAllCompletedTasks() {
    this._taskService.loadCompletedTasks()
      .subscribe(data => this.completedTasks = data);
  }
}
