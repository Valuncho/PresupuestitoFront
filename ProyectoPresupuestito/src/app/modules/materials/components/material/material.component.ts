import { Component, inject } from '@angular/core';
import { Material } from '../../../../core/model/Material';
import { MaterialService } from '../../../../core/services/material.service';
@Component({
  selector: 'app-material',
  standalone: true,
  imports: [],
  templateUrl: './material.component.html',
  styleUrl: './material.component.css'
})
export class MaterialComponent {
  //Util
  private materialService = inject(MaterialService);
  material : Material | undefined = this.materialService.getEmptyMaterial();
  
ngAfterViewInit(): void {
  
  
  this.materialService.getState().getMaterial().subscribe(
      {
        next : res =>{this.material = res;},
        error: err => console.error('An error occurred :', err),  
        complete: () => console.log('There are no more action happen.')  
      }
        
  
  )
}
}
