import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { getUserRole } from '../../../helpers/get-user-role';
import { Product } from './product.model';
import { ProductsService } from './product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './products.html'
})
export class Products implements OnInit {

  router = inject(Router);
  displayedColumns: string[] = ['id', 'description', 'price', 'stock', 'actions'];

  dataSource = new MatTableDataSource<Product>();

  page = 0;
  limit = 10;
  total = 0;

  userRole: 'ADMIN' | 'USER' | null = null;

  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userRole = getUserRole();
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts(this.page + 1, this.limit)
      .subscribe(response => {
        this.dataSource.data = response.items;
        this.total = response.total;
        this.cdr.detectChanges();
      });
  }

  get isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }

  viewProduct(product: any) {
    this.router.navigate(['/products/view', product.id]);
  }

  createProduct() {
    this.router.navigate(['/products/create']);
  }

  editProduct(product: any) {
    console.log('Editar', product);
    // navegar para edição
  }

  deleteProduct(product: any) {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Você realmente quer deletar o produto "${product.description}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(product.id).subscribe({
          next: () => {
            Swal.fire(
              'Deletado!',
              'O produto foi deletado com sucesso.',
              'success'
            );
            this.loadProducts();
          },
          error: (err) => {
            Swal.fire(
              'Erro!',
              'Não foi possível deletar o produto.',
              'error'
            );
            console.error(err);
          }
        });
      }
    });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.loadProducts();
  }
}
