import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryModel } from '../../../models/category.model';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input()
  public categoryList: CategoryModel[] = [];

  private _collapseNavigation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public collapseNavigation$: Observable<boolean> = this._collapseNavigation.asObservable();

  public showCollapsedNavigation(): void {
    this._collapseNavigation.next(true);
  }

  public hideCollapsedNavigation(): void {
    this._collapseNavigation.next(false);
  }
}
