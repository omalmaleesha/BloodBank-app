import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterUserPageComponent } from './pages/register-user-page/register-user-page.component';
import { RegisterHospitalPageComponent } from './pages/register-hospital-page/register-hospital-page.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { HomeComponent } from './donar/home/home.component';

export const routes: Routes = [
    {
        path:"", 
        redirectTo:"/login",
        pathMatch:"full"
    },
    {
        path:'',
        component:HomePageComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'DonarReg',
        component:RegisterUserPageComponent
    },
    {
        path:'HospitalReg',
        component:RegisterHospitalPageComponent
    },
    {
        path:'Donar-Home',
        component:HomeComponent
    },
    {
        path:'Admin-Home',
        component:HomeAdminComponent
    }
];
