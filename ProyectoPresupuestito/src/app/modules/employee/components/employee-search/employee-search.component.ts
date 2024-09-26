import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../core/model/Employee';

@Component({
    selector: 'app-employee-search',
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule],
    templateUrl: './employee-search.component.html',
    styleUrl: './employee-search.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeSearchComponent {

    private employeeService = inject(EmployeeService);
    @Output() employeeSelected = new EventEmitter<number>();
    @Output() results = new EventEmitter<Employee[]>();
    @Output() sortedResults = new EventEmitter<Employee[]>();
    filtro = new FormControl('');
    busqueda = new FormControl('');
    idEmployee = new FormControl(0);
    filteredEmployees: Employee[] = [];

    ngOnInit() {
        this.employeeService.getEmployees().subscribe({
        next : (employees) =>{
            this.filteredEmployees = employees;
        }
        })
    }

    sort() {
        let sorted: Employee[] = [];
        /*switch (this.filtro.value) {
        case 'alfabeticamente':
            sorted = lodash.orderBy(
            this.employees.map((employee) => ({
                ...employee,
                oPerson: {
                ...employee.oPerson,
                lastName: employee.oPerson.lastName.toLowerCase(),
                },
            })),
            ['oPerson.lastName'],
            ['asc']
            );
            break;
        case 'alfabeticamente2':
            sorted = lodash.orderBy(
            this.employees.map((employee) => ({
                ...employee,
                oPerson: {
                ...employee.oPerson,
                lastName: employee.oPerson.lastName.toLowerCase(),
                },
            })),
            ['oPerson.lastName'],
            ['desc']
            );
            break;
        case 'dni':
            sorted = lodash.orderBy(this.employees, ['oPerson.dni'], ['asc']);
            break;
        default:
            sorted = lodash.orderBy(this.employees, ['oPerson.lastName'], ['asc']);
        }
        console.log(sorted);
        console.log('ordenado');
        this.filteredEmployee = sorted;*/
        this.sortedResults.emit(this.filteredEmployees);
    }

    search() {
        console.log(this.busqueda.value);
        /*this.filteredEmployee = this.employees.filter(
        (employee) =>
            employee.oPerson.name
            .toLowerCase()
            .includes(this.busqueda.value!.toLowerCase()) ||
            employee.oPerson.lastName
            .toLowerCase()
            .includes(this.busqueda.value!.toLowerCase()) ||
            employee.oPerson.mail
            ?.toLowerCase()
            .includes(this.busqueda.value!.toLowerCase()) ||
            employee.oPerson.phoneNumber
            ?.toString()
            .includes(this.busqueda.value!.toLowerCase()) ||
            employee.oPerson.dni
            ?.toString()
            .includes(this.busqueda.value!.toLowerCase())
        );
    */
        this.sortedResults.emit(this.filteredEmployees);
    }

}
