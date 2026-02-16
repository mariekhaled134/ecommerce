import { brands } from './../../core/models/brands/brands.interface';
import { register } from 'module';
import { BrandsService } from './../../core/service/brands/brands.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-brand',
  imports: [],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
})
export class BrandComponent implements OnInit {

private readonly brandsService=inject(BrandsService)
brandsList:WritableSignal<brands[]>=signal<brands[]>([])
ngOnInit(): void {
  this.getAllBrandsData()
}
getAllBrandsData():void{
    this.brandsService.getAllBrands().subscribe({
    next:(res) =>{
 this.brandsList.set(res.data)
  
     
    },
  })
}}


