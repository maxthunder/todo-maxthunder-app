import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from '../models/task';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {catchError, delay, publishReplay, refCount, retry, take} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class TaskService {
  // private taskServicePath:string = environment.hostname + ":" + environment.port;
  private taskServicePath:string = environment.hostname;

  private tasks: Array<Task>;
  private completedTasks: Array<Task>;

  constructor(private http: HttpClient) {
    this.tasks = [];
    this.completedTasks = [];
  }

  // Tasks

  // getAllTasks() {
  //   return this.tasks.slice();
  // }

  addNewTask(desc): Observable<any> {
    let task: Task = {description : desc};
    const url = "http://"+this.taskServicePath+"/tasks";
    return this.http.post<any>(url, task)
  }

  updateTask(task): Observable<any> {
    const url = "http://"+this.taskServicePath+"/tasks";
    return this.http.put<any>(url, task)
  }

  deleteTask(task): Observable<any> {
      const url = "http://"+this.taskServicePath+"/tasks?taskId="+task.taskId;
      return this.http.delete<any>(url);
  }


  loadActiveTasks(): Observable<Array<Task>> {
    const url = "http://"+this.taskServicePath+"/activeTasks";
    return this.http.get<Array<Task>>(url);
  }

  loadCompletedTasks(): Observable<Array<Task>> {
    const url = "http://"+this.taskServicePath+"/completedTasks";
    return this.http.get<Array<Task>>(url);
  }

  rehydrateTask(task): void {
    task.isCompleted = false;
    this.tasks.push(task);
    this.completedTasks.splice(this.completedTasks.indexOf(task), 1);
  }

}
