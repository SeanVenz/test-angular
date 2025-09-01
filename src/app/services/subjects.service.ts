import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private plainSubjectMessageSource = new Subject<string>(); // plain subject, late subscribers do not get the latest value until subscribed
  message = this.plainSubjectMessageSource.asObservable(); //source of strings, injected in user-card to change

  private behaviourMessageSource = new BehaviorSubject<string>('Initial'); //needs an initial value, late subscribers immediately gets the latest value
  behaviourMessage = this.behaviourMessageSource.asObservable()

  sendMessagePlain(message:string){
    this.plainSubjectMessageSource.next(message);
  }

  sendMessageBehavior(message:string){
    this.behaviourMessageSource.next(message);
  }
}
