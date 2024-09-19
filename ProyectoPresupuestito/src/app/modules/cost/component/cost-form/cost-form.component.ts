import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Cost } from '../../../../core/model/Cost';
import { CostService } from '../../../../core/services/Cost.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../core/services/utils/notification.service';

@Component({
    selector: 'app-cost-form',
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule],
    templateUrl: './cost-form.component.html',
    styleUrl: './cost-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostFormComponent { 
    //Utils
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private notificationService = inject(NotificationService);
    private costService = inject(CostService);
    //Properties
    currentCost : Cost = this.costService.getEmptyFixedCost();
    costId? : number;
    isEdit : boolean = false;
    //Form
    costForm : FormGroup = new FormGroup({
        description: new FormControl('',[ Validators.required]),
        amount: new FormControl('', Validators.required),
        workingDays : new FormControl('', Validators.required),
        hoursWorked : new FormControl('', Validators.required),
        date: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {
        this.setUp();
        this.onEditHandler();
    }

    get canSubmit(){
        let  flag : boolean = false;
        if(
        this.costForm.get('description')?.valid &&
        this.costForm.get('amount')?.valid &&
        this.costForm.get('workingDays')?.valid &&
        this.costForm.get('hoursWorked')?.valid &&
        this.costForm.get('date')?.valid
        ){
        flag = true;
        }
        return flag;
    }

    setUp(){
        this.costForm.reset();
        this.isEdit = false;
        this.currentCost = this.costService.getEmptyFixedCost();
    }

    resetForm($Event : Event){
        this.setUp();
        this.router.navigate(["/cost"]);
        $Event.preventDefault();
    }

    onEditHandler(){
        this.costId = parseInt(this.activatedRoute.snapshot.params['costId']);
        if(this.costId){
        let url = "/cost/edit/" + this.costId;
        if(this.router.url == url){
            this.isEdit = true;
            //this.currentCost = this.costService.getFixedCostById(this.costId)!;
            this.costForm.patchValue(this.currentCost);
        }else{
            this.isEdit = false;
        }
        }
        
    }

    onSubmit(){
        this.currentCost = this.costForm.value;
        if(this.isEdit){
        this.costService.handleUpdateFixedCost(this.currentCost);
        this.notificationService.showNotification("costo editado con éxito!");
        }else{
        this.costService.handleUpdateFixedCost(this.currentCost);
        this.notificationService.showNotification("costo guardado con éxito!");
        }
        this.setUp();
    }
}
