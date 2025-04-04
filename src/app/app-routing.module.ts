import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TaskListComponent} from "./components/task-list/task-list.component";

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '',
      component: TaskListComponent,
    },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
