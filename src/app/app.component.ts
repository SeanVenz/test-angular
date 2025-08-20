import { Component, inject, OnInit, signal } from '@angular/core';
import { UserCardComponent } from './components/user-card/user-card.component';
import { Cart, Product, Profile, Student, Task, Todo } from './model/profile.type';
import { ProfileCardComponentComponent } from './components/profile-card-component/profile-card-component.component';
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { StudentComponent } from "./components/student/student.component";
import { ApiService } from './services/api.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [StudentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'test-angular';

  //wrapping signal with proper typing
  // profiles = signal<Profile[]>([
  //   { name: 'Alice', role: 'Developer', experience: 25 },
  //   { name: 'Bob', role: 'Designer', experience: 15 },
  //   { name: 'Charlie', role: 'Manager', experience: 20 },
  // ]);

  // products = signal<Product[]>([
  //   {title: 'Laptop', price: 1500, category: 'Electronics', inStock: false},
  //   {title: 'PC', price: 1600, category: 'Electronics', inStock: true},
  //   {title: 'GameBoy', price: 1700, category: 'Electronics', inStock: false},
  //   {title: 'PS5', price: 1800, category: 'Electronics', inStock: false},
  // ])

  // students = signal<Student>({
  //   name: 'Sean', grade: 75, passed:true
  // })

  // counter = signal<number>(0);

  // increase = () => {
  //   this.counter.update(c => c + 1);
  // }

  // decrease = () => {
  //   this.counter.update(c => c - 1);
  // }

  // reset = () => {
  //   this.counter.update(c => c-=c)
  // }

  // products = signal<Cart[]>([
  //   {id: 1, name: "Test", price: 100},
  //   {id: 2, name: "Hehe", price: 1000},
  //   {id: 1, name: "Huhu", price: 50},
  // ])

  // addToCart = (cart: Cart) => {
  //   console.log(cart);
  // }

  // todoService = inject(ApiService);

  // todoItems = signal<Array<Todo>>([]);

  // ngOnInit(): void {
  //     this.todoService.getTodoFromApi()
  //       .pipe(catchError((err) => {
  //         console.log(err);
  //         throw err;
  //       })
  //     )
  //       .subscribe((todos) => {
  //         this.todoItems.set(todos);
  //       })
  // }

  apiService = inject(ApiService);

  login = () => {
    
  } 

  ngOnInit(): void {
      
  }
}
