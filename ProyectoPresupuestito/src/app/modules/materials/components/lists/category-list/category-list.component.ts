import { Component, inject } from '@angular/core';
import { CategoryCardComponent } from '../../cards/category-card/category-card.component';
import { Category } from '../../../../../core/model/Category';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../../components/confirmation-dialog/confirmation-dialog.component';
import { ModalService } from '../../../../../core/utils/modal.service';
import { CategoryFormComponent } from '../../forms/category-form/category-form.component';
import { TextCardComponent } from '../../../../../components/text-card/text-card.component';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';
import { CategoryService } from '../../../../../core/services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryCardComponent, TextCardComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css', "../../../../../styles/List.css"]
})
export class CategoryListComponent {
  //Utils
  private dialog = inject(MatDialog);
  private modalService = inject(ModalService);
  private categoryService = inject(CategoryService);
  private materialController = inject(MaterialControllerService);

  categories: Category[] = [];

  ngOnInit(): void {
    this.materialController.getAviso().subscribe({
      next: (value) => {
        if (value) {
          this.getData();
        }
      },
    });

    this.getData();
  }
  getData() {
    this.categoryService.getCategories().subscribe({
      next: (x) => (this.categories = x),
    });
  }
  seleccionar($Event: Category) {
    this.materialController.setCategory($Event);
  }

  editar($Event: Category) {
    this.materialController.setEditMode(true);
    this.materialController.setCategory($Event);
    this.modalService.openModal<CategoryFormComponent, Category>(
      CategoryFormComponent
    );
  }

  eliminar($Event: Category) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        mensaje: `¿Estás seguro de que deseas eliminar el rubro: ${$Event.categoryName}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory($Event.categoryId).subscribe({
          next: () => {
            this.materialController.setAviso(true);
          },
        });
      }
    });
  }
}
