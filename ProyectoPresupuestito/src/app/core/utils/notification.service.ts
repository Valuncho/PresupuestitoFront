import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    private readonly _snackbar = inject(MatSnackBar);
    showNotification(message : string, action = 'Cerrar') : void{
        this._snackbar.open(message, action, {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition:'right'
        })
    }
    
}
