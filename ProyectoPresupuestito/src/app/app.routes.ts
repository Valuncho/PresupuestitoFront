import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

import { ClientDetailsComponent } from './modules/clients/pages/client-details/client-details.component';
import { BudgetDetailsComponent } from './modules/budgets/pages/budget-details/budget-details.component';
import { WorkAreaComponent } from './modules/works/pages/work-area/work-area.component';
import { ClientViewComponent } from './modules/clients/pages/client-view/client-view.component';
import { BudgetViewComponent } from './modules/budgets/pages/budget-view/budget-view.component';
import { WorkViewComponent } from './modules/works/pages/work-view/work-view.component';
import { WorkDetailsComponent } from './modules/works/pages/work-details/work-details.component';
import { MaterialViewComponent } from './modules/materials/pages/material-view/material-view.component';
import { MaterialFormViewComponent } from './modules/materials/pages/material-form-view/material-form-view.component';
import { CostViewComponent } from './modules/cost/pages/cost-view/cost-view.component';
import { EmployeeFormComponent } from './modules/employee/components/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './modules/employee/pages/employee-Details/employee-Details.component';
import { EmployeeViewComponent } from './modules/employee/pages/employee-View/employee-View.component';
import { InvoiceMakerComponent } from './modules/invoice/pages/invoice-maker/invoice-maker.component';
import { SupplierDetailsComponent } from './modules/supplier/pages/supplier-Details/supplier-Details.component';
import { SupplierViewComponent } from './modules/supplier/pages/supplier-View/supplier-View.component';
import { InvoiceDetailComponent } from './modules/invoice/pages/invoice-detail/invoice-detail.component';


export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},

    {path: 'client', component: ClientViewComponent},
    {path: 'client/detail/:clientId', component: ClientDetailsComponent},
    {path: 'client/edit/:clientId', component: ClientViewComponent},
    
    {path: 'budget', component: BudgetViewComponent},
    {path: 'budget/detail/:budgetId', component: BudgetDetailsComponent},
    {path: 'budget/new/:clientId', component: BudgetViewComponent},
    {path: 'budget/edit/:budgetId', component: BudgetViewComponent},

    {path: 'work', component: WorkViewComponent},
    {path: 'workArea/:budgetId', component: WorkAreaComponent},
    
    {path: 'material', component: MaterialViewComponent},
    {path: 'material/add', component: MaterialFormViewComponent},
   
    {path: 'supplier', component: SupplierViewComponent},
    {path: 'supplier/detail/:supplierId', component: SupplierDetailsComponent},
    {path: 'supplier/edit', component: SupplierViewComponent},

    {path: 'employee', component: EmployeeViewComponent},
    {path: 'employee/detail/:employeeId', component: EmployeeDetailsComponent},
    {path: 'employee/edit', component: EmployeeFormComponent},

    {path: 'invoice/:invoicdId', component: InvoiceDetailComponent},
    {path: 'invoice/new/:supplierId', component: InvoiceMakerComponent},
    {path: 'invoice/edit/:invoiceId', component: InvoiceMakerComponent},
    
    {path: 'cost', component: CostViewComponent},
    {path: 'cost/edit/:costId', component: CostViewComponent},
    
    {path: '', redirectTo: 'home' , pathMatch: 'full'},

];
