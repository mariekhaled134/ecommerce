import { Products } from './../../../core/service/products/products';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card/card.component';
import { Product } from '../../../core/models/productsI/product.interface';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit{
private readonly products = inject(Products)
  ProductList:WritableSignal<Product[]>=signal<Product[]>([])
ngOnInit(): void {
  this.products.getAllProduct().subscribe({
    next: (res)=>{
(this.ProductList.set(res.data));

    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}
