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

  constructor(private http: HttpClient) {}

  addNewTask(desc: string): Observable<any> {
    let task: Task = {description: desc};
    const url = 'https://' + this.taskServicePath + '/tasks';
    return this.http.post<any>(url, task);
  }

  updateTask(task: Task): Observable<any> {
    const url = 'https://' + this.taskServicePath + '/tasks';
    return this.http.put<any>(url, task);
  }

  deleteTask(task: Task): Observable<any> {
    const url = 'https://' + this.taskServicePath + '/tasks?taskId=' + task.taskId;
    return this.http.delete<any>(url);
  }

  loadActiveTasks(): Observable<Task[]> {
    const url = 'https://' + this.taskServicePath + '/activeTasks';
    return this.http.get<Task[]>(url);
  }

  loadCompletedTasks(): Observable<Task[]> {
    const url = 'https://' + this.taskServicePath + '/completedTasks';
    return this.http.get<Task[]>(url);
  }

}
