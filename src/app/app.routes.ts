import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterUserPageComponent } from './pages/register-user-page/register-user-page.component';
import { HomeComponent } from './donar/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { HospitalComponent } from './hospital/hospital.component';
import { AddHospitalComponent } from './admin/add-hospital/add-hospital.component';
import { authGuard } from './services/auth.guard';
import { AboutusComponent } from './pages/aboutus/aboutus.component';

export const routes: Routes = [
    // {
    //     path:"", 
    //     redirectTo:"/login",
    //     pathMatch:"full"
    // },
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
        path:'Donar-Home',
        component:HomeComponent,
        canActivate: [authGuard]
    },
    {
        path:'Admin',
        component:AdminComponent,
        canActivate: [authGuard]
    },
    {
        path:'Hospital',
        component:HospitalComponent,
        canActivate: [authGuard]
    },
    {
        path:'add-Hospital',
        component:AddHospitalComponent
    },
    {
        path:'aboutus',
        component:AboutusComponent
    }
];
