import {inject, NgModule} from '@angular/core';
import {ResolveFn, RouterModule} from '@angular/router';
import {CompletedTasksContainer} from './completed-tasks.container';
import {Observable} from 'rxjs';
import {Task} from '../../models/task';
import {TaskService} from '../../services/task.service';
import {tasksResolver} from '../../services/task-resolver';

const completedTasksResolver: ResolveFn<Observable<Task[]>> = ()  => {
  const service = inject(TaskService);

  return service.loadCompletedTasks();
}

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'completedTasks',
      component: CompletedTasksContainer,
      resolve: {
        activeTasks: tasksResolver,
        completedTasks: completedTasksResolver,
      }
    }
  ])],
  exports: [RouterModule]
})
export class CompletedTasksRoutingModule {}
