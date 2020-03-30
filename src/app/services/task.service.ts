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
  private taskServicePath:string = environment.hostname + ":" + environment.port;

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

  loadActiveTasks(): Observable<Array<Task>> {
    const url = "http://"+this.taskServicePath+"/activeTasks";
    return this.http.get<Array<Task>>(url);
  }

  addNewTask(desc) {
    let task: Task = {description : desc};
    const url = "http://"+this.taskServicePath+"/activeTasks";
    this.http.post<Array<Task>>(url, task)
      .pipe(take(1))
      .subscribe(
        data => {
          this.tasks = data;
          alert("hello: in post callback: " + this.tasks.length);
        },
        err => console.error(err),
      );
  }

  completeTask(task): void {
    this.addNewCompletedTask(task);
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  deleteAllTasks(): void {
    for (const task of this.tasks) {
      this.completeTask(task);
    }
  }


  // Completed Tasks

  loadCompletedTasks(): Observable<Array<Task>> {
    const url = "http://"+this.taskServicePath+"/completedTasks";
    return this.http.get<Array<Task>>(url);
  }

  addNewCompletedTask(task: Task): void {
    task.timestamp = new Date().toDateString();
    task.isCompleted = true;
    this.completedTasks.push(task);
  }

  rehydrateTask(task): void {
    task.isCompleted = false;
    this.tasks.push(task);
    this.completedTasks.splice(this.completedTasks.indexOf(task), 1);
  }

  deleteCompletedTask(task): void {
    this.completedTasks.splice(this.completedTasks.indexOf(task), 1);
  }

}
