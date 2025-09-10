import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectCurrentTodo } from '../../stateManagement/todo/todo.selector';
import { Observable } from 'rxjs';
import { Todo } from '../../model/profile.type';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-detail',
  imports: [AsyncPipe, NgIf],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent {

  todo:Observable<Todo | undefined>;

  constructor(private store: Store) {
    this.todo = this.store.select(selectCurrentTodo);
  }


}
