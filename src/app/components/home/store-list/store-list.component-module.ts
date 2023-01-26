import { NgModule } from '@angular/core';
import { StoreListComponent } from './store-list.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [StoreListComponent],
  providers: [],
  exports: [StoreListComponent]
})
export class StoreListComponentModule {
}
