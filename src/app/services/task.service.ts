import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../models/task';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private taskServicePath: string = environment.hostname;

  constructor(private _http: HttpClient) {}

  addNewTask(desc: string): Observable<unknown> {
    return this._http.post<unknown>('https://' + this.taskServicePath + '/tasks', {description: desc});
  }

  updateTask(task: Task): Observable<unknown> {
    return this._http.put<unknown>('https://' + this.taskServicePath + '/tasks', task);
  }

  deleteTask(task: Task): Observable<unknown> {
    return this._http.delete<unknown>('https://' + this.taskServicePath + '/tasks?taskId=' + task.taskId);
  }

  loadActiveTasks(): Observable<Task[]> {
    return this._http.get<Task[]>('https://' + this.taskServicePath + '/activeTasks');
  }

  loadCompletedTasks(): Observable<Task[]> {
    return this._http.get<Task[]>('https://' + this.taskServicePath + '/completedTasks');
  }

}
