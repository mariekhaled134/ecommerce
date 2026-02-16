import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { STORED_KEYS } from '../../../core/constants/storedKeys';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id?: string;
  userId?: string;
  _id?: string;
  user_id?: string;
  sub?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  // ===============================
  // Get user ID from JWT token
  // ===============================
  private getUserId(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const token = localStorage.getItem(STORED_KEYS.userToken);
    if (!token) return null;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      return (
        decoded.id ||
        decoded.userId ||
        decoded._id ||
        decoded.user_id ||
        decoded.sub ||
        null
      );
    } catch {
      return null;
    }
  }

  // ===============================
  // Get logged user orders
  // ===============================
  getUserOrders(): Observable<any> {
    const userId = this.getUserId();

    if (!userId) {
      return throwError(() => new Error('User not authenticated'));
    }

    return this.httpClient.get(
      `${environment.base_url}orders/user/${userId}`
    );
  }
}
