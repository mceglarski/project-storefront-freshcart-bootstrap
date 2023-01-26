import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreModel } from '../models/store.model';

const STORE_URL: string =
  'https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-stores/';

@Injectable()
export class StoreService {
  constructor(private _httpClient: HttpClient) {}

  public getAll(): Observable<StoreModel[]> {
    return this._httpClient.get<StoreModel[]>(STORE_URL);
  }

  public getOne(id: string): Observable<StoreModel> {
    return this._httpClient.get<StoreModel>(STORE_URL + id);
  }
}
