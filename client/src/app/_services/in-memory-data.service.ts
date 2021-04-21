import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Pacient } from '../_models/pacient';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    let pacients = [
      {
        "Id":"1",
        "FirstName": "Dena",
        "LastName": "Mooney",
        "DateOfBirth": "1977-06-08",
        "Gender": "M"
      },
      {
        "Id":"2",
        "FirstName": "Schneider",
        "LastName": "Gomez",
        "DateOfBirth": "1977-10-26",
        "Gender": "M"
      },
      {
        "Id":"3",
        "FirstName": "Walls",
        "LastName": "Ray",
        "DateOfBirth": "2010-09-23",
        "Gender": "F"
      },
      {
        "Id":"4",
        "FirstName": "Waller",
        "LastName": "Rowland",
        "DateOfBirth": "1974-06-13",
        "Gender": "M"
      },
      {
        "Id":"5",
        "FirstName": "Lott",
        "LastName": "Hall",
        "DateOfBirth": "1957-07-12",
        "Gender": "F"
      },
      {
        "Id":"6",
        "FirstName": "Miriam",
        "LastName": "Bowen",
        "DateOfBirth": "1996-12-30",
        "Gender": "F"
      }
    ];
    return {
     pacients: pacients
    };
   }
    genId(pacients: Pacient[]): number {
      return pacients.length > 0 ? Math.max(...pacients.map(pacient => pacient.Id)) + 1 : 11;
    }
  }
