import { Routes } from '@angular/router';
import { LoginComponent } from './ui/layout/login/login.component';
import { RegisterComponent } from './ui/layout/register/register.component';
import { UiComponent } from './ui/ui.component';

export const routes: Routes = [
    {path:'', component:UiComponent},
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent}
];
