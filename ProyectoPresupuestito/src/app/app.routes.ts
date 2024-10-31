import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ClientDetailsComponent } from './modules/clients/pages/client-details/client-details.component';
import { BudgetDetailsComponent } from './modules/budgets/pages/budget-details/budget-details.component';
import { ClientViewComponent } from './modules/clients/pages/client-view/client-view.component';
import { BudgetViewComponent } from './modules/budgets/pages/budget-view/budget-view.component';
import { WorkViewComponent } from './modules/works/pages/work-view/work-view.component';
import { MaterialViewComponent } from './modules/materials/pages/material-view/material-view.component';
import { MaterialFormViewComponent } from './modules/materials/pages/material-form-view/material-form-view.component';
import { CostViewComponent } from './modules/cost/pages/cost-view/cost-view.component';
import { EmployeeFormComponent } from './modules/employee/components/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './modules/employee/pages/employee-Details/employee-Details.component';
import { EmployeeViewComponent } from './modules/employee/pages/employee-View/employee-View.component';
import { InvoiceDetailComponent } from './modules/invoice/pages/invoice-detail/invoice-detail.component';
import { SupplierDetailsComponent } from './modules/supplier/pages/supplier-Details/supplier-Details.component';
import { SupplierViewComponent } from './modules/supplier/pages/supplier-View/supplier-View.component';


export const routes: Routes = [
    //PagesRoutes
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    //ClientRoutes
    {path: 'client', component: ClientViewComponent},
    {path: 'client/detail/:clientId', component: ClientDetailsComponent},
    {path: 'client/edit/:clientId', component: ClientViewComponent},
    //BudgetRoutes
    {path: 'budget', component: BudgetViewComponent},
    {path: 'budget/detail/:budgetId', component: BudgetDetailsComponent},
    {path: 'budget/new/:clientId', component: BudgetViewComponent},
    {path: 'budget/edit/:budgetId', component: BudgetViewComponent},
    //WorkRoute
    {path: 'work', component: WorkViewComponent},
    //MaterialRoute
    {path: 'material', component: MaterialViewComponent},
    {path: 'material/add', component: MaterialFormViewComponent},
    //SupplierRoutes
    {path: 'supplier', component: SupplierViewComponent},
    {path: 'supplier/detail/:supplierId', component: SupplierDetailsComponent},
    {path: 'supplier/edit/:supplierId', component: SupplierViewComponent},
    //InvoiceRoute
    {path: 'invoice/detail/:invoicedId', component: InvoiceDetailComponent},
    //FixedCostRoute
    {path: 'cost', component: CostViewComponent},
    {path: 'cost/edit/:costId', component: CostViewComponent},
    //EmployesRoutes
    {path: 'employee', component: EmployeeViewComponent},
    {path: 'employee/detail/:employeeId', component: EmployeeDetailsComponent},
    {path: 'employee/edit/:employeeId', component: EmployeeFormComponent},
    //RedirectionRoutes
    {path: '', redirectTo: 'home' , pathMatch: 'full'},
    {path: '**' , component : HomeComponent},
    
];
