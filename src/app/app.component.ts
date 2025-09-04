import { AfterViewInit, Component, effect, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { UserCardComponent } from './components/user-card/user-card.component';
import { Cart, Product, Profile, Student, Task, Todo } from './model/profile.type';
import { ProfileCardComponentComponent } from './components/profile-card-component/profile-card-component.component';
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { StudentComponent } from "./components/student/student.component";
import { ApiService } from './services/api.service';
import { catchError, combineLatest, concat, debounceTime, distinctUntilChanged, filter, forkJoin, from, fromEvent, interval, map, merge, Observable, of, race, Subscription, switchMap, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { SubjectsLessonComponent } from "./components/subjects-lesson/subjects-lesson.component";
import { SubjectsService } from './services/subjects.service';
import { BehaviorComponent } from "./components/behavior/behavior.component";
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectCounter } from './stateManagement/counter/counter.selectors';
import { decrement, increment, reset } from './stateManagement/counter/counter.action';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, SubjectsLessonComponent, UserCardComponent, BehaviorComponent, RouterLink, RouterOutlet],
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

  //this is used for searching (aka debounce time)
  // @ViewChild('searchBox', {static:true}) searchBox!: ElementRef<HTMLInputElement>;
  // private subscription!: Subscription;
  // users: any[] = [];
  // http = inject(HttpClient)

  //this is for if you have multiple sources (and dont care who comes first)
  // usersAndPosts = signal<string[]>([]);
  // messages = signal<string[]>([]);

  // loadFromMultipleSources = () => {
  //   const users = this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
  //   const posts = this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts')

  //   merge(users, posts).subscribe((res) => {
  //     if(Array.isArray(res) && res[0].username){
  //       this.usersAndPosts.update(prev => [...prev, ...res.map((user: any) => user.username)]);
  //       this.messages.update(prev => [...prev, `Loaded ${res.length} users`])
  //     } else if (Array.isArray(res) && res[0].title){
  //       this.usersAndPosts.update(prev => [...prev,  ...res.map((user: any) => user.title)]);
  //       this.messages.update(prev => [...prev, `Loaded ${res.length} posts`]);
  //     }
  //   })
  // }

  //this is for when yuo have multiple sources, and order matters
  // users = signal<string[]>([]);
  // posts = signal<string[]>([]);

  //combineLatest is for when a specific tasks are finished for both observables
  // @ViewChild('userBox', {static:false}) userBox!: ElementRef<HTMLInputElement>;
  // @ViewChild('postBox', {static:false}) postBox!: ElementRef<HTMLInputElement>;

  // users = signal<string[]>([])
  // posts = signal<string[]>([]);

  //forkJoin is used to wait for everything to finish, then emits it all.
  // result = signal<any[]>([]);

  //race is for the fastest observable
  // result = signal<any[]>([]);

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

    //sequential loading (depends on whos first in the parameter)
    // const users = this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
    // const posts = this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts')
    // concat(users, posts).subscribe((res) => {
    //   if(Array.isArray(res) && res[0].username){
    //     this.users.set(res.map((user: any) => user.username));
    //   } else if(Array.isArray(res) && res[0].title){
    //     this.posts.set(res.map((post:any) => post.title));
    //   }
    // })

    // forkJoin({
    //   user: this.http.get('https://jsonplaceholder.typicode.com/users/1'),
    //   post: this.http.get('https://jsonplaceholder.typicode.com/posts/1'),
    //   todo: this.http.get('https://jsonplaceholder.typicode.com/todos/1'),
    // }).subscribe(res => {
    //   this.result.update(prev => [...prev, res]);
    //   console.log(res)
    // })

    //race is used for what observable can finish first
    // const users = this.http.get('https://jsonplaceholder.typicode.com/users/1');
    // const posts = this.http.get('https://jsonplaceholder.typicode.com/posts/1');
    // const todos = this.http.get('https://jsonplaceholder.typicode.com/todos/1');

    // race(users, posts, todos).subscribe(res => {
    //   console.log('Winner: ', res)
    // })
  }

  ngAfterViewInit(): void {
    // debounceTime
    // this.subscription = fromEvent<InputEvent>(this.searchBox.nativeElement, 'input')
    //   .pipe(
    //     debounceTime(500),
    //     distinctUntilChanged(),
    //     takeUntilDestroyed(),
    //     switchMap(event => {
    //       const searchTerm = (event.target as HTMLInputElement).value;
    //       return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users?name_like=${searchTerm}`);
    //   })
    //   )
    //   .subscribe(value => {
    //     this.users = value;
    //   });

    //combineLatest is for when a specific tasks are finished for both observables, then it will run
    //but whenever theres a change, with other observables, it will run again
    // const userInput = fromEvent<InputEvent>(this.userBox.nativeElement, 'input').pipe(
    //   debounceTime(400),
    //   map(e => (e.target as HTMLInputElement).value),
    // );
    // const postInput = fromEvent<InputEvent>(this.postBox.nativeElement, 'input').pipe(
    //   debounceTime(400),
    //   map(e => (e.target as HTMLInputElement).value)
    // );

    // combineLatest([userInput, postInput]).pipe(
    //   switchMap(([userTerm, postTerm]) => 
    //     combineLatest([
    //       this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users?name_like=${userTerm}`),
    //       this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?title_like=${postTerm}`)
    //     ])
    //   )
    // ).subscribe(([users, posts]) => {
    //   this.users.set(users.map((user:any) => user.username));
    //   this.posts.set(posts.map((post:any) => post.title))
    // })
  }

  ngOnDestroy(): void {
      
  }

  counter: Observable<number>;

  constructor(private store:Store){
    this.counter = this.store.select(selectCounter);
  }

  onIncrement(){
    this.store.dispatch(increment());
  }

  onDecrement(){
    this.store.dispatch(decrement());
  }

  onReset(){
    this.store.dispatch(reset());
  }
}
