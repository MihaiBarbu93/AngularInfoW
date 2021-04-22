import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Patient } from '../_models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientsUrl: string = 'api/patients'; 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.patientsUrl);
  }

  getPatient(id: number): Observable<Patient> {
    const url = `${this.patientsUrl}/${id}`;
    return this.http.get<Patient>(url).pipe();
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientsUrl, patient, this.httpOptions);
  }

  updatePatient(patient: Patient): Observable<any> {
    return this.http.put(this.patientsUrl, patient, this.httpOptions);
  }

  deletePatient(id: number): Observable<Patient> {
    const url = `${this.patientsUrl}/${id}`;
  
    return this.http.delete<Patient>(url, this.httpOptions);
  }
}
