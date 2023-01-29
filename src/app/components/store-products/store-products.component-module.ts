import { NgModule } from '@angular/core';
import { StoreProductsComponent } from './store-products.component';
import { CommonModule } from '@angular/common';
import { MetersDistancePipe } from '../../shared/pipes/meters-distance.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [StoreProductsComponent, MetersDistancePipe],
  providers: [],
  exports: [StoreProductsComponent, MetersDistancePipe],
})
export class StoreProductsComponentModule {}
