import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { StoreModel } from '../../models/store.model';
import { StoreService } from '../../services/store.service';
import { StoreTagModel } from '../../models/store-tag.model';
import { StoreWithTagsQueryModel } from '../../query-models/store-with-tags.query-model';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public readonly categoryList$: Observable<CategoryModel[]> =
    this._categoryService.getAll().pipe(shareReplay(1));

  private readonly _storeList$: Observable<StoreModel[]> =
    this._storeService.getAll();
  private readonly _storeTagList$: Observable<StoreTagModel[]> =
    this._storeService.getAllStoreTags();

  public readonly storeWithTagsList$: Observable<StoreWithTagsQueryModel[]> =
    combineLatest([this._storeList$, this._storeTagList$]).pipe(
      map(([stores, tagIds]: [StoreModel[], StoreTagModel[]]) =>
        this._mapToStoreTagQuery(stores, tagIds)
      )
    );

  constructor(
    private _categoryService: CategoryService,
    private _storeService: StoreService
  ) {}

  private _mapToStoreTagQuery(
    stores: StoreModel[],
    tagIds: StoreTagModel[]
  ): StoreWithTagsQueryModel[] {
    const tagMap = tagIds.reduce((a, c) => {
      return { ...a, [c.id]: c };
    }, {}) as Record<string, StoreTagModel>;

    return stores.map((store) => ({
      id: store.id,
      name: store.name,
      logoUrl: store.logoUrl,
      distance: Math.round(store.distanceInMeters / 100) / 10,
      storeTags: store.tagIds.map((tag) => tagMap[tag]?.name),
    }));
  }
}
