import { AfterViewInit, Component, effect, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { UserCardComponent } from './components/user-card/user-card.component';
import { Cart, Product, Profile, Student, Task, Todo } from './model/profile.type';
import { ProfileCardComponentComponent } from './components/profile-card-component/profile-card-component.component';
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { StudentComponent } from "./components/student/student.component";
import { ApiService } from './services/api.service';
import { catchError, debounceTime, distinctUntilChanged, filter, from, fromEvent, interval, map, Observable, of, Subscription, switchMap, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SubjectsLessonComponent } from "./components/subjects-lesson/subjects-lesson.component";
import { SubjectsService } from './services/subjects.service';
import { BehaviorComponent } from "./components/behavior/behavior.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, SubjectsLessonComponent, UserCardComponent, BehaviorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{
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

  // cart = signal<Cart[]>([
  //   {id: 1, name: 'bahog', price: 50},
  //   {id: 2, name: 'belat', price: 100},
  //   {id: 3, name: 'ka', price: 150},
  // ])

  // addToCart = (cart: Cart) => {
  //   console.log(cart);
  // }

  //RxJS
  // counterObservable = interval(1000);

  // counter = toSignal(this.counterObservable)

  //subscribing to observables
  // message = signal<string[]>([]);

  // ngOnInit(): void {
  //   const sampleObservable = new Observable<string>((observer) => {
  //     observer.next('Hello');
  //     observer.next('World');
  //     observer.next('Im Learning');
  //     observer.complete();
  //   });

  //   sampleObservable.subscribe({
  //     next: (value) => this.message.update(msgs => [...msgs, value]),
  //     complete: () => console.log('done')
  //   })
  // }

  // message = signal<string | null>(null);

  //Subjects - Lesson 3

  // constructor(private subjectService : SubjectsService){}
  // message = signal<string | null>(null);

  @ViewChild('searchBox', {static:true}) searchBox!: ElementRef<HTMLInputElement>;
  private subscription!: Subscription;
  users: any[] = [];
  http = inject(HttpClient)
  
  ngOnInit(): void {
    // interval(1000).pipe(
    //   take(5), //limit to 5 only
    //   filter((val) => (val % 2 === 0)), //choose what you want (could be string, etc)
    //   map((val) => `Value: ${val * 2}`) //transform the 0, 1, 2 into Value: 0, 2, 4...
    // ).subscribe({ 
    //   next: (val) => this.message.set(val),
    //   complete: () => console.log('done')
    // })

    // interval(1000).pipe(
    //   take(10),
    //   filter((val) => val % 2 !== 0),
    //   map((val) => val * 3),
    // ).subscribe({
    //   next:(val) => console.log(val),
    //   complete: () => console.log('done') 
    // })

    //Lesson 3 - Subjects
    // this.subjectService.message.subscribe((mssg)=> {
    //   this.message.set(mssg);
    // })
    // of(1,2,3).subscribe(val => console.log('Val:', val));
    // from([1,2,3]).subscribe(val => console.log('Val: ', val));

    // from([1,2,3]).pipe(
    //   map(val => val * 10),
    // ).subscribe(val => console.log(val));
  }

  ngAfterViewInit(): void {
    this.subscription = fromEvent<InputEvent>(this.searchBox.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(event => {
        const searchTerm = (event.target as HTMLInputElement).value;
        return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users?name_like=${searchTerm}`);
      })
      )
      .subscribe(value => {
        this.users = value;
      });
  }

  ngOnDestroy(): void {
      
  }
}
