import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee.service';

import { Employee } from '../../../../core/model/Employee';
import { EmployeeControllerService } from '../../../../core/controllers/employee-controller.service';

import { EmployeeRequest } from '../../../../core/request/employeeRequest';

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
    private EmployeeControllerService = inject(EmployeeControllerService)
    private EmployeeService = inject(EmployeeService);

    //Properties
    currentEmployee : Employee = this.EmployeeControllerService.getEmptyEmployee();
    employeeDto : EmployeeRequest =this.currentEmployee.oPerson;
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
        //salary : new FormControl('',[Validators.required])
    });

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            this.employeeId = Number(params.get('employeeId'));  
            this.onEditHandler()
        });
        this.setUp();
    }

    get canSubmit(){
        let  flag : boolean = false;
        if(
        this.employeeForm.get('name')?.valid &&
        this.employeeForm.get('lastName')?.valid &&
        this.employeeForm.get('direction')?.valid &&
        this.employeeForm.get('phoneNumber')?.valid &&
        this.employeeForm.get('dni')?.valid &&
        this.employeeForm.get('cuit')?.valid
        ){
        flag = true;
        }
        return flag;
    }

    setUp(){
        this.employeeForm.reset();
        this.isEdit = false;
        this.currentEmployee = this.EmployeeControllerService.getEmptyEmployee();
    }

    resetForm($Event : Event){
        this.setUp();
        this.router.navigate(["/employee"]);
        $Event.preventDefault();
    }

    onEditHandler(){
        if(this.router.url == "/client/edit/" + this.employeeId){
            this.EmployeeService.getEmployeeById(this.employeeId!).subscribe( {
                next:res =>{
                this.isEdit = true;
                this.setEmployeeToEdit(res);
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
        this.EmployeeService.putEmployee(this.employeeDto).subscribe({
            next: ()=>{
            //this.utils.reaload()
            }
        });
        }else{
        this.EmployeeService.postEmployee(this.employeeDto).subscribe({
            next: ()=>{
            //this.utils.reaload()
            }
        });

        }
    this.setUp();
    }

    setEmployeeToEdit(res : any){
        this.employeeForm.patchValue({
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
        this.employeeDto.name = this.employeeForm.get("name")?.value
        this.employeeDto.lastName = this.employeeForm.get("lastName")?.value
        this.employeeDto.address = this.employeeForm.get("direction")?.value
        this.employeeDto.phoneNumber = this.employeeForm.get("phoneNumber")?.value
        this.employeeDto.email = this.employeeForm.get("mail")?.value
        this.employeeDto.dni = this.employeeForm.get("dni")?.value
        this.employeeDto.cuit = this.employeeForm.get("cuit")?.value
        if(this.isEdit){
            this.employeeDto.employeeId = this.employeeId;
        }
    }
}
