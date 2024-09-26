import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee.service';

import { Employee } from '../../../../core/model/Employee';

@Component({
    selector: 'app-employee-form',
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule],
    templateUrl: './employee-form.component.html',
    styleUrl: './employee-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent { 
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    
    private EmployeeService = inject(EmployeeService);
    //Properties
    currentEmployee : Employee = this.EmployeeService.getEmptyEmployee();
    employeeId? : number;
    isEdit : boolean = false;
    //Form
    employeeForm : FormGroup = new FormGroup({
        name: new FormControl('',[ Validators.required]),
        lastName: new FormControl('', Validators.required),
        direction : new FormControl('', Validators.required),
        phoneNumber : new FormControl('', Validators.required),
        mail: new FormControl('', [Validators.email]),
        dni : new FormControl('',[Validators.maxLength(10),Validators.minLength(7)]),
        cuit : new FormControl('',[Validators.maxLength(13),Validators.minLength(10)]),
        salary : new FormControl('',[Validators.required])
    });

    ngOnInit(): void {
        this.setUp();
        this.onEditHandler();
    }

    get canSubmit(){
        let  flag : boolean = false;
        if(
        this.employeeForm.get('name')?.valid &&
        this.employeeForm.get('lastName')?.valid &&
        this.employeeForm.get('direction')?.valid &&
        this.employeeForm.get('phoneNumber')?.valid
        ){
        flag = true;
        }
        return flag;
    }

    setUp(){
        this.employeeForm.reset();
        this.isEdit = false;
        this.currentEmployee = this.EmployeeService.getEmptyEmployee();
    }

    resetForm($Event : Event){
        this.setUp();
        this.router.navigate(["/employee"]);
        $Event.preventDefault();
    }

    onEditHandler(){
        this.employeeId = parseInt(this.activatedRoute.snapshot.params['employeeId']);
        if(this.employeeId){
        let url = "/employee/edit/" + this.employeeId;
        if(this.router.url == url){
            this.isEdit = true;
            //this.currentEmployee = this.EmployeeService.getEmployeeById(this.employeeId)!;
            this.employeeForm.patchValue(this.currentEmployee.oPerson);
        }else{
            this.isEdit = false;
        }
        }
        
    }

    onSubmit(){
        this.currentEmployee.oPerson = this.employeeForm.value;
        if(this.isEdit){
        //this.EmployeeService.handleUpdateEmployee(this.currentEmployee);
      //  this.notificationService.showNotification("empleado editado con éxito!");
        }else{
        //this.EmployeeService.handlePostEmployee(this.currentEmployee);
       // this.notificationService.showNotification("empleado guardado con éxito!");
        }
        this.setUp();
    }
}
