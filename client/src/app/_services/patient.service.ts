import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { Patient } from '../_models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientsUrl: string = 'api/patients'; 
  patient: ConfirmationModalComponent;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  async getPatients(): Promise<Patient[]>{
    let data = await this.http.get<Patient[]>(this.patientsUrl).toPromise();
    return data;
  }

  async getPatient(id: number): Promise<Patient> {
    const url = `${this.patientsUrl}/${id}`;
    return await this.http.get<Patient>(url).toPromise();
  }

  async addPatient(patient: Patient): Promise<Patient> {
    return await this.http.post<Patient>(this.patientsUrl, patient, this.httpOptions).toPromise();
  }

  async updatePatient(patient: Patient): Promise<Patient> {
    return this.http.put<Patient>(this.patientsUrl, patient, this.httpOptions).pipe(
      catchError(this.handleError<any>('updatePatient'))
    ).toPromise();
  }

  async deletePatient(id: number): Promise<Patient> {
    const url = `${this.patientsUrl}/${id}`;
    return await this.http.delete<Patient>(url, this.httpOptions).toPromise();
    
  }
}
