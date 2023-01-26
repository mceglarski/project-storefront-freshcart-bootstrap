import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { CategoryListComponentModule } from './category-list/category-list.component-module';
import { StoreListComponentModule } from './store-list/store-list.component-module';

@NgModule({
  imports: [
    CommonModule,
    CategoryListComponentModule,
    StoreListComponentModule,
  ],
  declarations: [HomeComponent],
  providers: [],
  exports: [HomeComponent],
})
export class HomeComponentModule {}
