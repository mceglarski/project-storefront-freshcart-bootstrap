import { NgModule } from '@angular/core';
import { StoreSearchSectionComponent } from './store-search-section.component';
import { ApplicationPipesModule } from '../../../shared/pipes/application-pipes.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ApplicationPipesModule, CommonModule],
  declarations: [StoreSearchSectionComponent],
  providers: [],
  exports: [StoreSearchSectionComponent],
})
export class StoreSearchSectionComponentModule {}
