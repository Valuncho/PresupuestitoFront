import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SupplierListComponent } from '../supplier-list/supplier-list.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierService } from '../../../../core/services/supplier.service';
import { NotificationService } from '../../../../core/utils/notification.service';
import { Supplier } from '../../../../core/model/Supplier';
import { SupplierControllerService } from '../../../../core/controllers/supplier-controller.service';


@Component({
    selector: 'app-supplier-form',
    standalone: true,
    imports: [CommonModule,SupplierFormComponent,SupplierListComponent,ReactiveFormsModule],
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
    //Properties
    currentSupplier : Supplier = this.supplierController.getEmptySupplier();
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
        note: new FormControl('')
    });
    
    ngOnInit(): void {
        this.setUp();
        this.onEditHandler();
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
        //this.currentSupplier = this.supplierService.getEmptySupplier();
    }

    resetForm($Event : Event){
        this.setUp();
        this.router.navigate(["/supplier"]);
        $Event.preventDefault();
    }

    onEditHandler(){
        this.supplierId = parseInt(this.activatedRoute.snapshot.params['supplierId']);
        if(this.supplierId){
            this.isEdit = true;
            //this.supplierService.selectedSupplier.subscribe(supplier =>{
            //this.currentSupplier= supplier;
            //this.supplierForm.patchValue(this.currentSupplier.oPerson);
        //})
        }else{
        this.isEdit = false;
        }
    }

    onSubmit(){
        this.currentSupplier.oPerson = this.supplierForm.value;

        if(this.isEdit){
            this.supplierService.putSupplier(this.currentSupplier).subscribe();
        }else{
        
        this.supplierService.postSupplier(this.currentSupplier).subscribe();
        
        }
        this.setUp();
    }
}
