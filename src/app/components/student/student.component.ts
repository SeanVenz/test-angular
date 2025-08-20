import { Component, inject, input, output, signal } from '@angular/core';
import { Cart, Student, Task, Todo } from '../../model/profile.type';
import { ButtonComponent } from '../button/button.component';
import { ApiService } from '../../services/api.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-student',
  imports: [],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {

  // grade = signal<number>(0);

  // increaseGrade = () => {
  //   this.grade.update(g => g + 1);
  // }

  // resetGrade = () => {
  //   this.grade.update(g => g-=g)
  // }

  // counter = input<number>();

  // increase = output<void>();
  // decrease = output<void>();
  // reset = output<void>();

  // cart = input<Cart[]>();

  // addToCart = output<Cart>();

  // todos = input<Todo[]>([]);

  username = signal<string>('');
  password = signal<string>('');
  email = signal<string>('')

  apiservice = inject(ApiService);

  submit = () =>{
    this.apiservice.login(this.username(), this.password(), this.email())
      .pipe(catchError((err) => {
        console.log(err);
        throw err;
      })  
    )
    .subscribe({
      next: (res) => {
        console.log('Success', res);
      },
      error:(err) => {
        console.log('err', err);
      }
    })
  }

  delete = () => {
    this.apiservice.delete()
      .subscribe({
        next: (res) => {
          console.log(res);
        },

        error:(err) => {
          console.log(err.error);
        }

        
      })
  }

  update = () => {
    this.apiservice.edit()
      .subscribe({
        next: (res) => {
          console.log(res);
        },

        error:(err) => {
          console.log(err);
        }
      })
  }
}
