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
import { Order } from './orders.model';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
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
  templateUrl: './orders.html'
})
export class Orders implements OnInit {

  displayedColumns: string[] = [
    'id',
    'client',
    'cnpj',
    'total',
    'createdAt',
    'actions'
  ];

  dataSource = new MatTableDataSource<Order>();

  page = 0;
  limit = 10;
  total = 0;

  router = inject(Router);
  userRole: 'ADMIN' | 'USER' | null = null;

  get isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }


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

  viewOrders(order: any) {
    this.router.navigate(['/orders/view', order.id]);
  }

  createOrder() {
    this.router.navigate(['/orders/create']);
  }

  editOrders(order: any) {
    console.log('Editar', order);
    // navegar para edição
  }

  deleteOrders(order: any) {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Você realmente quer deletar o pedido id: ${order.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordersService.deleteOrder(order.id).subscribe({
          next: () => {
            Swal.fire(
              'Deletado!',
              'O pedido foi deletado com sucesso.',
              'success'
            );
            this.loadOrders();
          },
          error: (err) => {
            Swal.fire(
              'Erro!',
              'Não foi possível deletar o pedido.',
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
    this.loadOrders();
  }
}
