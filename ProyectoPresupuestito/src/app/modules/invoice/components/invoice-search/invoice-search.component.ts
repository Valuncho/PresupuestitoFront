import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { InvoiceService } from '../../../../core/services/invoice.service';
import { Invoice } from '../../../../core/model/Invoice';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
    selector: 'app-invoice-search',
    standalone: true,
    imports: [
        CommonModule,ReactiveFormsModule
    ],
    templateUrl: './invoice-search.component.html',
    styleUrl: './invoice-search.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceSearchComponent { 

    private invoiceService = inject(InvoiceService);
    @Output() employeeSelected = new EventEmitter<number>();
    @Output() results = new EventEmitter<Invoice[]>();
    @Output() sortedResults = new EventEmitter<Invoice[]>();
    filtro = new FormControl('');
    busqueda = new FormControl('');
    idInvoice = new FormControl(0);
    filteredInvoices: Invoice[] = [];

    ngOnInit() {
        this.invoiceService.getInvoices().subscribe({
        next : (invoices) =>{
            this.filteredInvoices = invoices;
        }
        })
    }

    sort() {
        let sorted: Invoice[] = [];
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
        this.sortedResults.emit(this.filteredInvoices);
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
        this.sortedResults.emit(this.filteredInvoices);
    }
}
