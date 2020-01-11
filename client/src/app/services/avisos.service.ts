import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Aviso } from '../models/aviso';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {
  private url: string;

  constructor(
    public _http: HttpClient
  ) { 
    this.url = GLOBAL.url_api;
  }

  
  public agregarAviso(contacto: Contacto): Observable<any>{    
        
    //creo formulario para recibir datos en backend
    let params = new FormData();
    params.append('json',JSON.stringify(contacto));

    //creo headers
    const headers = new HttpHeaders();

    return this._http.post(this.url + 'avisos/correoweb/', params, { 'headers' : headers });
  }



}
