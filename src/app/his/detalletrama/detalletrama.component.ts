import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detalletrama',
  templateUrl: './detalletrama.component.html',
  styleUrls: ['./detalletrama.component.css'],

})
export class DetalletramaComponent {
  @Input() data: any;
  dialog = inject(MatDialog)
  abrirDialogo(): void {
    const dialogRef = this.dialog.open(detalle, {
      width: '100%', 
      maxWidth: '700px',
      data: this.data
    });

 
  }



}

import {  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
@Component({
  selector: 'detalle',
  templateUrl: 'detalle.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,NgxJsonViewerModule],
})
export class detalle implements OnInit {
  dataver:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.dataver=this.data
  }
  
}