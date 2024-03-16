import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetService {

  // Método para mostrar un mensaje de éxito
  mostrarMensajeExito(mensaje: string): void {
    Swal.fire('¡Éxito!', mensaje, 'success');
  }

  // Método para mostrar un mensaje de error
  mostrarMensajeError(mensaje: string): void {
    Swal.fire('¡Error!', mensaje, 'error');
  }

  // Método para mostrar un mensaje de advertencia
  mostrarMensajeAdvertencia(mensaje: string): void {
    Swal.fire('¡Advertencia!', mensaje, 'warning');
  }

  // Método para mostrar un mensaje de información
  mostrarMensajeInformacion(mensaje: string): void {
    Swal.fire('Información', mensaje, 'info');
  }

  loading():void{
    Swal.fire({
      title: 'Cargando',
      text: 'Por favor, espere...',
      didOpen:()=>{
        Swal.showLoading()
      }
    })
  }
  close():void{
    Swal.close();
  }
  mostrarConfirmacion(titulo: string, mensaje: string): Promise<boolean> {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      return result.isConfirmed;
    });
  }


}
