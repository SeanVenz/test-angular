import { Component, signal } from '@angular/core';
import { createReducer, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCounter } from '../../stateManagement/counter/counter.selectors';
import { decrement, increment, reset } from '../../stateManagement/counter/counter.action';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Todo } from '../../model/profile.type';
import { getCompletedProgress, getCompletedTodos, selectTodos, totalTodoCount } from '../../stateManagement/todo/todo.selector';
import { addTodo, removeTodo, toggleTodo } from '../../stateManagement/todo/todo.action';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, RouterLink, NgClass, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  //COUNTER SAMPLE

  // counter:Observable<number>;

  // constructor(private store:Store){
  //   this.counter = this.store.select(selectCounter);
  // }

  // onIncrement(){
  //   this.store.dispatch(increment());
  // }

  // onDecrement(){
  //   this.store.dispatch(decrement());
  // }
   
  // onReset(){
  //   this.store.dispatch(reset());
  // }

  //TODO SAMPLE
  newTodo = '';
  todo:Observable<Todo[]>;
  completed:Observable<number>;
  total:Observable<number>;
  inProgress:Observable<number>;

  constructor(private store:Store){
    this.todo = this.store.select(selectTodos)
    this.completed = this.store.select(getCompletedTodos);
    this.total = this.store.select(totalTodoCount);
    this.inProgress = this.store.select(getCompletedProgress)
  }

  onAddTodo(){
    if(this.newTodo.trim()){
      this.store.dispatch(addTodo({title:this.newTodo}))
    }
  }

  onToggle(id:number){
    this.store.dispatch(toggleTodo({id}))
  }

  onRemove(id:number){
    this.store.dispatch(removeTodo({id}))
  }
}
