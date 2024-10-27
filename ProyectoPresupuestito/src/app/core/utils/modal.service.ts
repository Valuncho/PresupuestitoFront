import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
    private readonly _dialog = inject(MatDialog);
    
    openModal<CT, T>(ComponentRef: ComponentType<CT>, data? : T, isEditing = false) : void{
        const config = {data, isEditing};
        this._dialog.open(ComponentRef, {
            data:config,
            
        });
    }
    
    getModal(){
        return this._dialog;
    }
    closeModal() : void{
        this._dialog.closeAll();
    }
    
}
