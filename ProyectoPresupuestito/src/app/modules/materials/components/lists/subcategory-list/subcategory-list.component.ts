import { Component, inject } from '@angular/core';
import { SubCategoryMaterial } from '../../../../../core/model/SubCategoryMaterial';
import { SubCategoryCardComponent } from '../../cards/sub-category-card/sub-category-card.component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialService } from '../../../../../core/services/material.service';
import { ModalService } from '../../../../../core/utils/modal.service';
import { SubcategoryFormComponent } from '../../forms/subcategory-form/subcategory-form.component';
import { ConfirmationDialogComponent } from '../../../../../components/confirmation-dialog/confirmation-dialog.component';
import { TextCardComponent } from '../../../../../components/text-card/text-card.component';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';

@Component({
  selector: 'app-subcategory-list',
  standalone: true,
  imports: [SubCategoryCardComponent,TextCardComponent],
  templateUrl: './subcategory-list.component.html',
  styleUrl: './subcategory-list.component.css'
})
export class SubcategoryListComponent {
  //Utils
  private dialog = inject(MatDialog);
  private modalService = inject(ModalService);
  private materialController = inject(MaterialControllerService);
  private materialService = inject(MaterialService);
  //subcategories : SubCategoryMaterial[] = []

  subCategories : SubCategoryMaterial[] = [
    {
      idCategoryMaterial: 1,
      name: 'Tornillos',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }
    },
    {
      idCategoryMaterial: 2,
      name: 'Tuercas',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }
    },
    {
      idCategoryMaterial: 3,
      name: 'Bisagras',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }
    },
    {
      idCategoryMaterial: 4,
      name: 'Clavos',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }
    },
    {
      idCategoryMaterial: 5,
      name: 'Manijas',
      category:  {
      idCategory: 1,
      name: 'Ferretería',
    }
    },
    {
      idCategoryMaterial: 6,
      name: 'Tableros de melamina',
      category: {
      idCategory: 2,
      name: 'Maderas'
    }
    },
    {
      idCategoryMaterial: 7,
      name: 'Madera maciza',
      category: {
      idCategory: 2,
      name: 'Maderas'
    }
    },
    {
      idCategoryMaterial: 8,
      name: 'Madera contrachapada',
      category: {
      idCategory: 2,
      name: 'Maderas'
    }
    },

  ]


  ngOnInit(): void {
    
    
  }


  editar($Event : SubCategoryMaterial){
    this.materialController.setEditMode(true);
    this.materialController.setSubcategory($Event);
    this.modalService.openModal<SubcategoryFormComponent,SubCategoryMaterial>(SubcategoryFormComponent);
  }

  eliminar($Event : SubCategoryMaterial){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar el sub-rubro: ${$Event.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materialService.deleteSubCategory($Event.idCategoryMaterial).subscribe();
      }
    });

  }
}
