import { PaginationInstance } from './../../../../node_modules/ngx-pagination/lib/pagination-instance.d';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card/card.component';
import { Product } from '../../core/models/productsI/product.interface';
import { signalSetFn } from '@angular/core/primitives/signals';
import { Products } from '../../core/service/products/products';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private readonly products = inject(Products);
    private readonly ngxSpinnerService = inject(NgxSpinnerService);

  ProductList: WritableSignal<Product[]> = signal<Product[]>([]);
  pagination: PaginationInstance = {
    id: 'products',
    itemsPerPage: 40,
    currentPage: 1,
    totalItems: 0,
  };
text:string=''
  ngOnInit(): void {
    this.getAllProductsData();
  }
  getAllProductsData(): void {

    

    this.products
      .getAllProduct(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe({
        next: (res) => {
          this.ProductList.set(res.data);
          this.pagination.totalItems = res.results;
        
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  pageChanged(page: number): void {
    this.pagination.currentPage = page;
    this.getAllProductsData()
  }
}
