import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo, UserResponseSuccess } from '../model/profile.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);

  getTodoFromApi = () => {
    const url = 'https://jsonplaceholder.typicode.com/todos?_limit=5';
    return this.http.get<Array<Todo>>(url);
  }

  register = (username:string, password:string, email:string) => {
    const url = `http://localhost:3000/api/users/register`
    const body = {username, password, email};

    return this.http.post<UserResponseSuccess>(url, body, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  login = (email:string, password:string) : Observable<UserResponseSuccess> => {
    const url = `http://localhost:3000/api/users/login`
    const body = {email, password };
    console.log(email, password);
    const effect = this.http.post<UserResponseSuccess>(url, body, {
      headers: {'Content-Type': 'application/json'}
    });
    console.log(effect)
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
