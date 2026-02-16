
import { CartService } from './../cart/service/cart.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  cartId: string | null = null;
  checkoutForm!: FormGroup;
  isProcessing = signal(false);

  ngOnInit(): void {
    this.checkoutFormInit();
    this.getCartId();
  }

  checkoutFormInit(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [
          Validators.required,
          Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
        ]],
        city: [null, [Validators.required]]
      })
    });
  }

  getCartId(): void {
    // METHOD 1: Try to get from route params
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
        console.log('🔍 Cart ID from route params:', this.cartId);
        
        // METHOD 2: If not found in params, try getting from cart service
        if (!this.cartId) {
          console.log('⚠️ Cart ID not found in URL, fetching from cart...');
          this.fetchCartId();
        }
      }
    });
  }

  // Fetch cart ID from the cart API
  fetchCartId(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (cart) => {
        console.log('✅ Cart data received:', cart);
        if (cart.data && cart.data._id) {
          this.cartId = cart.data._id;
          console.log('✅ Cart ID set from API:', this.cartId);
        } else {
          console.error('❌ No cart data found');
          alert('No cart found. Please add items to cart first.');
          this.router.navigate(['/cart']);
        }
      },
      error: (err) => {
        console.error('❌ Error fetching cart:', err);
        alert('Error loading cart. Please try again.');
        this.router.navigate(['/cart']);
      }
    });
  }

  // Visa/Card Payment - Online payment via Stripe
  onSubmitVisaPayment(): void {
    console.log('🔵 Visa Payment clicked');
    console.log('Cart ID:', this.cartId);

    // Validate cart ID first
    if (!this.cartId) {
      console.error('❌ Cart ID is missing!');
      alert('Cart ID is missing! Redirecting to cart...');
      this.router.navigate(['/cart']);
      return;
    }

    // Validate form
    if (this.checkoutForm.invalid) {
      this.markFormGroupTouched(this.checkoutForm);
      alert('Please fill in all required fields correctly.');
      return;
    }

    this.isProcessing.set(true);

    this.cartService.checkOutSession(this.cartId, this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log('✅ Visa payment response:', res);
        if (res.status === 'success') {
          window.open(res.session.url, '_self');
        } else {
          alert('Payment response was not successful. Status: ' + res.status);
        }
        this.isProcessing.set(false);
      },
      error: (err) => {
        console.error('❌ Visa payment error:', err);
        let errorMsg = 'Payment failed!\n\n';
        if (err.error?.message) {
          errorMsg += err.error.message;
        } else {
          errorMsg += 'Please try again or contact support.';
        }
        alert(errorMsg);
        this.isProcessing.set(false);
      }
    });
  }

  // Cash on Delivery Payment
  onSubmitCashPayment(): void {
    console.log('🟡 Cash Payment clicked');
    console.log('Cart ID:', this.cartId);

    // Validate cart ID first
    if (!this.cartId) {
      console.error('❌ Cart ID is missing!');
      alert('Cart ID is missing! Redirecting to cart...');
      this.router.navigate(['/cart']);
      return;
    }

    // Validate form
    if (this.checkoutForm.invalid) {
      this.markFormGroupTouched(this.checkoutForm);
      alert('Please fill in all required fields correctly.');
      return;
    }

    this.isProcessing.set(true);

    this.cartService.createCashOrder(this.cartId, this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log('✅ Cash payment response:', res);
        if (res.status === 'success') {
          alert('Order placed successfully! Payment will be collected on delivery.');
          this.router.navigate(['/allorders']);
          this.cartService.cartCount.set(0);
        } else {
          alert('Order response was not successful. Status: ' + res.status);
        }
        this.isProcessing.set(false);
      },
      error: (err) => {
        console.error('❌ Cash payment error:', err);
        let errorMsg = 'Order failed!\n\n';
        if (err.error?.message) {
          errorMsg += err.error.message;
        } else {
          errorMsg += 'Please try again or contact support.';
        }
        alert(errorMsg);
        this.isProcessing.set(false);
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}