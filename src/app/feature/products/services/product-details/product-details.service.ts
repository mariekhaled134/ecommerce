import { ProductResponsive } from './../../../../core/models/productsI/product.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { Products } from '../../../../core/service/products/products';
import { productDetailsResponse } from '../../models/product-details/product-details.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private readonly httpClient=inject(HttpClient)
  getSpecificProduct(id:string|null):Observable<productDetailsResponse>{
    return this.httpClient.get<productDetailsResponse>(environment.base_url + `products/${id}`)
  }
}
