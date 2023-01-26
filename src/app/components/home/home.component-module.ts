import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { CategoryListComponentModule } from './category-list/category-list.component-module';
import { StoreListComponentModule } from './store-list/store-list.component-module';
import {
  FeaturedCategoriesListComponentModule
} from "./featured-categories-list/featured-categories-list.component-module";

@NgModule({
  imports: [
    CommonModule,
    CategoryListComponentModule,
    StoreListComponentModule,
    FeaturedCategoriesListComponentModule,
  ],
  declarations: [HomeComponent],
  providers: [],
  exports: [HomeComponent],
})
export class HomeComponentModule {}
