import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from '../models/task';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {catchError, delay, publishReplay, refCount, retry} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private taskServicePath:string = environment.hostname + ":" + environment.port;

  private readonly tasks: Array<Task>;
  private readonly completedTasks: Array<Task>;

  constructor(private http: HttpClient) {
    this.tasks = [];
    this.completedTasks = [];
  }


  // Tasks

  getTasks(): Observable<Array<Task>> {
    const url = "http://"+this.taskServicePath+"/tasks";
    return this.http.get<Array<Task>>(url)
      .pipe(
        publishReplay(3), // this tells Rx to cache the latest emitted
        refCount());
    // return this.tasks.slice();
  }

  addNewTask(desc) {
    let task: Task = {description : desc, timestamp : new Date(), isCompleted: false};
    this.tasks.push(task);
    return this.getTasks();
  }

  deleteTask(task) {
    this.addNewCompletedTask(task);
    this.tasks.splice(this.tasks.indexOf(task), 1);
    return this.getTasks();
  }

  deleteAllTasks() {
    for (const task of this.tasks) {
      this.deleteTask(task);
    }
  }


  // Completed Tasks

  getCompletedTasks() {
    return this.completedTasks.slice();
  }

  addNewCompletedTask(task: Task) {
    task.timestamp = new Date();
    task.isCompleted = true;
    this.completedTasks.push(task);
    return this.getCompletedTasks();
  }

  rehydrateTask(task) {
    task.isCompleted = false;
    this.tasks.push(task);
    this.completedTasks.splice(this.completedTasks.indexOf(task), 1);
    return this.getCompletedTasks();
  }

  deleteCompletedTask(task) {
    this.completedTasks.splice(this.completedTasks.indexOf(task), 1);
    return this.getCompletedTasks();
  }

}
