import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Client } from './clients.model';
import { ClientsService } from './clients.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class Clients implements OnInit {

  displayedColumns: string[] = ['id', 'social_reason', 'cnpj', 'email', 'actions'];

  clients: Client[] = [];
  page = 1;
  limit = 10;
  total = 0;

  constructor(private clientsService: ClientsService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getClients(this.page, this.limit)
      .subscribe(response => {
        this.clients = response.items;
        this.total = response.total;
        this.cdr.detectChanges();
      });
  }

  createClient() {
    console.log('Criar novo cliente');
  }

  viewClient(client: any) {
    console.log('Visualizar', client);
  }

  editClient(client: any) {
    console.log('Editar', client);
  }

  deleteClient(client: any) {
    console.log('Excluir', client);
  }


  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.loadClients();
  }
}
