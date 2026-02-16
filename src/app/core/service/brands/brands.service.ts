import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { brandsResponse } from '../../models/brands/brands.interface';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private readonly httpClient =inject(HttpClient)
  getAllBrands():Observable<brandsResponse>{
    return this.httpClient.get<brandsResponse>(environment.base_url + 'brands/')
  }
}
