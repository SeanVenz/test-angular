import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCounter } from '../../stateManagement/counter/counter.selectors';
import { AsyncPipe, NgClass } from '@angular/common';
import { Todo } from '../../model/profile.type';
import { selectTodos } from '../../stateManagement/todo/todo.selector';
import { FormsModule } from '@angular/forms';
import { toggleTodo } from '../../stateManagement/todo/todo.action';

@Component({
  selector: 'app-about',
  imports: [AsyncPipe, FormsModule, NgClass],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  // counter:Observable<number>;
  todo:Observable<Todo[]>;

  // constructor(private store:Store){
  //   this.counter = this.store.select(selectCounter);
  // }

  constructor(private store:Store){
    this.todo = this.store.select(selectTodos)
  }

  onToggle(id:number){
    this.store.dispatch(toggleTodo({id}))
  }
}
