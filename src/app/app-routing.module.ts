import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskListComponent} from "./components/task-list/task-list.component";
import {CompletedTasksComponent} from "./components/completed-tasks/completed-tasks.component";


const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'completedTasks', component: CompletedTasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
