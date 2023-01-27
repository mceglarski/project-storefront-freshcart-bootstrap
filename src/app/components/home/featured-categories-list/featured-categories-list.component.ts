import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { map, Observable, shareReplay } from 'rxjs';
import { ProductModel } from '../../../models/product.model';
import { CategoryId } from '../../../shared/category-id';

@Component({
  selector: 'app-featured-categories-list',
  styleUrls: ['./featured-categories-list.component.scss'],
  templateUrl: './featured-categories-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedCategoriesListComponent {
  private readonly _allProductsList$: Observable<ProductModel[]> = this._productService
    .getAll()
    .pipe(shareReplay(1));

  public readonly fruitsVegetablesProductList$: Observable<ProductModel[]> =
    this._getFeaturedProductsInCategory(CategoryId.FRUITS_VEGETABLES);
  public readonly snackMunchiesProductList$: Observable<ProductModel[]> =
    this._getFeaturedProductsInCategory(CategoryId.SNACK_MUNCHIES);

  constructor(private _productService: ProductService) {}

  private _getFeaturedProductsInCategory(
    categoryId: string
  ): Observable<ProductModel[]> {
    return this._allProductsList$.pipe(
      map((products) =>
        products
          .filter((product) => product.categoryId === categoryId)
          .sort((a, b) => {
            if (a.featureValue > b.featureValue) return -1;
            if (a.featureValue < b.featureValue) return 1;
            return 0;
          })
          .slice(0, 5)
      )
    );
  }
}
