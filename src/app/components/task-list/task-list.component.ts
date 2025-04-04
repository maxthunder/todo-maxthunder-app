import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize, Subject} from 'rxjs';
import {Task} from 'src/app/models/task';
import {TaskService} from "../../services/task.service";
import {FormControl, UntypedFormGroup} from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  formGroup: UntypedFormGroup;
  loading = false
  tasks: Task[];


  private unsubscribe$ = new Subject<void>();

  constructor(private _taskService: TaskService) {
    this.loadActiveTasks();
  }

  ngOnInit(): void {
    this.formGroup = new UntypedFormGroup({
      description: new FormControl(''),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadActiveTasks() {
    this._taskService.loadActiveTasks()
      .subscribe(data => this.tasks = data);
  }

  onSubmit(): void {
    this.loading = true;

    const description = this.formGroup.get('description')?.value as string;
    if (description.trim()) {
      this._taskService.addNewTask(description)
        .pipe(finalize(() => this.loading = false))
        .subscribe(() => this.loadActiveTasks());

      this.formGroup.patchValue({ description: '' });
    }
  }
}
