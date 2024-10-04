import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Payment } from '../../../../core/model/Payment';
import { PaymentService } from '../../../../core/services/payment.service';
import { NotificationService } from '../../../../core/services/utils/notification.service';
import { PaymentControllerService } from '../../../../core/controllers/payment-controller.service';

@Component({
    selector: 'app-payments-form',
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule],
    templateUrl: './payments-form.component.html',
    styleUrl: './payments-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsFormComponent { 

    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private notificationService = inject(NotificationService);
    private paymentControllerService = inject(PaymentControllerService);
    //Properties
    currentPayment : Payment = this.paymentControllerService.getEmptyPayment();
    paymentId? : number;
    isEdit : boolean = false;
    //Form
    paymentForm : FormGroup = new FormGroup({
        date: new FormControl('',[ Validators.required]),
        amount: new FormControl('', Validators.required),
        description : new FormControl('',Validators.required),
    });

    ngOnInit(): void {
        this.setUp();
        this.onEditHandler();
    }

    get canSubmit(){
        let  flag : boolean = false;
        if(
        this.paymentForm.get('date')?.valid &&
        this.paymentForm.get('amount')?.valid &&
        this.paymentForm.get('description')?.valid
        ){
        flag = true;
        }
        return flag;
    }

    setUp(){
        this.paymentForm.reset();
        this.isEdit = false;
        this.currentPayment = this.paymentControllerService.getEmptyPayment();
    }

    resetForm($Event : Event){
        this.setUp();
        this.router.navigate(["/payment"]);
        $Event.preventDefault();
    }

    onEditHandler(){
        this.paymentId = parseInt(this.activatedRoute.snapshot.params['paymentId']);
        if(this.paymentId){
        let url = "/payment/edit/" + this.paymentId;
        if(this.router.url == url){
            this.isEdit = true;
            //this.currentPayment = this.paymentControllerService.getPaymentById(this.paymentId)!;
            this.paymentForm.patchValue(this.currentPayment);
        }else{
            this.isEdit = false;
        }
        }
        
    }

    onSubmit(){
        this.currentPayment = this.paymentForm.value;
        if(this.isEdit){
        //this.paymentService.handleUpdatePayment(this.currentPayment);
        this.notificationService.showNotification("pago editado con éxito!");
        }else{
        //this.paymentService.handlePostPayment(this.currentPayment);
        this.notificationService.showNotification("pago guardado con éxito!");
        }
        this.setUp();
    }
}
