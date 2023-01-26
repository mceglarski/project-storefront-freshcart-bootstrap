import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category.model';

const CATEGORY_URL: string =
  'https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-categories/';

@Injectable()
export class CategoryService {
  constructor(private _httpClient: HttpClient) {}

  public getAll(): Observable<CategoryModel[]> {
    return this._httpClient.get<CategoryModel[]>(CATEGORY_URL);
  }

  public getOne(id: string): Observable<CategoryModel> {
    return this._httpClient.get<CategoryModel>(CATEGORY_URL + id);
  }
}
