import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { StoreModel } from '../../../models/store.model';

@Component({
  selector: 'app-store-search-section',
  styleUrls: ['./store-search-section.component.scss'],
  templateUrl: './store-search-section.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreSearchSectionComponent {
  @Input()
  public store: StoreModel;
}
