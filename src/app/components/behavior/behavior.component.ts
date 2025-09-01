import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-behavior-demo',
  templateUrl: './behavior.component.html',
  styleUrls: ['./behavior.component.scss'],
  imports: []
})
export class BehaviorComponent implements OnInit {
  private plain = new Subject<string>();
  plainLogs:string[] = [];

  private behavior$ = new BehaviorSubject<string>('Initial');
  behaviorLogs: string[] = [];

  //can be empty (will subscribe to beginning, or have a parameter of what is the latest)
  private replay = new ReplaySubject<string>(2);
  replayLogs: string[] = [];

  private async$ = new AsyncSubject<string>();

  emitValues() {
    this.async$.next('First');
    this.async$.next('Second');
    this.async$.next('Third');
    console.log('AsyncSubject values emitted (waiting for complete)');
    console.log(this.async$);
  }

  subscribeA() {
    this.async$.subscribe((val) => console.log('Async A:', val));
    console.log('Listener A subscribed');
  }

  subscribeB() {
    this.async$.subscribe((val) => console.log('Async B:', val));
    console.log('Listener B subscribed');
  }

  //for async behavior, nothing will be sent unless complete is called. (most likely used in http requests)
  complete() {
    this.async$.complete();
    console.log('AsyncSubject completed!');
  }

  ngOnInit() {

    //PLAIN flavor
    this.plain.subscribe(value => {
      this.plainLogs.push(`Listener A value: ${value}`);
    })

    //set new value
    this.plain.next('A');
    this.plain.next('B');

    //listener B subscribes late and does not see previous value
    this.plain.subscribe(value => {
      this.plainLogs.push(`Listener B value: ${value}`)
    })

    this.plain.next('C');
    this.plain.next('D');


    //BEHAVIOR FLAVOR

    // Listener A subscribes early
    this.behavior$.subscribe(value => {
      this.behaviorLogs.push(`Listener A value: ${value}`);
    });

    // Emit some values
    this.behavior$.next('Hello');
    this.behavior$.next('World');

    // Listener B subscribes late but still sees the previous value
    this.behavior$.subscribe(value => {
      this.behaviorLogs.push(`Listener B value: ${value}`);
    });

    // Emit another value
    this.behavior$.next('Goodbye');


    //REPLAY Behavior
    this.replay.subscribe(value => {
      this.replayLogs.push(`Listener A value: ${value}`)
    })

    this.replay.next('A');
    this.replay.next('B');
    this.replay.next('C');

    this.replay.subscribe(value => {
      this.replayLogs.push(`Listener B value: ${value}`)
    });

    this.replay.next('D');
  }
}
