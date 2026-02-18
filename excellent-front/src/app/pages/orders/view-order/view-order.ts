import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './view-order.html',
  styleUrls: ['./view-order.scss']
})
export class ViewOrder implements OnInit {
  order: any;
  displayedColumns = ['product', 'unitPrice', 'quantity', 'subtotal'];
  snackBar = inject(MatSnackBar);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.fetchOrder(+id);
  }

  goBack() {
    this.router.navigate(['/orders']);
  }


  fetchOrder(id: number) {
    this.ordersService.getOrderById(id).subscribe({
      next: (res) => {
        this.order = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}
