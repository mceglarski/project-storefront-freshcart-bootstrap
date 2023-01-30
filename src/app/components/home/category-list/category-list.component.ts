import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {CategoryModel} from "../../../models/category.model";

@Component({
  selector: 'app-category-list',
  styleUrls: ['./category-list.component.scss'],
  templateUrl: './category-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  @Input()
  public categoryList: CategoryModel[] = [];
}
