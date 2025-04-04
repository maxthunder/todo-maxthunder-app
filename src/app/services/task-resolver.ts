import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {Task} from '../models/task';
import {TaskService} from './task.service';

export const tasksResolver: ResolveFn<Observable<Task[]>> = ()  => {
    return inject(TaskService).loadActiveTasks();
}
