import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.html',
  imports: [
    ReactiveFormsModule
  ]
})
export class CreateClient {
  fb = new FormBuilder();
  snackBar = inject(MatSnackBar);

  constructor(
    private clientsService: ClientsService,
    private router: Router
  ) { }

  form = this.fb.group({
    cnpj: ['', [Validators.required]]
  });

  submit() {
    if (this.form.invalid) return;

    this.clientsService.createClient(this.form.value)
      .subscribe({
        next: () => {
          this.snackBar.open("Cliente cadastrado com sucesso!", 'Fechar', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}
