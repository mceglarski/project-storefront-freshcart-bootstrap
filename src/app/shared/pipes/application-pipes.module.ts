import { NgModule } from '@angular/core';
import { MetersDistancePipe } from './meters-distance.pipe';

@NgModule({
  declarations: [MetersDistancePipe],
  exports: [MetersDistancePipe],
})
export class ApplicationPipesModule {}
