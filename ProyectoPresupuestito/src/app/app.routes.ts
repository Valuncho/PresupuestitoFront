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

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},

    {path: 'client', component: ClientViewComponent},
    {path: 'client/detail/:clientId', component: ClientDetailsComponent},
    {path: 'client/edit/:clientId', component: ClientViewComponent},
    
    {path: 'budget', component: BudgetViewComponent},
    {path: 'budget/new/:clientId', component: BudgetViewComponent},
    {path: 'budget/detail/:budgetId', component: BudgetDetailsComponent},
    {path: 'budget/edit/:budgetId', component: BudgetViewComponent},

    {path: 'work', component: WorkViewComponent},
    {path: 'work/detail/:workId', component: WorkDetailsComponent},
    {path: 'work/new/:budgetId', component: WorkAreaComponent},
    {path: 'work/edit/:budgetId', component: WorkAreaComponent},
    
    {path: 'material', component: MaterialViewComponent},
    {path: 'material/add', component: MaterialFormViewComponent},
    {path: 'material/edit', component: MaterialFormViewComponent},
    
    {path: '', redirectTo: 'home' , pathMatch: 'full'},

];
