import { NgModule } from '@angular/core';
import { FooterComponent } from './footer.component';
import { StoreService } from '../../../services/store.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FooterComponent],
  providers: [StoreService],
  exports: [FooterComponent],
})
export class FooterComponentModule {}
