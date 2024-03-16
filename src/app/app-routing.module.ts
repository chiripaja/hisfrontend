import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './layout/nav/nav.component';
import { DetalleHisComponent } from './his/detalle-his/detalle-his.component';
import { ListaHisComponent } from './his/lista-his/lista-his.component';
import { AdminComponent } from './layout/admin/admin.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'ListaHis', component: ListaHisComponent },
      { path: 'DetalleHis', component: DetalleHisComponent }
    ]
  },
  { path: '', redirectTo: 'ListaHis', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
