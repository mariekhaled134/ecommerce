import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { STORED_KEYS } from '../../../core/constants/storedKeys';
import { cartDataResponse } from '../models/cartdata.interface';
import { CartDetailsResponse } from '../models/cart-details.interface';
import { PaymentDetailsResponse } from '../../../core/models/payment-details.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  cartCount: WritableSignal<number> = signal<number>(0);
  private readonly plat_Id = inject(PLATFORM_ID);

  addProductToCart(id: string): Observable<cartDataResponse> {
    return this.httpClient.post<cartDataResponse>(
      environment.base_url + 'cart',
      {
        productId: id,
      }
    );
  }

  getLoggedUserCart(): Observable<CartDetailsResponse> {
    return this.httpClient.get<CartDetailsResponse>(environment.base_url + 'cart');
  }

  removeProductFromCart(id: string): Observable<CartDetailsResponse> {
    return this.httpClient.delete<CartDetailsResponse>(environment.base_url + `cart/${id}`);
  }

  updateCartQuantity(id: string, count: number): Observable<CartDetailsResponse> {
    return this.httpClient.put<CartDetailsResponse>(
      environment.base_url + `cart/${id}`,
      {
        count: count,
      }
    );
  }

  // DEBUG VERSION - Visa Payment
checkOutSession(cartId: string | null, checkoutData: object): Observable<PaymentDetailsResponse> {

  let returnUrl = '';

  if (isPlatformBrowser(this.plat_Id)) {
    returnUrl = window.location.origin;
  }

  const url = `${environment.base_url}orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`;

  return this.httpClient.post<PaymentDetailsResponse>(url, checkoutData);
}


  // DEBUG VERSION - Cash Payment
createCashOrder(cartId: string | null, checkoutData: object): Observable<any> {
  return this.httpClient.post<any>(
    `${environment.base_url}orders/${cartId}`,
    checkoutData
  );
}

}