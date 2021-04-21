import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pacient } from '../_models/pacient';

@Injectable({
  providedIn: 'root'
})
export class PacientService {

  private pacientsUrl: string = 'api/pacients'; 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPacients(): Observable<Pacient[]>{
    return this.http.get<Pacient[]>(this.pacientsUrl);
  }

  getPacient(id: number): Observable<Pacient> {
    const url = `${this.pacientsUrl}/${id}`;
    return this.http.get<Pacient>(url).pipe();
  }

  addPacient(pacient: Pacient): Observable<Pacient> {
    return this.http.post<Pacient>(this.pacientsUrl, pacient, this.httpOptions);
  }

  updatePacient(pacient: Pacient): Observable<any> {
    return this.http.put(this.pacientsUrl, pacient, this.httpOptions);
  }

  deletePacient(id: number): Observable<Pacient> {
    const url = `${this.pacientsUrl}/${id}`;
  
    return this.http.delete<Pacient>(url, this.httpOptions);
  }
}
