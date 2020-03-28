import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import {FormsModule} from "@angular/forms";
import { CompletedTasksComponent } from './components/completed-tasks/completed-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    CompletedTasksComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
