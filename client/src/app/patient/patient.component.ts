import { Component, Inject, Input, OnInit } from '@angular/core';
import { Gender } from '../_models/enums/gender';
import { Patient } from '../_models/patient';
import { PatientService } from '../_services/patient.service';
import {Location} from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first, tap } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  @Input() modalRefFromHomeComponent: any;
  @Input() patientsFromHomeComponent:any;
  @Input() idFromHome: any;
  @Input() isAddMode: boolean;
  newPatient: Patient = <Patient>{};
  patientForm: FormGroup;
  genderTypes: string[] = [];


  constructor(private patientService: PatientService, private _location: Location, private route: ActivatedRoute) {
 
    }

  ngOnInit(): void {
    console.log("order nr: ", this.idFromHome);
    this.isAddMode = !this.idFromHome;
    this.getGenderTypes();
    
    this.patientForm = new FormGroup({
      id: new FormControl({value: null, disabled:true}),
      firstName: new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      dateOfBirth: new FormControl('',[
        Validators.required
      ]),
      gender: new FormControl('',
        Validators.required
      ),
      ssn: new FormControl('',[
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern("^[0-9]*$"),
      ]),
      phoneNumber: new FormControl('',[
        Validators.pattern("^[0-9]*$")
      ])
    });

    if (!this.isAddMode) {
      this.patientService.getPatient(this.idFromHome)
          .pipe(first())
          .subscribe(p => this.newPatient={
            ...p, dateOfBirth: new Date(p.dateOfBirth)
          });
    }else{
      this.newPatient.id =this.genId(this.patientsFromHomeComponent);
    }
  }



  getGenderTypes() {
    for (var n in Gender) {
      if (typeof Gender[n] === 'number') this.genderTypes.push(n);
    }
  }
  genId(patients: Patient[]): number {
    return patients.length > 0 ? Math.max(...patients.map(patient => patient.id)) + 1 : 11;
  }

 

  get f() {
    return this.patientForm.controls;
  }

  onSubmit(){
    if (this.isAddMode) {
      this.add();
    } else {
      this.updatePatient();
    }
    
    this.newPatient = <Patient>{};
  }


  add(): void {
    this.patientService.addPatient(this.newPatient)
    .subscribe(
      (p) => {
        this.patientsFromHomeComponent.push(p);
      },
      (error) => {
        console.log(error);
      }
    );
    this.modalRefFromHomeComponent.dismissAll(),
    this.resetForm();
  }
 

  updatePatient(): void {
    this.patientService.updatePatient(this.newPatient)
      .subscribe((p)=>{
        let patientIndex = this.patientsFromHomeComponent.findIndex(patient => patient.id == p.id);
        this.patientsFromHomeComponent[patientIndex] = p;
      });
      this.modalRefFromHomeComponent.dismissAll();
      this.resetForm();  
  }

  resetForm(){
    this.newPatient = <Patient>{};
    this.idFromHome  = null;
    this.isAddMode = null;
    this.patientForm.reset();
  }
  
}
