import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../../model/profile.type';
import { Store } from '@ngrx/store';
import { registerReducer } from '../../stateManagement/auth/register.reducer';
import { registerSelector } from '../../stateManagement/auth/register.selector';
import { registerUser } from '../../stateManagement/auth/register.action';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);

  error = signal<string>('');
  success = signal<string>('');

  user$:Observable<RegisterResponse>
  constructor(private store:Store){
    this.user$ = this.store.select(registerSelector)

    this.user$.subscribe(user => {
      if(!user?.success){
        this.error.set(user.message!);
      } else {
        this.success.set(user.message!);
      }
    });
  }

  form = this.fb.group({
    userName:['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  onSubmit(){
    const data = this.form.getRawValue();
    this.store.dispatch(registerUser({
      registerInput:{
        email:data.email!,
        username:data.userName!,
        password:data.password!
      }
    }));
  }
}
