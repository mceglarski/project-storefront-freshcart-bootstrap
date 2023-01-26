import { Component } from '@angular/core';
import { CategoryService } from './services/category.service';
import { StoreService } from './services/store.service';
import { Observable, shareReplay } from 'rxjs';
import { CategoryModel } from './models/category.model';
import { StoreModel } from './models/store.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly categoryList$: Observable<CategoryModel[]> =
    this._categoryService.getAll().pipe(shareReplay(1));
  public readonly storeList$: Observable<StoreModel[]> =
    this._storeService.getAll();

  constructor(
    private _categoryService: CategoryService,
    private _storeService: StoreService
  ) {}
}
