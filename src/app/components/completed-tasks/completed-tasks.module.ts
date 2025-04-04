import {NgModule} from '@angular/core';
import {CompletedTaskListComponent} from './completed-task-list/completed-task-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CompletedTasksContainer} from './completed-tasks.container';
import {CompletedTasksRoutingModule} from './completed-tasks-routing.module';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {TaskCardComponent} from '../task-card/task-card.component';

@NgModule({
  declarations: [
    CompletedTaskListComponent,
    CompletedTasksContainer,
    TaskCardComponent,
  ],
  exports: [TaskCardComponent],
  imports: [
    CommonModule,
    CompletedTasksRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class CompletedTasksModule {}
