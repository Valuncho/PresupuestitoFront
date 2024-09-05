import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee.service';
import { NotificationService } from '../../../../core/services/utils/notification.service';
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
    private notificationService = inject(NotificationService);
    private EmployeeService = inject(EmployeeService);
    //Properties
    currentEmployee : Employee = this.EmployeeService.getEmptyEmployee();
    employeeId? : number;
    isEdit : boolean = false;
    //Form
    EmployeeForm : FormGroup = new FormGroup({
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
        this.EmployeeForm.get('name')?.valid &&
        this.EmployeeForm.get('lastName')?.valid &&
        this.EmployeeForm.get('direction')?.valid &&
        this.EmployeeForm.get('phoneNumber')?.valid
        ){
        flag = true;
        }
        return flag;
    }

    setUp(){
        this.EmployeeForm.reset();
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
            this.currentEmployee = this.EmployeeService.getEmployeeById(this.employeeId)!;
            this.EmployeeForm.patchValue(this.currentEmployee.oPerson);
        }else{
            this.isEdit = false;
        }
        }
        
    }

    onSubmit(){
        this.currentEmployee.oPerson = this.EmployeeForm.value;
        if(this.isEdit){
        this.EmployeeService.handleUpdateEmployee(this.currentEmployee);
        this.notificationService.showNotification("empleado editado con éxito!");
        }else{
        this.EmployeeService.handlePostEmployee(this.currentEmployee);
        this.notificationService.showNotification("empleado guardado con éxito!");
        }
        this.setUp();
    }
}
