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
  enviarhis(data:any){
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const apiprueba1=environment.apiproxyinterno    
    return this.http.post<any>(apiprueba1, data,{headers});*/
  }
 
  registarHisGalenosTabla(data:any):Observable<any>{
    return this.http.post<any>(this.apiURL,data);
  }

  findByFechas(data:any):Observable<any>{
    return this.http.post(this.apiURL+'/findByFechas',data);
  }

  enviarApiHisData(data:any){
    console.log(data)
    return this.http.post(this.apiURL+'/enviarApiHisData',data);
  }

}
