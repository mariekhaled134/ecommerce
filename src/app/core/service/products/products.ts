import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductResponsive } from '../../models/productsI/product.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Products {
    private readonly httpClient= inject (HttpClient)
  getAllProduct(page:number=1,limit:number=10):Observable<ProductResponsive>{
    return this.httpClient.get<ProductResponsive>(environment.base_url + `products?page=${page}&limit=${limit}`) 
  }
}
