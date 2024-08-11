import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ClientFormComponent } from './modules/clients/components/client-form/client-form.component';
import { BudgetFormComponent } from './modules/budgets/components/budget-form/budget-form.component';
import { WorkFormComponent } from './modules/works/work-form/work-form.component';
import { MaterialFormComponent } from './modules/materials/material-form/material-form.component';
import { ClientDetailsComponent } from './modules/clients/pages/client-details/client-details.component';
import { BudgetDetailsComponent } from './modules/budgets/pages/budget-details/budget-details.component';
import { WorkAreaComponent } from './modules/budgets/pages/work-area/work-area.component';
import { ClientViewComponent } from './modules/clients/pages/client-view/client-view.component';
import { BudgetViewComponent } from './modules/budgets/pages/budget-view/budget-view.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},

    {path: 'client', component: ClientViewComponent},
    {path: 'client/detail', component: ClientDetailsComponent},
    {path: 'client/edit/:clientId', component: ClientViewComponent},
    
    {path: 'budget', component: BudgetViewComponent},
    {path: 'budget/detail/:budgetId', component: BudgetDetailsComponent},
    {path: 'budget/new/:clientId', component: BudgetViewComponent},
    {path: 'budget/edit/:budgetId', component: BudgetViewComponent},

    {path: 'work', component: WorkFormComponent},
    
    {path: 'material/:materialId', component: MaterialFormComponent},
    
    {path: '', redirectTo: 'home' , pathMatch: 'full'},

];
