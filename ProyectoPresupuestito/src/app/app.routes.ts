import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { MaterialFormComponent } from './modules/materials/material-form/material-form.component';
import { ClientDetailsComponent } from './modules/clients/pages/client-details/client-details.component';
import { BudgetDetailsComponent } from './modules/budgets/pages/budget-details/budget-details.component';
import { WorkAreaComponent } from './modules/works/pages/work-area/work-area.component';
import { ClientViewComponent } from './modules/clients/pages/client-view/client-view.component';
import { BudgetViewComponent } from './modules/budgets/pages/budget-view/budget-view.component';
import { WorkViewComponent } from './modules/works/pages/work-view/work-view.component';
import { WorkDetailsComponent } from './modules/works/pages/work-details/work-details.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},

    {path: 'client', component: ClientViewComponent},
    {path: 'client/detail', component: ClientDetailsComponent},
    {path: 'client/edit/:clientId', component: ClientViewComponent},
    
    {path: 'budget', component: BudgetViewComponent},
    {path: 'budget/detail/:budgetId', component: BudgetDetailsComponent},
    {path: 'budget/new/:clientId', component: BudgetViewComponent},
    {path: 'budget/edit', component: BudgetViewComponent},

    {path: 'work', component: WorkViewComponent},
    {path: 'work/detail/:workId', component: WorkDetailsComponent},
    {path: 'work/new/:budgetId', component: WorkAreaComponent},
    {path: 'work/edit/:workId', component: WorkAreaComponent},
    
    {path: 'material/:materialId', component: MaterialFormComponent},
    
    {path: '', redirectTo: 'home' , pathMatch: 'full'},

];
