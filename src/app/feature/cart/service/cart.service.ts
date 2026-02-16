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
    // Build the URL
    const url = `${environment.base_url}orders/checkout-session/${cartId}?url=${window.location.origin}`;
    
    // LOG EVERYTHING
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔵 VISA PAYMENT - API CALL DEBUG INFO');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📍 Base URL:', environment.base_url);
    console.log('🆔 Cart ID:', cartId);
    console.log('🌐 Window Origin:', window.location.origin);
    console.log('🔗 Full API URL:', url);
    console.log('📦 Request Body:', checkoutData);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    return this.httpClient.post<PaymentDetailsResponse>(url, checkoutData).pipe(
      tap({
        next: (response) => {
          console.log('✅ VISA PAYMENT SUCCESS:', response);
        },
        error: (error) => {
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('❌ VISA PAYMENT ERROR DETAILS');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('Status Code:', error.status);
          console.log('Status Text:', error.statusText);
          console.log('Error URL:', error.url);
          console.log('Error Message:', error.message);
          console.log('Error Object:', error.error);
          console.log('Full Error:', error);
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        }
      })
    );
  }

  // DEBUG VERSION - Cash Payment
  createCashOrder(cartId: string | null, checkoutData: object): Observable<any> {
    // Build the URL
    const url = `${environment.base_url}orders/${cartId}`;
    
    // LOG EVERYTHING
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🟡 CASH PAYMENT - API CALL DEBUG INFO');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📍 Base URL:', environment.base_url);
    console.log('🆔 Cart ID:', cartId);
    console.log('🔗 Full API URL:', url);
    console.log('📦 Request Body:', checkoutData);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    return this.httpClient.post<any>(url, checkoutData).pipe(
      tap({
        next: (response) => {
          console.log('✅ CASH PAYMENT SUCCESS:', response);
        },
        error: (error) => {
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('❌ CASH PAYMENT ERROR DETAILS');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('Status Code:', error.status);
          console.log('Status Text:', error.statusText);
          console.log('Error URL:', error.url);
          console.log('Error Message:', error.message);
          console.log('Error Object:', error.error);
          console.log('Full Error:', error);
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        }
      })
    );
  }
}