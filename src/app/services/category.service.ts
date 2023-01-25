import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category.model';

@Injectable()
export class CategoryService {
  private readonly _categoryUrl: string =
    'https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-categories/';

  constructor(private _httpClient: HttpClient) {}

  public getAll(): Observable<CategoryModel[]> {
    return this._httpClient.get<CategoryModel[]>(this._categoryUrl);
  }

  public getOne(id: string): Observable<CategoryModel> {
    return this._httpClient.get<CategoryModel>(this._categoryUrl + id);
  }
}
