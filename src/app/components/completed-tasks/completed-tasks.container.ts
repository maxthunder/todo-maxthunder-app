import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'completed-tasks.container.html'
})
export class CompletedTasksContainer {
  constructor(public route: ActivatedRoute) {}
}
