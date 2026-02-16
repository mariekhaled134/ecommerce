import { Component, Inject, inject, Injector, Input } from '@angular/core';
import { Product } from '../../../../core/models/productsI/product.interface';
import { RouterLink } from "@angular/router";
import { CurrencyPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { SplitPipe } from '../../../pipes/split-pipe';
import { CartService } from '../../../../feature/cart/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink,
CurrencyPipe,SplitPipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
@Input() cardProduct:Product={} as Product
private readonly cartService=inject(CartService)
private readonly toastrService=inject(ToastrService)
addProductItemToCart(id:string):void{
this.cartService.addProductToCart(id).subscribe({
  next:(res)=>{

   
if(res.status==='success'){
   this.cartService.cartCount.set(res.numOfCartItems
    )
  //show toaster to user 
  this.toastrService.success(res.message,'freshcart')
}
  }
})
}
}
