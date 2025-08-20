import { Component, input } from '@angular/core';
import { Profile } from '../../model/profile.type';

@Component({
  selector: 'app-profile-card-component',
  imports: [],
  templateUrl: './profile-card-component.component.html',
  styleUrl: './profile-card-component.component.scss'
})
export class ProfileCardComponentComponent {
  // name = input.required<string>();
  // role = input<string>('Unassigned');
  // experience = input.required<number>();

  prof = input<Profile>();
}
