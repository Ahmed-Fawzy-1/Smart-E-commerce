import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit {
    private readonly productsService = inject(ProductsService);

  productsList:Product[] = [];

  ngOnInit(): void {
      this.getAllProductsData();
  }


getAllProductsData(pageNumber:number=1):void{
  this.productsService.getAllProducts(pageNumber).subscribe(
    {
      next:(res)=>{
               console.log(res.data)
               this.productsList = res.data
      },
      error:(err)=>{
        console.log(err)
      }
    }
  )
}
}
