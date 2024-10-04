import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Salary } from '../../../../core/model/Salary';
import { SalaryControllerService } from '../../../../core/controllers/salary-controller.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../core/utils/notification.service';

@Component({
    selector: 'app-salary-form',
    standalone: true,
    imports: [
        CommonModule,ReactiveFormsModule
    ],
    templateUrl: './salary-form.component.html',
    styleUrl: './salary-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalaryFormComponent { 
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private notificationService = inject(NotificationService);
    private salaryControllerService = inject(SalaryControllerService);
    //Properties
    currentSalary : Salary = this.salaryControllerService.getEmptySalary();
    salaryId? : number;
    isEdit : boolean = false;
    //Form
    salaryForm : FormGroup = new FormGroup({
        date: new FormControl('',[ Validators.required]),
        amount: new FormControl('', Validators.required),
    });

    ngOnInit(): void {
        this.setUp();
        this.onEditHandler();
    }

    get canSubmit(){
        let  flag : boolean = false;
        if(
        this.salaryForm.get('date')?.valid &&
        this.salaryForm.get('amount')?.valid
        ){
        flag = true;
        }
        return flag;
    }

    setUp(){
        this.salaryForm.reset();
        this.isEdit = false;
        this.currentSalary = this.salaryControllerService.getEmptySalary();
    }

    resetForm($Event : Event){
        this.setUp();
        this.router.navigate(["/salary"]);
        $Event.preventDefault();
    }

    onEditHandler(){
        this.salaryId = parseInt(this.activatedRoute.snapshot.params['salaryId']);
        if(this.salaryId){
        let url = "/salary/edit/" + this.salaryId;
        if(this.router.url == url){
            this.isEdit = true;
            //this.currentPayment = this.paymentControllerService.getPaymentById(this.paymentId)!;
            this.salaryForm.patchValue(this.currentSalary);
        }else{
            this.isEdit = false;
        }
        }
        
    }

    onSubmit(){
        this.currentSalary = this.salaryForm.value;
        if(this.isEdit){
        //this.paymentService.handleUpdatePayment(this.currentPayment);
        this.notificationService.showNotification("salario editado con éxito!");
        }else{
        //this.paymentService.handlePostPayment(this.currentPayment);
        this.notificationService.showNotification("salario guardado con éxito!");
        }
        this.setUp();
    }
}
