import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Params } from '@angular/router';
import {
  map,
  Observable,
  shareReplay,
  combineLatest,
  of,
  BehaviorSubject,
} from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductsSortOption } from '../../shared/products-sort-option';

@Component({
  selector: 'app-category-products',
  styleUrls: ['./category-products.component.scss'],
  templateUrl: './category-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProductsComponent {
  public readonly categoryList$: Observable<CategoryModel[]> =
    this._categoryService.getAll().pipe(shareReplay(1));
  public readonly currentCategory$: Observable<CategoryModel> = combineLatest([
    this.categoryList$,
    this._activatedRoute.params,
  ]).pipe(
    map(([categories, params]: [CategoryModel[], Params]) =>
      categories.find((category) => category.id === params['categoryId'])
    )
  );

  private _orderSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ProductsSortOption.FEATURE_VALUE_DESCENDING
  );
  public order$: Observable<string> = this._orderSubject.asObservable();
  public ordersList$: Observable<string[]> = of([
    ProductsSortOption.FEATURE_VALUE_DESCENDING,
    ProductsSortOption.PRICE_ASCENDING,
    ProductsSortOption.PRICE_DESCENDING,
    ProductsSortOption.AVERAGE_RATING,
  ]);

  public readonly productList$: Observable<ProductModel[]> = combineLatest([
    this._productService.getAll(),
    this._activatedRoute.params,
    this.order$,
  ]).pipe(
    map(([products, params, order]: [ProductModel[], Params, string]) =>
      this.getSortedProductsByCategory(products, params['categoryId'], order)
    )
  );

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute
  ) {}

  public sort(order: string): void {
    this._orderSubject.next(order);
  }

  public getSortedProductsByCategory(
    products: ProductModel[],
    categoryId: string,
    order: string
  ): ProductModel[] {
    return products
      .filter((product) => product.categoryId === categoryId)
      .sort((a, b) => {
        if (
          order === ProductsSortOption.PRICE_ASCENDING ||
          order === ProductsSortOption.PRICE_DESCENDING
        ) {
          if (a.price > b.price)
            return order === ProductsSortOption.PRICE_ASCENDING ? 1 : -1;
          if (a.price < b.price)
            return order === ProductsSortOption.PRICE_ASCENDING ? -1 : 1;
        }
        if (
          order === ProductsSortOption.FEATURE_VALUE_DESCENDING ||
          order === ProductsSortOption.AVERAGE_RATING
        ) {
          if (a.ratingValue > b.ratingValue)
            return order === ProductsSortOption.AVERAGE_RATING ? 1 : -1;
          if (a.ratingValue < b.ratingValue)
            return order === ProductsSortOption.AVERAGE_RATING ? -1 : 1;
        }
        return 0;
      });
  }

  public getStarClass(rating: number, starIndex: number): string {
    if (rating >= starIndex) {
      return 'bi-star-fill';
    }
    if (rating + 1 > starIndex && rating % 1 !== 0) {
      return 'bi-star-half';
    }
    return 'bi-star';
  }
}
