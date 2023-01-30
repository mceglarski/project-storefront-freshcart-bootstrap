import { NgModule } from '@angular/core';
import { StoreListComponent } from './store-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreProductsComponentModule } from '../../store-products/store-products.component-module';
import { ApplicationPipesModule } from '../../../shared/pipes/application-pipes.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    StoreProductsComponentModule,
    ApplicationPipesModule,
  ],
  declarations: [StoreListComponent],
  providers: [],
  exports: [StoreListComponent],
})
export class StoreListComponentModule {}
