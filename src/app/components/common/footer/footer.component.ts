import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CategoryModel } from '../../../models/category.model';
import { StoreModel } from '../../../models/store.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input()
  public categoryList: CategoryModel[] = [];
  @Input()
  public storeList: StoreModel[] = [];

  public readonly getToKnowUsList$: Observable<string[]> = of([
    'Company',
    'About',
    'Blog',
    'Help Center',
    'Our Value',
  ]);
}
