import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Products } from '../../core/service/products/products';
import { subscribe } from 'diagnostics_channel';
import { log } from 'console';
import { Writable } from 'stream';
import { Product } from '../../core/models/productsI/product.interface';
import { CardComponent } from '../../shared/components/card/card/card.component';
import { MainSliderComponent } from "./main-slider/main-slider.component";
import { PopularCategoriesComponent } from "./popular-categories/popular-categories.component";
import { PopularProductsComponent } from "./popular-products/popular-products.component";


@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, PopularCategoriesComponent, PopularProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
}
