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
  
  //Add 'implements AfterViewInit' to the class.
  this.getCurrentMaterial()
}
  getCurrentMaterial(){
    this.materialService.getState().getMaterial().subscribe(res=>{
      this.material = res;
    },
  
  )
  }
}
