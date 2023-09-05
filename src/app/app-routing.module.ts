import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { MainNavComponent } from './shared/main-nav/main-nav.component';
import { EquipmentFacilitiesComponent } from './pages/equipment-facilities/equipment-facilities.component';
import { FloorComponent } from './pages/floor/floor.component';
import { CompanyComponent } from './pages/company/company.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: MainNavComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'equipment_facilities', component: EquipmentFacilitiesComponent},
    {path: 'floor', component: FloorComponent},
    {path: 'company', component: CompanyComponent},
    {path: '**', redirectTo: 'home'},
  ]},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
