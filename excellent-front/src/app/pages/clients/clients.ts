import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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

  router = inject(Router);
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
    this.router.navigate(['/clients/create']);
  }

  viewClient(client: any) {
    console.log('Visualizar', client);
  }

  editClient(client: any) {
    console.log('Editar', client);
  }

  deleteClient(client: Client) {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Você realmente quer deletar o cliente "${client.social_reason}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientsService.deleteClient(client.id).subscribe({
          next: () => {
            Swal.fire(
              'Deletado!',
              'O cliente foi deletado com sucesso.',
              'success'
            );
            this.loadClients();
          },
          error: (err) => {
            Swal.fire(
              'Erro!',
              'Não foi possível deletar o cliente.',
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
    this.loadClients();
  }
}
