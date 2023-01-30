import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
import { PaginationQueryModel } from '../../query-models/pagination.query-model';

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
    this._categoryService.getAll(),
    this._activatedRoute.params,
  ]).pipe(
    map(([categories, params]: [CategoryModel[], Params]) =>
      categories.find((category) => category.id === params['categoryId'])
    )
  );

  private readonly _orderSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>(ProductsSortOption.FEATURE_VALUE_DESCENDING);
  public readonly order$: Observable<string> =
    this._orderSubject.asObservable();
  public readonly ordersList$: Observable<string[]> = of([
    ProductsSortOption.FEATURE_VALUE_DESCENDING,
    ProductsSortOption.PRICE_ASCENDING,
    ProductsSortOption.PRICE_DESCENDING,
    ProductsSortOption.AVERAGE_RATING,
  ]);

  public pageSize$: Observable<number[]> = of([5, 10, 15]);
  public paginationQueryParams$: Observable<PaginationQueryModel> =
    this._activatedRoute.queryParams.pipe(
      map((params: Params) => {
        return {
          pageNumber: params['pageNumber'] ? +params['pageNumber'] : 1,
          pageSize: params['pageSize'] ? +params['pageSize'] : 5,
        };
      }),
      shareReplay(1)
    );

  public readonly filteredSortedProductList$: Observable<ProductModel[]> =
    combineLatest([
      this._productService.getAll(),
      this._activatedRoute.params,
      this.order$,
    ]).pipe(
      map(([products, params, order]: [ProductModel[], Params, string]) =>
        this._getSortedProductsByCategory(products, params['categoryId'], order)
      ),
      shareReplay(1)
    );

  public readonly productList$: Observable<ProductModel[]> = combineLatest([
    this.filteredSortedProductList$,
    this.paginationQueryParams$,
  ]).pipe(
    map(
      ([products, paginationParams]: [ProductModel[], PaginationQueryModel]) =>
        this._getPaginatedProductList(products, paginationParams)
    )
  );

  readonly pageNumbers$: Observable<number[]> = combineLatest([
    this.filteredSortedProductList$,
    this.paginationQueryParams$,
  ]).pipe(
    map(([products, paginationParams]) => {
      return Array.from(
        Array(Math.ceil(products.length / paginationParams.pageSize)).keys()
      ).map((page) => page + 1);
    })
  );

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  public onSortOptionChange(order: string): void {
    this._orderSubject.next(order);
  }

  public onPageNumberChange(pageNumber: number): void {
    this._router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        pageNumber: pageNumber,
      },
    });
  }

  public onPageSizeChange(
    pageSize: number,
    pageNumber: number,
    productsLength: number
  ): void {
    const pageNumberCorrectValue =
      pageNumber * pageSize > productsLength
        ? Math.floor(productsLength / pageSize)
        : pageNumber;

    this._router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        pageSize: pageSize,
        pageNumber: pageNumberCorrectValue !== 0 ? pageNumberCorrectValue : 1,
      },
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

  private _getPaginatedProductList(
    products: ProductModel[],
    paginationQuery: PaginationQueryModel
  ): ProductModel[] {
    const paginationSliceStart =
      (paginationQuery.pageNumber - 1) * paginationQuery.pageSize;
    const paginationSliceEnd = paginationSliceStart + paginationQuery.pageSize;

    return products.slice(paginationSliceStart, paginationSliceEnd);
  }

  private _getSortedProductsByCategory(
    products: ProductModel[],
    categoryId: string,
    order: string
  ): ProductModel[] {
    return products
      .filter((product) => product.categoryId === categoryId)
      .sort((a, b) => {
        return this._sortProductList(a, b, order);
      });
  }

  private _sortProductList(
    a: ProductModel,
    b: ProductModel,
    order: string
  ): number {
    if (order === ProductsSortOption.PRICE_ASCENDING)
      return a.price > b.price ? 1 : -1;
    if (order === ProductsSortOption.PRICE_DESCENDING)
      return a.price < b.price ? 1 : -1;
    if (order === ProductsSortOption.AVERAGE_RATING)
      return a.ratingValue < b.ratingValue ? 1 : -1;
    if (order === ProductsSortOption.FEATURE_VALUE_DESCENDING)
      return a.featureValue < b.featureValue ? 1 : -1;
    return 0;
  }
}
