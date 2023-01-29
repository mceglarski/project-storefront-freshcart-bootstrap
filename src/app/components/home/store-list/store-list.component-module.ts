import { NgModule } from '@angular/core';
import { StoreListComponent } from './store-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreProductsComponentModule } from '../../store-products/store-products.component-module';

@NgModule({
  imports: [RouterModule, CommonModule, StoreProductsComponentModule],
  declarations: [StoreListComponent],
  providers: [],
  exports: [StoreListComponent],
})
export class StoreListComponentModule {}
