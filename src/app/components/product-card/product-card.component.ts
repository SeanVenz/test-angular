import { Component, input } from '@angular/core';
import { Product } from '../../model/profile.type';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  title = input.required<string>();
  price = input.required<number>();
  category = input<string>("Misc");
  inStock = input.required<boolean>();

  product = input<Product>();
}
