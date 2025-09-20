import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnSalePipe } from '../../pipes/on-sale-pipe';
import { TermPipe } from '../../pipes/term-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/product.interface';

@Component({
  selector: 'app-card',
  imports: [RouterLink, TermPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) product: Product = {} as Product;

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.cartService.countNumber.set(res.numOfCartItems);

        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart', {
            closeButton: true,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
