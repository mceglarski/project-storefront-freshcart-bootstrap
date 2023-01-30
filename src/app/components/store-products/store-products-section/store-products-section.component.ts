import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ProductModel } from '../../../models/product.model';

@Component({
  selector: 'app-store-products-section',
  styleUrls: ['./store-products-section.component.scss'],
  templateUrl: './store-products-section.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductsSectionComponent {
  @Input()
  public productList: ProductModel[] | null = [];
}
