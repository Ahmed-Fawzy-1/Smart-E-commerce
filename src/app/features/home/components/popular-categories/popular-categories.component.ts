import { OwlOptions } from './../../../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Category } from '../../../../core/models/category.interface';
  
@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule ],  
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  categoriesList:Category[] = [];

   categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:3500,
    autoplayHoverPause:true,
    margin:10,
    navSpeed: 700,
    navText: ['<i class="fas fa-home"></i>', 'hambozo'],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1100: {
        items: 6
      }
    },
    nav: false
  }


  ngOnInit(): void {
     this. getAllCategoriesData();
  }

  getAllCategoriesData():void {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesList= res.data;
      },
      error:(err)=>{
        console.log(err);
      },
      
    })
  }

}
