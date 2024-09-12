import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../core/services/utils/notification.service';
import { Invoice } from '../../../../core/model/Invoice';
import { InvoiceService } from '../../../../core/services/invoice.service';

@Component({
    selector: 'app-invoice-form',
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule],
    templateUrl: './invoice-form.component.html',
    styleUrl: './invoice-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceFormComponent {

    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private notificationService = inject(NotificationService);
    private InvoiceService = inject(InvoiceService);
    //Properties
    currentInvoice : Invoice = this.InvoiceService.getInvoices();
    idInvoice? : number;
    isEdit : boolean = false;

    //Form
    InvoiceForm : FormGroup = new FormGroup({
        fecha: new FormControl('',[ Validators.required]),
        pago: new FormControl('', Validators.required),
        estaPagado : new FormControl('', Validators.required),
    });

    ngOnInit(): void {
        this.setUp();
        this.onEditHandler();
    }

    get canSubmit(){
        let  flag : boolean = false;
        if(
        this.InvoiceForm.get('fecha')?.valid &&
        this.InvoiceForm.get('pago')?.valid &&
        this.InvoiceForm.get('estaPagado')?.valid
        ){
        flag = true;
        }
        return flag;
    }

    setUp(){
        this.InvoiceForm.reset();
        this.isEdit = false;
        this.currentInvoice = this.InvoiceService.getInvoices();
    }

    resetForm($Event : Event){
        this.setUp();
        this.router.navigate(["/invoice"]);
        $Event.preventDefault();
    }

    onEditHandler(){
        this.invoiceId = parseInt(this.activatedRoute.snapshot.params['invoiceId']);
        if(this.invoiceId){
        let url = "/invoice/edit/" + this.invoiceId;
        if(this.router.url == url){
            this.isEdit = true;
            this.currentInvoice = this.InvoiceService.getInvoiceById(this.invoiceId)!;
            this.InvoiceForm.patchValue(this.currentInvoice);
        }else{
            this.isEdit = false;
        }
        }
        
    }

    onSubmit(){
        this.currentInvoice = this.InvoiceForm.value;
        if(this.isEdit){
        this.InvoiceService.handleUpdateInvoice(this.currentInvoice);
        this.notificationService.showNotification("boleta editada con éxito!");
        }else{
        this.InvoiceService.handlePostInvoice(this.currentInvoice);
        this.notificationService.showNotification("boleta guardada con éxito!");
        }
        this.setUp();
    }

}
