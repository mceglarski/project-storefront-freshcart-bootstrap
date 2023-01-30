import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, shareReplay, combineLatest } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

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

  public readonly productList$: Observable<ProductModel[]> = combineLatest([
    this._productService.getAll(),
    this._activatedRoute.params,
  ]).pipe(
    map(([products, params]: [ProductModel[], Params]) =>
      products.filter((product) => product.categoryId === params['categoryId'])
    )
  );

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute
  ) {}

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
