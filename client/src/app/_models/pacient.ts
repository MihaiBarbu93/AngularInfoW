import { Gender } from "./enums/gender";

export interface Pacient {
    Id:number,
    FirstName: string;
    LastName: string;
    DateOfBirth: Date;
    Gender: Gender;
  }