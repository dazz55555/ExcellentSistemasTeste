import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products/product.service';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule,],
  templateUrl: './view-product.html',
  styleUrls: ['./view-product.scss']
})
export class ViewProduct implements OnInit {
  product: any;
  snackBar = inject(MatSnackBar);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.fetchProduct(id);
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  fetchProduct(id: string) {
    this.productsService.getProductById(+id).subscribe({
      next: (res) => {
        this.product = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}
