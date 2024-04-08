import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SweetService } from '../services/sweet.service';
import { Iauthgalenos } from '../interfaces/iauthgalenos';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  hide = true;
  fb = inject(FormBuilder)
  router = inject(Router)
  usuario!: Iauthgalenos
  authservice = inject(AuthService)
  alertsuccessservices = inject(SweetService)
  form = this.fb.group({
    usuario: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })

  obtenerErrorCampoNombre(camponom: string) {
    var campo = this.form.get(camponom)
    if (campo?.hasError('required')) {
      return 'El campo es requerido';
    }
    return ''
  }


  onSubmit() {    
    this.authservice.authToken(this.form.value).pipe(
      tap(data => {        
        this.authservice.guardarToken(data); 
      }),
      catchError(error => {     
       this.alertsuccessservices.mostrarMensajeError(error.error.message)
        return of(null);
      })
    ).subscribe(()=>{
      this.router.navigate(['/admin/listahis'])
    });
  }

}
