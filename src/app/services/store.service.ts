import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreModel } from '../models/store.model';

@Injectable()
export class StoreService {
  private readonly _storeUrl: string =
    'https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-stores/';

  constructor(private _httpClient: HttpClient) {}

  public getAll(): Observable<StoreModel[]> {
    return this._httpClient.get<StoreModel[]>(this._storeUrl);
  }

  public getOne(id: string): Observable<StoreModel> {
    return this._httpClient.get<StoreModel>(this._storeUrl + id);
  }
}
