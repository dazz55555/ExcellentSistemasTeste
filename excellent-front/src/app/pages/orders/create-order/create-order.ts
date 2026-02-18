import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClientsService } from '../../clients/clients.service';
import { ProductsService } from '../../products/product.service';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatIconModule, MatCardModule
  ],
  templateUrl: './create-order.html',
  styleUrls: ['./create-order.scss']
})
export class CreateOrder implements OnInit {
  fb = new FormBuilder()
  orderForm = this.fb.group({
    clientId: [null, Validators.required],
    items: this.fb.array([])
  });

  clients: any = [];
  products: any = [];
  response: any;
  snackBar = inject(MatSnackBar);

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private clientService: ClientsService,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.fetchClients();
    this.fetchProducts();
    this.addItem();
  }

  get items() {
    return this.orderForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(
      this.fb.group({
        productId: [null, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]]
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  submitOrder() {
    if (this.orderForm.invalid) return;

    this.ordersService.createOrder(this.orderForm.value).subscribe({
      next: () => {
        this.snackBar.open("Pedido cadastrado com sucesso!", 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  fetchClients() {
    this.clientService.getClients(1, 9999)
      .subscribe(response => {
        this.clients = response.items;
      });
  }

  fetchProducts() {
    this.productService.getProducts(1, 9999)
      .subscribe(response => {
        this.products = response.items;
      })
  }
}
