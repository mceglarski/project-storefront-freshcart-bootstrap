import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductService {
  private readonly _productUrl: string =
    'https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-products/';

  constructor(private _httpClient: HttpClient) {}

  public getAll(): Observable<ProductModel[]> {
    return this._httpClient.get<ProductModel[]>(this._productUrl);
  }
}
