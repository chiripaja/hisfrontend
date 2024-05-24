import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HisService } from 'src/app/services/his.service';
import { SweetService } from 'src/app/services/sweet.service';
import { DetalletramaComponent } from '../detalletrama/detalletrama.component';
import { DialogRef } from '@angular/cdk/dialog';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-lista-his',
  templateUrl: './lista-his.component.html',
  styleUrls: ['./lista-his.component.css']
})
export class ListaHisComponent {

  progressbarState: boolean = false
  verdatajson: any;
  btnEstado: boolean = false;
  datageneral: any = []
  hiservices = inject(HisService)
  sweetService = inject(SweetService)
  dialog = inject(MatDialog)

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ColumnasMostrar = ['IdAtencion', 'idcita', 'enviarData', 'detalles', 'estado', 'fecha'];
  datasource: any;

  cargarData() {
    this.sweetService.loading();
    this.hiservices.findByFechas(this.range.value).subscribe(data => {
      console.log(data)
      this.datageneral = data
      this.datasource = new MatTableDataSource<any>(this.datageneral);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.sweetService.close();
    })
  }


  EnvioMasivo() {
    this.progressbarState = true;
    const objetosFiltrados = this.datageneral.filter((data: any) => data['idcita'] === "");
    const promises = objetosFiltrados.map((data: any) => {
      this.EnviarUnidadApi(data)
    })
    this.progressbarState = false
    console.log(promises)
   
  }

  fb = inject(FormBuilder)
  range = this.fb.group({
    start: ['', Validators.required],
    end: ['', Validators.required],
  })



  openDialog() {
    const dialog = this.dialog.open(DetalletramaComponent)
  }

  EnviarUnidadApi(data: any) {
    this.sweetService.loading();
    this.btnEstado = true;
    const { IdAtencion, IdPaciente, fechaRegistro, idcita, ...tramaHis } = data;
    this.hiservices.enviarApiHisData(tramaHis).subscribe((data: any) => {
      this.btnEstado = false;
      const registrohis = {
        idcitatoken: data.idCita,
        idatencion: IdAtencion
      }
      this.hiservices.registarHisGalenosTabla(registrohis).subscribe((data: any) => {
        this.cargarData();
        this.btnEstado = false;
        this.sweetService.close();
      },
        error => {
          this.btnEstado = false;
          console.log(error);
          this.sweetService.mostrarMensajeError(error.error.descripcion);
        })
    }, (error) => {
      this.btnEstado = false;
      this.sweetService.mostrarMensajeError(error.error.message);
    })
  }
}
