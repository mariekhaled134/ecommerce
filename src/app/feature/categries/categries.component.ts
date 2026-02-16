import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Product } from '../../core/models/productsI/product.interface';
import { Products } from '../../core/service/products/products';
import { CardComponent } from '../../shared/components/card/card/card.component';
import { Categories } from '../../core/models/categories/categories.interface';
import { CategoriesService } from '../../core/service/categories/categories.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categries',
  imports: [],
  templateUrl: './categries.component.html',
  styleUrl: './categries.component.css',
  template:'<h2>marie</h2>'
})
export class CategriesComponent implements OnInit{
  private readonly categoriesService=inject(CategoriesService)
  CategoriesList:WritableSignal<Categories[]>=signal<Categories[]>([])
ngOnInit(): void {
this.getAllCategoriesData()
}

getAllCategoriesData():void{
    this.categoriesService.getAllCategories().subscribe({
    next:(res) =>{
    this.CategoriesList.set(res.data);
     
    },
  })
}}
