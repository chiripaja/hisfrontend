import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './layout/nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ListaHisComponent } from './his/lista-his/lista-his.component';
import { LoginComponent } from './login/login.component';
import { DetalleHisComponent } from './his/detalle-his/detalle-his.component';
import { AdminComponent } from './layout/admin/admin.component';
import { CardComponent } from './utils/card/card.component';
import { MaterialModule } from './material/material.module';
import es from '@angular/common/locales/es';
import { DatePipe, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetalletramaComponent } from './his/detalletrama/detalletrama.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
registerLocaleData(es);
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ListaHisComponent,
    LoginComponent,
    DetalleHisComponent,
    AdminComponent,
    CardComponent,
    DetalletramaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxJsonViewerModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
