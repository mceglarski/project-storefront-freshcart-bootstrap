import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreModel } from '../models/store.model';
import { StoreTagModel } from '../models/store-tag.model';

const STORE_URL: string =
  'https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-stores/';
const STORE_TAGS_URL: string =
  'https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-store-tags/';

@Injectable()
export class StoreService {
  constructor(private _httpClient: HttpClient) {}

  public getAll(): Observable<StoreModel[]> {
    return this._httpClient.get<StoreModel[]>(STORE_URL);
  }

  public getOne(id: string): Observable<StoreModel> {
    return this._httpClient.get<StoreModel>(STORE_URL + id);
  }

  public getAllStoreTags(): Observable<StoreTagModel[]> {
    return this._httpClient.get<StoreTagModel[]>(STORE_TAGS_URL);
  }
}
