import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../core/models/product.interface';
@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  standalone: true,
})
export class DetailsComponent implements OnInit {
  product: any;
  addProductItemToCart(arg0: any) {
    throw new Error('Method not implemented.');
  }

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  private cartService = inject(CartService);
  private toastrService = inject(ToastrService);

  id: string | null = null;
  productDetails: Product = {} as Product;

  ngOnInit(): void {
    this.getProductId();
  }

  // getProductId():void{
  //   this.activatedRoute.paramMap.subscribe({
  //     next:(urlParams)=>{
  //       this.id = urlParams.get('id');

  //     }
  //   })
  // }
  getProductId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.getProductDetailsData(this.id);
      }
    });
  }

  getProductDetailsData(id: string): void {
    this.productDetailsService.getProductDetails(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addDetailsItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);

        if (res.status === 'success') {
          this.toastrService.success(res.message, 'SmartCart', {});
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
