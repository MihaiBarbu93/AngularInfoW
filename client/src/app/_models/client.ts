import { Gender } from "./enums/gender";

export interface Client {
    FirstName: string;
    LastName: string;
    DateOfBirth: Date;
    Gender: Gender;
  }