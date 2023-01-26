import { NgModule } from '@angular/core';
import { FeaturedCategoriesListComponent } from './featured-categories-list.component';
import {CommonModule} from "@angular/common";
import {ProductService} from "../../../services/product.service";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [FeaturedCategoriesListComponent],
  providers: [ProductService],
  exports: [FeaturedCategoriesListComponent]
})
export class FeaturedCategoriesListComponentModule {
}
