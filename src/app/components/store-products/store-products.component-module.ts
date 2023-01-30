import { NgModule } from '@angular/core';
import { StoreProductsComponent } from './store-products.component';
import { CommonModule } from '@angular/common';
import { StoreSearchSectionComponentModule } from './store-search-section/store-search-section.component-module';
import { StoreProductsSectionComponentModule } from './store-products-section/store-products-section.component-module';

@NgModule({
  imports: [
    CommonModule,
    StoreSearchSectionComponentModule,
    StoreProductsSectionComponentModule,
  ],
  declarations: [StoreProductsComponent],
  providers: [],
  exports: [StoreProductsComponent],
})
export class StoreProductsComponentModule {}
