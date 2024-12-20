import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceControllerService } from '../../../../core/controllers/invoice-controller.service';
import { InvoiceService } from '../../../../core/services/invoice.service';
import {InvoiceRequest} from "../../../../core/request/invoiceRequest";
import {ModalService} from "../../../../core/utils/modal.service";


@Component({
    selector: 'app-invoice-form',
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule],
    templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css', "../../../../styles/Form.css"]
    })
    export class invoiceFormComponent {
    //Utils
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private invoiceControllerService = inject(InvoiceControllerService)
    private invoiceService = inject(InvoiceService);
    private modal = inject(ModalService);
    //Properties
    currentInvoice : InvoiceRequest =this.invoiceControllerService.getEmptyInvoice();
    invoiceId? : number;
    isEdit : boolean = this.invoiceControllerService.getEditMode();
    //Form
    invoiceForm : FormGroup = new FormGroup({
        date: new FormControl('',[ Validators.required]),
    //    payment: new FormControl('', Validators.required),
      //  paid : new FormControl('', Validators.required),
    });

    ngAfterViewInit(): void {
        this.invoiceControllerService.getInvoice().subscribe(res=>{
          this.currentInvoice = res!;
          console.log(this.currentInvoice)

        })
        this.onEditHandler();

    }

    get canSubmit(){
        let  flag : boolean = false;
        if(
        this.invoiceForm.get('date')?.valid

        ){
        flag = true;
        }
        return flag;
    }

    setUp(){
        this.invoiceForm.reset();
        this.isEdit = false;
        this.currentInvoice = this.invoiceControllerService.getEmptyInvoice();
    }

    resetForm($Event : Event){
        this.setUp();
        $Event.preventDefault();
    }

    onEditHandler(){
        this.invoiceId = parseInt(this.activatedRoute.snapshot.params['invoiceId']);
        if(this.invoiceId){
        let url = "/invoice/edit/" + this.invoiceId;
        if(this.router.url == url){
           this.isEdit = true;
        this.invoiceControllerService.getInvoice().subscribe(res=>{
          this.currentInvoice = res!;
        })
        }else{
           this.isEdit = false;
        }
        }

    }

    onSubmit(){
         this.toInvoiceRequest()




        if(this.isEdit){
        this.invoiceService.putInvoice(this.currentInvoice).subscribe({
          next: ()=>{
            this.closeForm()

          }
        });
        }else{
        this.invoiceService.postInvoice(this.currentInvoice).subscribe({
          next: ()=>{
            this.closeForm()
          }
        });
        }

        this.setUp();
    }
  closeForm(){
    this.modal.closeModal();
    this.invoiceControllerService.setAviso(true);
  }

    toInvoiceRequest(){
    this.currentInvoice.date = this.invoiceForm.get('date')?.value;
    }



}

