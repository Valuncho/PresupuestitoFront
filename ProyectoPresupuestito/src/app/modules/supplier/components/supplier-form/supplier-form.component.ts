import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SupplierListComponent } from '../supplier-list/supplier-list.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierService } from '../../../../core/services/supplier.service';
import { NotificationService } from '../../../../core/utils/notification.service';
import { Supplier } from '../../../../core/model/Supplier';
import { SupplierControllerService } from '../../../../core/controllers/supplier-controller.service';
import { SupplierRequest } from '../../../../core/request/supplierRequest';
import { UtilsService } from '../../../../core/utils/utils.service';


@Component({
    selector: 'app-supplier-form',
    standalone: true,
    imports: [CommonModule,SupplierListComponent,ReactiveFormsModule],
    templateUrl: './supplier-form.component.html',
    styleUrl: './supplier-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierFormComponent {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private notificationService = inject(NotificationService);
    private supplierService = inject(SupplierService);
    private supplierController = inject(SupplierControllerService);
    private utils = inject(UtilsService);
    //Properties
    currentSupplier : Supplier = this.supplierController.getEmptySupplier();
    supplierDto : SupplierRequest = this.currentSupplier.personId;
    supplierId? : number;
    isEdit : boolean = false;
    //Form
    supplierForm : FormGroup = new FormGroup({
        name: new FormControl('',[ Validators.required]),
        lastName: new FormControl('', Validators.required),
        direction : new FormControl('', Validators.required),
        phoneNumber : new FormControl('', Validators.required),
        mail: new FormControl('', [Validators.email]),
        dni : new FormControl('',[Validators.maxLength(10),Validators.minLength(7)]),
        cuit : new FormControl('',[Validators.maxLength(13),Validators.minLength(10)]),
       // note: new FormControl('',[Validators.maxLength(220),Validators.minLength(10)])
    });

    ngOnInit(): void {

        this.activatedRoute.paramMap.subscribe(params => {
            this.supplierId = Number(params.get('supplierId'));  
            this.onEditHandler()
        });
        this.setUp();
    }

    ngOnDestroy(){
      this.supplierController.setReload(false)
    }

    get canSubmit(){
        let  flag : boolean = false;
        if(
        this.supplierForm.get('name')?.valid &&
        this.supplierForm.get('lastName')?.valid &&
        this.supplierForm.get('direction')?.valid &&
        this.supplierForm.get('phoneNumber')?.valid
        ){
        flag = true;
        }
        return flag;
    }

    setUp(){
        this.supplierForm.reset();
        this.isEdit = false;
        //poner suppliercontroller
        //this.currentSupplier = this.supplierService.getEmptySupplier();
    }

    resetForm($Event : Event){
        this.setUp();
        this.router.navigate(["/supplier"]);
        $Event.preventDefault();
    }

    onEditHandler(){
        if(this.router.url == "/supplier/edit/" + this.supplierId){
            this.supplierService.getSupplierById(this.supplierId!).subscribe( {
                next:res =>{
                this.isEdit = true;
                this.setSupplierToEdit(res);
                }
            }
            )
            }else{
                this.isEdit = false;
        }
    }

    onSubmit(){
        this.toPerson();
    if(this.isEdit){
        this.supplierService.putSupplier(this.supplierDto).subscribe({
        next: ()=>{
            this.supplierController.setReload(true)
        }
        });
    }else{
        this.supplierService.postSupplier(this.supplierDto).subscribe({
        next: ()=>{
            this.supplierController.setReload(true)
        }
    });
    }
    this.setUp();
    }

    setSupplierToEdit(res : any){
        this.supplierForm.patchValue({
            name : res.value.personId.name,
            lastName : res.value.personId.lastName,
            direction : res.value.personId.address,
            phoneNumber : res.value.personId.phoneNumber,
            mail : res.value.personId.email,
            dni : res.value.personId.dni,
            cuit : res.value.personId.cuit,
        });
    }

    toPerson(){
        this.supplierDto.name = this.supplierForm.get("name")?.value
        this.supplierDto.lastName = this.supplierForm.get("lastName")?.value
        this.supplierDto.address = this.supplierForm.get("direction")?.value
        this.supplierDto.phoneNumber = this.supplierForm.get("phoneNumber")?.value
        if(this.supplierForm.get("mail")?.value == null){
            this.supplierDto.email = ""
          }else{
            this.supplierDto.email = this.supplierForm.get("mail")?.value

          }

          if(this.supplierForm.get("dni")?.value == null){
            this.supplierDto.dni = ""
          }else{
            this.supplierDto.dni = this.supplierForm.get("dni")?.value
          }

          if(this.supplierForm.get("cuit")?.value == null){
            this.supplierDto.cuit = ""
          }else{
            this.supplierDto.cuit = this.supplierForm.get("cuit")?.value
          }
        if(this.isEdit){
            this.supplierDto.supplierId = this.supplierId;
        }
    }
}
