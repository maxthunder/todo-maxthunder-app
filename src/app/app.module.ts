import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import {FormsModule} from "@angular/forms";
import { CompletedTasksComponent } from './components/completed-tasks/completed-tasks.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    CompletedTasksComponent,
    TaskCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormsModule,
    CommonModule,
    CommonModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
