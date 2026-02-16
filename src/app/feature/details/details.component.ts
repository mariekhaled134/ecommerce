import { ProductDetailsService } from './../products/services/product-details/product-details.service';
import { Products } from './../../core/service/products/products';
import { ProductResponsive } from './../../core/models/productsI/product.interface';
import { Component, inject, OnInit, WritableSignal, signal } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { productDetails } from '../products/models/product-details/product-details.interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly productDetailsService=inject(ProductDetailsService)
  private readonly activatedRoute=inject(ActivatedRoute)
  productId:string|null=null


  productDetailsData:WritableSignal<productDetails>=signal<productDetails> ({} as productDetails) 

ngOnInit(): void { 
  this.getProductId()
this.getSpecificProductData()

 
}
getProductId():void{  this.activatedRoute.paramMap.subscribe({ 
    next:(urlParams)=>{
    this.productId=urlParams.get('id')
    }
  })}
getSpecificProductData():void{
    this.productDetailsService.getSpecificProduct(this.productId).subscribe({
    next:(res)=>{
    this.productDetailsData.set(res.data)
    }
  })
}
}