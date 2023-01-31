import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { CategoryService } from '../../../services/category.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [RouterModule, CollapseModule, CommonModule],
  declarations: [HeaderComponent],
  providers: [CategoryService],
  exports: [HeaderComponent],
})
export class HeaderComponentModule {}
