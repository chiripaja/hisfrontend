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
export class ListaHisComponent implements OnInit {


  verdatajson: any;
  btnEstado: boolean = false;
  datageneral: any = []
  hiservices = inject(HisService)
  sweetService=inject(SweetService)
  dialog=inject(MatDialog)

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ColumnasMostrar = ['IdAtencion', 'idcita', 'enviarData','detalles','estado','fecha'];
  datasource: any;

  ngOnInit(): void {
    //this.cargarData()
  }

  cargarData() {
   /* this.hiservices.findListaHist().subscribe(data => {
      this.datageneral = data
      this.datasource = new MatTableDataSource<any>(this.datageneral);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })*/
    this.sweetService.loading();
    this.hiservices.findByFechas(this.range.value).subscribe(data=>{
      this.datageneral = data
     this.datasource = new MatTableDataSource<any>(this.datageneral);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort; 
      this.sweetService.close();
    })
  }

  EnviarUnidad(data: any) {
    this.sweetService.loading();
    this.btnEstado = true; 
    const { IdAtencion, IdPaciente,fechaRegistro,idcita, ...tramaHis } = data;  
  
   
    this.verdatajson = tramaHis;


this.hiservices.enviarhis(tramaHis).pipe(
  concatMap(data => {
    console.log(data)
    // Dentro de concatMap, se ejecuta this.hiservices.registarHisGalenosTabla()
    const datosCita = {
      fechaActual: new Date().toISOString().slice(0, 19).replace('T', ' '),
      idcitatoken: parseInt(data.idCita),
      idatencion: IdAtencion
    };
    // Retornar el observable de this.hiservices.registarHisGalenosTabla()
    return this.hiservices.registarHisGalenosTabla(datosCita);
  })
).subscribe(
  data => {
    // Manejar la respuesta de this.hiservices.registarHisGalenosTabla()
    this.cargarData();
    this.btnEstado = false;
    this.sweetService.close();
  },
  error => {
    // Manejar cualquier error que ocurra en cualquiera de las llamadas
    this.btnEstado = false;
    console.log(error);
    this.sweetService.mostrarMensajeError(error.error.descripcion);
  }
);

    /*this.hiservices.enviarhis(tramaHis).subscribe(
      (data)=>{
        const datosCita={
          fechaActual : new Date().toISOString().slice(0, 19).replace('T', ' '),
          idcitatoken:parseInt(data.idCita),
          idatencion:IdAtencion
        }        
        this.hiservices.registarHisGalenosTabla(datosCita).subscribe(data=>{         
         
          this.cargarData();
          this.btnEstado = false;
          this.sweetService.close();
        })
      
    },
    (error) => {
      this.btnEstado = false;
      console.log(error)
      this.sweetService.mostrarMensajeError(error.error.descripcion)
      
    }
    );*/

 



  }

  EnvioMasivo() {
    const objetosFiltrados = this.datageneral.filter((data:any) => data['idcita'] === "");
    console.log(objetosFiltrados.length)
   objetosFiltrados.map((data:any)=>{
      this.EnviarUnidad(data)
    })/* */
   
  
  }

  fb = inject(FormBuilder)
  range = this.fb.group({
    start: ['', Validators.required],
    end: ['', Validators.required],
  })



  openDialog() {
    const dialog=this.dialog.open(DetalletramaComponent)   
    }
}
