import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Order } from './orders.model';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule
  ],
  templateUrl: './orders.html'
})
export class Orders implements OnInit {

  displayedColumns: string[] = [
    'id',
    'client',
    'cnpj',
    'total',
    'createdAt'
  ];

  dataSource = new MatTableDataSource<Order>();

  page = 0;
  limit = 10;
  total = 0;

  constructor(
    private ordersService: OrdersService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getOrders(this.page + 1, this.limit)
      .subscribe(response => {
        this.dataSource.data = response.items;
        this.total = response.total;
        this.cdr.detectChanges();
      });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.loadOrders();
  }
}
