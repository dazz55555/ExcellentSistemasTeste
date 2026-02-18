import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductsService } from '../../products/product.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './create-product.html',
  styleUrls: ['./create-product.scss']
})
export class CreateProduct implements OnInit {
  fb = new FormBuilder();
  productForm: FormGroup;
  snackBar = inject(MatSnackBar);

  images: File[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() { }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.images = Array.from(event.target.files);
    }
  }

  submitProduct() {
    if (this.productForm.invalid) return;

    const formData = new FormData();
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price);
    formData.append('stock', this.productForm.value.stock);

    this.images.forEach(file => {
      formData.append('images', file, file.name);
    });

    this.productsService.createProduct(formData).subscribe({
      next: () => {
        this.snackBar.open('Produto cadastrado com sucesso!', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.router.navigate(['/products']);
      },
      error: (err) => console.error(err)
    });
  }
}
