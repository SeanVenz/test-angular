import { Component, input } from '@angular/core';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  // name = input<string>();
  // age = input<number>();

  constructor(private subjectService:SubjectsService){}

  sayHello(){
    this.subjectService.sendMessagePlain('Hello');
  }

  sayWorld(){
    this.subjectService.sendMessagePlain('World');
  }
}
