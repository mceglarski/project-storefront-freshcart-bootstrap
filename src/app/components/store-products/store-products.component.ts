import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, shareReplay, switchMap } from 'rxjs';
import { StoreModel } from '../../models/store.model';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-store-products',
  styleUrls: ['./store-products.component.scss'],
  templateUrl: './store-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductsComponent {
  public readonly store$: Observable<StoreModel> =
    this._activatedRoute.params.pipe(
      switchMap((data) => this._storeService.getOne(data['storeId'])),
      shareReplay(1)
    );

  public readonly productList$: Observable<ProductModel[]> = combineLatest([
    this._productService.getAll(),
    this.store$,
  ]).pipe(
    map(([products, store]: [ProductModel[], StoreModel]) =>
      products.filter((product) =>
        product.storeIds.find((storeId) => store.id === storeId)
      )
    )
  );

  constructor(
    private _storeService: StoreService,
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute
  ) {}
}
