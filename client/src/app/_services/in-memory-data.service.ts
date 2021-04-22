import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Gender } from '../_models/enums/gender';
import { Patient } from '../_models/patient';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    let patients: Patient[] = [
      {
        "OrderNr": 1,
        "FirstName": "Della",
        "LastName": "Sweet",
        "DateOfBirth": new Date("2003-03-28"),
        "Gender": Gender[0],
        "CNP": 2123456789098,
        "PhoneNumber": 9954802602
      },
      {
        "OrderNr": 2,
        "FirstName": "Cassandra",
        "LastName": "Castillo",
        "DateOfBirth": new Date("1970-12-25"),
        "Gender": Gender[0],
        "CNP": 1098767854321,
        "PhoneNumber": 8035842781
      },
      {
        "OrderNr": 3,
        "FirstName": "Maura",
        "LastName": "Wells",
        "DateOfBirth": new Date("1978-09-05"),
        "Gender": Gender[1],
        "CNP": 2456789054367,
        "PhoneNumber": 8584643734
      },
      {
        "OrderNr": 4,
        "FirstName": "Trina",
        "LastName": "Gaines",
        "DateOfBirth": new Date("1984-07-23"),
        "Gender": Gender[1],
        "CNP": 1876432345678,
        "PhoneNumber": 8784423884
      },
      {
        "OrderNr": 5,
        "FirstName": "Curry",
        "LastName": "Henson",
        "DateOfBirth": new Date("1979-05-28"),
        "Gender": Gender[1],
        "CNP": 2345678904531,
        "PhoneNumber": 9024962374
      },
      {
        "OrderNr": 6,
        "FirstName": "Justine",
        "LastName": "Norton",
        "DateOfBirth": new Date("1971-09-07"),
        "Gender": Gender[1],
        "CNP": 2345643454210,
        "PhoneNumber": 9734282402
      },
      {
        "OrderNr": 7,
        "FirstName": "Hammond",
        "LastName": "Curry",
        "DateOfBirth": new Date("2004-09-16"),
        "Gender": Gender[0],
        "CNP": 2345678903451,
        "PhoneNumber": 8934143540
      },
      {
        "OrderNr": 8,
        "FirstName": "Agnes",
        "LastName": "Vang",
        "DateOfBirth": new Date("1953-11-26"),
        "Gender": Gender[0],
        "CNP": 1456342178906,
        "PhoneNumber": 9944342312
      },
      {
        "OrderNr": 9,
        "FirstName": "Wall",
        "LastName": "Saunders",
        "DateOfBirth": new Date("2000-09-13"),
        "Gender": Gender[0],
        "CNP": 1456783423570,
        "PhoneNumber": 8135762297
      },
      {
        "OrderNr": 10,
        "FirstName": "Parker",
        "LastName": "Butler",
        "DateOfBirth": new Date("1976-02-16"),
        "Gender": Gender[0],
        "CNP": 1456321234567,
        "PhoneNumber": 9994022844
      }
    ];

    return {
     patients: patients
    };
   }

   genId(patients: Patient[]): number {
    return patients.length > 0 ? Math.max(...patients.map(p => p.OrderNr)) + 1 : 1;
  }
    
  }
