import { CartDetails } from './models/cart-details.interface';
import { CartService } from './service/cart.service';
import { Component, inject, OnInit, signal, WritableSignal, PLATFORM_ID } from '@angular/core';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { STORED_KEYS } from '../../core/constants/storedKeys';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);
  private readonly platformId = inject(PLATFORM_ID);

  cartDetailsData: WritableSignal<CartDetails> =
    signal<CartDetails>({} as CartDetails);
 private readonly router=inject(Router)
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(STORED_KEYS.userToken);
      if (token) {
        this.getUserCartData();
      }
    }
  }

  getUserCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartDetailsData.set(res.data);
        }
      }
    });
  }

  removeProductItemFromCart(id: string): void {
    this.cartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.cartCount.set(res.numOfCartItems)
          this.cartDetailsData.set(res.data);
        }
      }
    });
  }

  updateProductCount(id: string, count: number): void {
    this.cartService.updateCartQuantity(id, count).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.cartCount.set(res.numOfCartItems)
          this.cartDetailsData.set(res.data);
        }
      }
    });
  }
  goToCheckout(): void {
  const cartId = this.cartDetailsData()?._id;
  
  if (!cartId) {
    alert('Cart ID not found. Please refresh and try again.');
    return;
  }
  
  this.router.navigate(['/checkout', cartId]);
}
}
