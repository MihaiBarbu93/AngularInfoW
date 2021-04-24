import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

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
    return this.http.put<Patient>(this.patientsUrl, patient, this.httpOptions).pipe(
      tap(_ => console.log(`updated patient id=${patient.id}`)),
      catchError(this.handleError<any>('updatePatient'))
    );
  }

  deletePatient(id: number): Observable<Patient> {
    const url = `${this.patientsUrl}/${id}`;
  
    return this.http.delete<Patient>(url, this.httpOptions);
  }
}
