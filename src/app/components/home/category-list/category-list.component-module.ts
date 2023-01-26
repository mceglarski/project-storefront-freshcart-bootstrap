import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category-list.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [CategoryListComponent],
  providers: [],
  exports: [CategoryListComponent]
})
export class CategoryListComponentModule {
}
