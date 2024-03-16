import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HisService {
  private apiURL = environment.apiURL + 'his';  
  private http=inject(HttpClient)
  findListaHist(){
    return this.http.get(this.apiURL)
  }
  enviarhis(data:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const apiprueba1='http://localhost:4001/http://dpidesalud.minsa.gob.pe:18080/mcs-sihce-hisminsa/integracion/v1.0/paquete/actualizar'
    return this.http.post<any>(apiprueba1, data,{headers});
  }
 
  registarHisGalenosTabla(data:any):Observable<any>{
    return this.http.post<any>(this.apiURL,data);
  }

  findByFechas(data:any):Observable<any>{
    return this.http.post(this.apiURL+'/findByFechas',data);
  }

}
