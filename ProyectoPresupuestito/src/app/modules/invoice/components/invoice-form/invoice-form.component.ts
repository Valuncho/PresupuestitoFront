import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { Invoice } from '../../../../core/model/Invoice';
import { InvoiceService } from '../../../../core/services/invoice.service';


@Component({
    selector: 'app-invoice-form',
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule],
    templateUrl: './invoice-form.component.html',
    styleUrl: './invoice-form.component.css'
    })
    export class invoiceFormComponent {
    //Utils
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    
    private invoiceService = inject(InvoiceService);
    //Properties
    currentInvoice : Invoice = this.invoiceService.getEmptyInvoice();
    invoiceId? : number;
    isEdit : boolean = false;
    //Form
    invoiceForm : FormGroup = new FormGroup({
        Date: new FormControl('',[ Validators.required]),
        payment: new FormControl('', Validators.required),
        paid : new FormControl('', Validators.required),
    });
    
    ngAfterViewInit(): void {
        this.setUp();
        this.onEditHandler();
        
    }

    get canSubmit(){
        let  flag : boolean = false;
        if(
        this.invoiceForm.get('date')?.valid &&
        this.invoiceForm.get('payment')?.valid &&
        this.invoiceForm.get('paid')?.valid
        ){
        flag = true;
        }
        return flag;
    }

    setUp(){
        this.invoiceForm.reset();
        this.isEdit = false;
        /*this.currentInvoice = this.invoiceForm.getEmptyInvoice();*/
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
            this.invoiceService.getInvoiceById(this.invoiceId).subscribe(
            {
            next: (res:Invoice) => {this.currentInvoice = res!},
            }
        )
        }else{
            this.isEdit = false;
        }
        }
        
    }

    onSubmit(){
        
        this.currentInvoice = this.invoiceForm.value;
        console.log(this.currentInvoice)
        
        /*
        if(this.isEdit){
        this.invoiceForm.putInvoice(this.currentInvoice).subscribe();
        }else{
        this.invoiceForm.postInvoice(this.currentInvoice).subscribe();
        }*/

        this.setUp();
    }



}

