import { Gender } from "./enums/gender";

export interface Patient {
    OrderNr:number,
    FirstName: string;
    LastName: string;
    DateOfBirth: Date;
    Gender: string;
    CNP: number;
    PhoneNumber: number;
  }