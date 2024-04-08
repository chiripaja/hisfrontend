import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './layout/nav/nav.component';
import { DetalleHisComponent } from './his/detalle-his/detalle-his.component';
import { ListaHisComponent } from './his/lista-his/lista-his.component';
import { AdminComponent } from './layout/admin/admin.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guard/auth.guard';
import { loginGuard } from './guard/login.guard';

const routes: Routes = [
  {  path:'',component:LoginComponent, pathMatch: 'full' ,canActivate:[loginGuard]},
  {    
    path: 'admin', component: AdminComponent,canActivateChild:[authGuard],
    children: [
      { path: 'listahis', component: ListaHisComponent },
      { path: 'DetalleHis', component: DetalleHisComponent }
    ]
  },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
