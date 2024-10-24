import { Component, EventEmitter, inject, Injector, Input, input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialService } from '../../../../../core/services/material.service';
import { Category } from '../../../../../core/model/Category';
import { MaterialControllerService } from '../../../../../core/controllers/material-controller.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { UtilsService } from '../../../../../core/utils/utils.service';


@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  //Utils
  private materialService = inject(MaterialService);
  private materialController = inject(MaterialControllerService);
  private utils = inject(UtilsService);
  //Properties
  newCategory : Category = this.materialController.getEmptyCategory();
  isEdit : boolean = this.materialController.getEditMode();
  CategoryForm : FormGroup = new FormGroup({
    idCategory : new FormControl(),
    name : new FormControl('', Validators.required)
  })


  ngAfterViewInit(): void {
    console.log("refrescar")
    if(this.isEdit){
      this.materialController.getCategory().subscribe(res =>{
        this.newCategory = res!;
      })
      this.CategoryForm.setValue(this.newCategory)
    }
  }

  resetForm($Event : Event){
    this.CategoryForm.reset();
  }
  


  onSubmit(){
    this.newCategory.categoryName = this.CategoryForm.value["name"]
    this.newCategory.categoryModel = "";
    if(!this.isEdit){
      this.materialService.postCategory(this.newCategory).subscribe({
        next: ()=>{
          this.utils.reaload()
        }
      });
    }else{
      this.materialService.putCategory(this.newCategory).subscribe();
      this.materialController.setEditMode(false);
    }
  }

}
