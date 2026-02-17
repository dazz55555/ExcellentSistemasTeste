import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from './product.model';
import { ProductsService } from './product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule
  ],
  templateUrl: './products.html'
})
export class Products implements OnInit {

  displayedColumns: string[] = ['id', 'description', 'price', 'stock'];

  dataSource = new MatTableDataSource<Product>();

  page = 0;
  limit = 10;
  total = 0;

  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
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

  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.loadProducts();
  }
}
