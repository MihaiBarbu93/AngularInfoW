import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../_models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }


  getClients(){
    return this.http.get<Client[]>('http://localhost:4200/assets/pacients.json');
  }
}
