import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { StoreWithTagsQueryModel } from '../../../query-models/store-with-tags.query-model';

@Component({
  selector: 'app-store-list',
  styleUrls: ['./store-list.component.scss'],
  templateUrl: './store-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreListComponent {
  @Input()
  public storeWithTagsList: StoreWithTagsQueryModel[] | null = [];
}
