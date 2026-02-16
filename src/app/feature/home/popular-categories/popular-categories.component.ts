import { OwlOptions } from './../../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { Categories } from './../../../core/models/categories/categories.interface';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../core/service/categories/categories.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoriesService=inject(CategoriesService)
      private readonly translateService=inject(TranslateService)

  CategoriesList:WritableSignal<Categories[]>=signal<Categories[]>([])
ngOnInit(): void {
this.getAllCategoriesData()
this.onLangChange()

}
onLangChange():void{
 this.translateService.onLangChange.subscribe({
      next:(data)=>
      {
        this.CategoriesCustomOptions={
          ...this.CategoriesCustomOptions,rtl:data.lang==='ar'?true:false
        }
      }
    })
}
getAllCategoriesData():void{
    this.categoriesService.getAllCategories().subscribe({
    next:(res) =>{
    this.CategoriesList.set(res.data);
     
    },
  })
}











  CategoriesCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,
        rtl:this.translateService.getCurrentLang()==='ar'?true:false

  }
}
