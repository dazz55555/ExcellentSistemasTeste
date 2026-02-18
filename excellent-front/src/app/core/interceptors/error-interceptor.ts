import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

  const snackBar = inject(MatSnackBar);
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {

      let message = 'Erro inesperado.';
      let title = 'Erro';

      if (error.status === 0) {
        message = 'Não foi possível conectar ao servidor.';
      }

      console.log(error)
      title = `Erro ${error.status}`

      switch (error.status) {
        case 400:
          message = error.error?.error?.message || 'Requisição inválida.';
          break;
        case 401:
          message = 'Sessão expirada. Faça login novamente.';
          localStorage.removeItem('access-token');
          router.navigate(['/login']);
          break;
        case 403:
          message = 'Acesso negado.';
          break;
        case 404:
          message = 'Recurso não encontrado.';
          break;
        case 500:
          message = 'Erro interno do servidor.';
          break;
      }

      message = `${title}: ${message}`;

      snackBar.open(message, 'Fechar', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });

      return throwError(() => error);
    })
  );
};
