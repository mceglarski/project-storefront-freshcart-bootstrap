import { NgModule } from '@angular/core';
import { CategoryProductsComponent } from './category-products.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: [CategoryProductsComponent],
  providers: [],
  exports: [CategoryProductsComponent],
})
export class CategoryProductsComponentModule {}
