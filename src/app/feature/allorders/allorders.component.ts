import { Component, OnInit, inject, signal, WritableSignal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../core/service/allorders/orders.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface OrderItem {
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category: { name: string };
    brand: { name: string };
  };
}

interface Order {
  _id: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  cartItems: OrderItem[];
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
}

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  private readonly ordersService = inject(OrdersService);
  private readonly destroyRef = inject(DestroyRef);

  orders: WritableSignal<Order[]> = signal([]);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.ordersService.getUserOrders()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {

          const ordersData = Array.isArray(res) ? res : res?.data;

          if (Array.isArray(ordersData)) {
            this.orders.set(ordersData);
          } else {
            this.orders.set([]);
          }

          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Failed to load orders. Please try again.');
          this.isLoading.set(false);
        }
      });
  }

  getStatusBadgeClass(isPaid: boolean, isDelivered: boolean): string {
    if (isDelivered) return 'bg-green-100 text-green-800';
    if (isPaid) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  }

  getStatusText(isPaid: boolean, isDelivered: boolean): string {
    if (isDelivered) return 'Delivered';
    if (isPaid) return 'Paid';
    return 'Pending';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
