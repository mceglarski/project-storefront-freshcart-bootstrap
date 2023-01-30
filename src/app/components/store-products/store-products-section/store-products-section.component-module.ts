import { NgModule } from '@angular/core';
import { StoreProductsSectionComponent } from './store-products-section.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [StoreProductsSectionComponent],
  providers: [],
  exports: [StoreProductsSectionComponent],
})
export class StoreProductsSectionComponentModule {}
