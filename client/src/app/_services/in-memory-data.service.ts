import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Patient } from '../_models/patient';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    let patients = [
      {
        id: 1,
        firstName: "Della",
        lastName: "Sweet",
        dateOfBirth: new Date("2003-03-28"),
        gender: "M",
        ssn : 2123456789098,
        phoneNumber: 9954802602
      },
      {
        id: 2,
        firstName: "Cassandra",
        lastName: "Castillo",
        dateOfBirth: new Date("1970-12-25"),
        gender: "M",
        ssn: 1098767854321,
        phoneNumber: 8035842781
      },
      {
        id: 3,
        firstName: "Maura",
        lastName: "Wells",
        dateOfBirth: new Date("1978-09-05"),
        gender: "F",
        ssn: 2456789054367,
        phoneNumber: 8584643734
      },
      {
        id: 4,
        firstName: "Trina",
        lastName: "Gaines",
        dateOfBirth: new Date("1984-07-23"),
        gender: "F",
        ssn: 1876432345678,
        phoneNumber: 8784423884
      },
      {
        id: 5,
        firstName: "Curry",
        lastName: "Henson",
        dateOfBirth: new Date("1979-05-28"),
        gender: "F",
        ssn: 2345678904531,
        phoneNumber: 9024962374
      },
      {
        id: 6,
        firstName: "Justine",
        lastName: "Norton",
        dateOfBirth: new Date("1971-09-07"),
        gender: "F",
        ssn: 2345643454210,
        phoneNumber: 9734282402
      },
      {
        id: 7,
        firstName: "Hammond",
        lastName: "Curry",
        dateOfBirth: new Date("2004-09-16"),
        gender: "M",
        ssn: 2345678903451,
        phoneNumber: 8934143540
      },
      {
        id: 8,
        firstName: "Agnes",
        lastName: "Vang",
        dateOfBirth: new Date("1953-11-26"),
        gender: "M",
        ssn: 1456342178906,
        phoneNumber: 9944342312
      },
      {
        id: 9,
        firstName: "Wall",
        lastName: "Saunders",
        dateOfBirth: new Date("2000-09-13"),
        gender: "M",
        ssn: 1456783423570,
        phoneNumber: 8135762297
      },
      {
        id: 10,
        firstName: "Parker",
        lastName: "Butler",
        dateOfBirth: new Date("1976-02-16"),
        gender: "M",
        ssn: 1456321234567,
        phoneNumber: 9994022844
      },
    

    ];

    return {
     patients: patients
    };
  }

  genid(patients: Patient[]): number {
    return patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
  }
    
}
