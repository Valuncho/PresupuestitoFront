import { Component, inject } from '@angular/core';
import { Material } from '../../../../core/model/Material';
import { MaterialService } from '../../../../core/services/material.service';
import { MaterialControllerService } from '../../../../core/controllers/material-controller.service';
@Component({
  selector: 'app-material',
  standalone: true,
  imports: [],
  templateUrl: './material.component.html',
  styleUrl: './material.component.css'
})
export class MaterialComponent {
  //Util
  private materialController = inject(MaterialControllerService);
  material : Material = this.materialController.getEmptyMaterial();
  
ngAfterViewInit(): void {
  
  
  this.materialController.getMaterial().subscribe(
      {
        next : res =>{this.material = res!;},
      }
        
  
  )
}
}
