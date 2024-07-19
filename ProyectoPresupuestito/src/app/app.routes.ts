import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ClientFormComponent } from './modules/clients/client-form/client-form.component';
import { BudgetFormComponent } from './modules/budgets/budget-form/budget-form.component';
import { WorkFormComponent } from './modules/works/work-form/work-form.component';
import { MaterialFormComponent } from './modules/materials/material-form/material-form.component';
import { ClientDetailsComponent } from './modules/clients/client-details/client-details.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'budget', component: BudgetFormComponent},
    {path: 'work', component: WorkFormComponent},
    {path: 'material', component: MaterialFormComponent},
    {path: 'client', component: ClientFormComponent},
    {path: 'client/:clientid', component: ClientDetailsComponent},
    {path: 'about', component: AboutComponent},
    {path: '', redirectTo: '/home', pathMatch:'full'}

];
