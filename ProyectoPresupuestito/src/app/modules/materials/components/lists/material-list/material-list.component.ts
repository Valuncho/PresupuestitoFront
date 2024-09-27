import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialCardComponent } from '../../cards/material-card/material-card.component';
import { Material } from '../../../../../core/model/Material';
import { MaterialService } from '../../../../../core/services/material.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialSearchComponent } from "../../material-search/material-search.component";
import { MaterialFormComponent } from '../../forms/material-form/material-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../../../core/utils/modal.service';
import { ConfirmationDialogComponent } from '../../../../../components/confirmation-dialog/confirmation-dialog.component';
import { MaterialManagerComponent } from "../../forms/material-manager/material-manager.component";
import { TextCardComponent } from '../../../../../components/text-card/text-card.component';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule, MaterialCardComponent, MaterialSearchComponent, TextCardComponent],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css'
})
export class MaterialListComponent {
  //Utils
  private dialog = inject(MatDialog);
  private modalService = inject(ModalService);
  private materialService = inject(MaterialService);
  private materialController = inject(MaterialControllerService);

  private router = inject(Router);
  private activedRoute = inject(ActivatedRoute);
  //Properties
  
  //materials : Material[] = []
  materials : Material[] = [
    {
      idMaterial: 1,
      name: 'Bisagra de cazoleta estándar',
      description: 'Bisagra oculta para muebles de cocina',
      color: 'Plateado',
      brand: 'Hafele',
      measure: '35mm',
      unitOfMeasure: 'Unidad',
      subCategory : {
      idCategoryMaterial: 3,
      name: 'Bisagras',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }}
    },
    {
      idMaterial: 2,
      name: 'Bisagra de piano estándar',
      description: 'Bisagra visible para puertas',
      color: 'Plateado',
      brand: 'Stanley',
      measure: '100mm',
      unitOfMeasure: 'Par',
      subCategory : {
      idCategoryMaterial: 3,
      name: 'Bisagras',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }}
    },
    {
      idMaterial: 3,
      name: 'Bisagra de libro estándar',
      description: 'Bisagra para puertas plegables',
      color: 'Plateado',
      brand: 'Rubi',
      measure: '75mm',
      unitOfMeasure: 'Par',
      subCategory : {
      idCategoryMaterial: 3,
      name: 'Bisagras',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }}
    },
    {
      idMaterial: 4,
      name: 'Tornillo para madera Phillips',
      description: 'Para unir piezas de madera',
      color: 'Amarillo',
      brand: 'Simpson Strong-Tie',
      measure: '3" x 10',
      unitOfMeasure: 'Caja de 100',
      subCategory:  {
      idCategoryMaterial: 1,
      name: 'Tornillos',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }}
    },
    {
      idMaterial: 5,
      name: 'Tornillo para metal Allen',
      description: 'Para unir piezas metálicas',
      color: 'Negro',
      brand: 'Milwaukee',
      measure: '1/4" x 1/2"',
      unitOfMeasure: 'Paquete de 50',
      subCategory:  {
      idCategoryMaterial: 1,
      name: 'Tornillos',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }}
    },
    {
      idMaterial: 6,
      name: 'Tornillo autorroscante Phillips',
      description: 'Para unir metal a madera',
      color: 'Plateado',
      brand: 'Tekno',
      measure: '1/2" x 12',
      unitOfMeasure: 'Caja de 100',
      subCategory:  {
      idCategoryMaterial: 1,
      name: 'Tornillos',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }
  }
    },
    {
      idMaterial: 7,
      name: 'Perno hexagonal',
      description: 'Para fijar objetos a superficies',
      color: 'Plateado',
      brand: 'Stanley',
      measure: '1/2" x 4"',
      unitOfMeasure: 'Unidad',
      subCategory:  {
      idCategoryMaterial: 1,
      name: 'Tornillos',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }
    }},
    {
      idMaterial: 8,
      name: 'Pino',
      description: 'Madera blanda de color claro',
      color: 'Amarillo claro',
      brand: 'Forestal', // Marca ficticia
      measure: '2x4', // Ejemplo de medida
      unitOfMeasure: 'Metro lineal',
      subCategory: {
        idCategoryMaterial: 7,
        name: 'Madera maciza',
        category: {
        idCategory: 2,
        name: 'Maderas'
      }
      }
    },
    {
      idMaterial: 9,
      name: 'Nogal',
      description: 'Madera blanda de color claro',
      color: 'Amarillo claro',
      brand: 'Forestal', // Marca ficticia
      measure: '2x4', // Ejemplo de medida
      unitOfMeasure: 'Metro lineal',
      subCategory:  {
      idCategoryMaterial: 7,
      name: 'Madera maciza',
      category: {
      idCategory: 2,
      name: 'Maderas'
    }
    }},
    {
      idMaterial: 10,
      name: 'Abedul',
      description: 'Madera blanda de color claro',
      color: 'Amarillo claro',
      brand: 'Forestal', // Marca ficticia
      measure: '2x4', // Ejemplo de medida
      unitOfMeasure: 'Metro lineal',
      subCategory:  {
      idCategoryMaterial: 7,
      name: 'Madera maciza',
      category: {
      idCategory: 2,
      name: 'Maderas'
    }
    }},
    {
      idMaterial:11,
      name: 'MDF Melamínico',
      description: 'Panel aglomerado recubierto con melamina',
      color: 'Blanco',
      brand: 'Masisa', // Marca ficticia
      measure: '18mm x 1200mm x 2400mm',
      unitOfMeasure: 'Placa',
      subCategory:  {
      idCategoryMaterial: 8,
      name: 'Madera contrachapada',
      category: {
      idCategory: 2,
      name: 'Maderas'
    }
    }
  }

  ]

  materialsToDisplay : Material[] = []
  items : number = 5
  page : number = 1

  ngOnInit(): void {
  
    if(this.router.url == '/material'){
      this.materialsToDisplay = this.materials;
    }
    this.materialService.getMaterials().subscribe(
      {  
        next: x => this.materials = x,  
        
      }
    )
     
    
  }


 

   //Search
   handleSearch($Event : Material[]){
    this.page = 1
    this.materialsToDisplay = $Event;
  }
  //Manager
  /*
  traer():Item {
    let material : Material | undefined;
    this.materialService.getController().getMaterial().subscribe(res =>
      material = res
    );
    return material!;
  }
*/
  //Card
  seleccionar($Event : Material){
    this.materialController.setMaterial($Event);
  } 
  editar($Event : Material){
    this.materialController.setEditMode(true);
    this.materialController.setMaterial($Event);
    this.modalService.openModal<MaterialFormComponent,Material>(MaterialFormComponent);
  }
  eliminar($Event : Material){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar el material: ${$Event.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materialService.deleteMaterial($Event.idMaterial);
        //this.notification.showNotification("Rubro eliminado con éxito");
      }
    });
  }

  pageChange(page: number) {
    this.page = page;
  }
}

