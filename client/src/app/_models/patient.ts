import { Gender } from "./enums/gender";

export interface Patient {
    id:number,
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    ssn: number;
    phoneNumber: number;
  }