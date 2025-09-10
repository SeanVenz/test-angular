import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterResponse, Todo, UserResponseSuccess } from '../model/profile.type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);

  getTodoFromApi = () => {
    const url = 'http://localhost:3000/api/todos/';
    return this.http.get<{success: boolean, data: Todo[]}>(url,
      { withCredentials: true}
    ).pipe(
      map(response => response.data)
    );
  }

  addTodoForApi = (todo:Todo) => {
    const url = 'http://localhost:3000/api/todos/';
    return this.http.post<{success: boolean, data: Todo}>(url, todo, { withCredentials: true}).pipe(
      map(response => response.data)
    );
  }

  editTodoApi = (todo:Todo) => {
    const url = `http://localhost:3000/api/todos/${todo.id}`;
    const body = { title: todo.title, completed:todo.completed };
    return this.http.put<{success: boolean, data: Todo}>(url, body, { withCredentials: true}).pipe(
      map(response => response.data)
    );
  }

  deleteTodoApi = (id:string) => {
    const url = `http://localhost:3000/api/todos/${id}`;
    return this.http.delete<{id:string}>(url, { withCredentials: true})
  }

  getTodoApi = (id:string) => {
    const url = `http://localhost:3000/api/todos/${id}`;
    return this.http.get<{success:boolean, data:Todo}>(url, { withCredentials: true}).pipe(
      map(response => response.data)
    )
  }

  register = (username:string, password:string, email:string) => {
    const url = `http://localhost:3000/api/users/register`
    const body = {username, password, email};

    return this.http.post<RegisterResponse>(url, body, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  getProfile = (token:string) => {
    const url = `http://localhost:3000/api/users/profile`
    console.log(`Token when called from effect: Bearer ${token}`)
    return this.http.get<UserResponseSuccess>(url, 
      { withCredentials: true}
    )
  }

  logout = () => {
     const url = `http://localhost:3000/api/users/logout`
     return this.http.post(url, '')
  }

  login = (email:string, password:string) : Observable<UserResponseSuccess> => {
    const url = `http://localhost:3000/api/users/login`
    const body = {email, password };
    const effect = this.http.post<UserResponseSuccess>(url, body, {
      headers: {'Content-Type': 'application/json'}
    });
    return effect;
  }
  
  delete = () => {
    const url = `http://localhost:3000/api/users/delete/493937dc-b649-4d0b-9d61-9ea0715187a4`
    return this.http.delete(url);
  }

  edit = () => {
    const url = `http://localhost:3000/api/users/edit/5cfe06fe-8dc7-4fa0-91fc-b8dd97cf4e30`
    const body = {username: 'bilat', 'email': 'bilat@gmail.com'}
    return this.http.put(url, body);
  }

}
