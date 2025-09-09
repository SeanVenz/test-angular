import { Component, effect, inject, Signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { User, UserResponseSuccess } from '../../model/profile.type';
import { Store } from '@ngrx/store';
import { selectAuthError, selectAuthLoading, selectUser } from '../../stateManagement/auth/auth.selector';
import { loginUser } from '../../stateManagement/auth/auth.action';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  user$: Observable<UserResponseSuccess | null>;
  error$: Observable<string | null>
  loading$: Observable<boolean>

  constructor(private store:Store){
    this.user$ = this.store.select(selectUser)
    this.error$ = this.store.select(selectAuthError);
    this.loading$ = this.store.select(selectAuthLoading)

    console.log(this.error$);
  }

  form:FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit = () => {
    if(this.form.valid){
      const data = this.form.getRawValue();
      this.store.dispatch(loginUser({
        user:{
          email:data.email,
          password:data.password
        }
      }));
    }
  }
}
