import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { brands } from '../../core/models/product.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brandsList: brands[] = [];
  ngOnInit(): void {
    this.getAllBrandsData();
  }

  getAllBrandsData(): void {
    this.brandsService.getAllbrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandsList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
