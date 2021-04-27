import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gender } from '../_models/enums/gender';
import { Patient } from '../_models/patient';
import { PatientService } from '../_services/patient.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first} from 'rxjs/operators';

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
  today = new Date();
  @Output() saveEvent = new EventEmitter<boolean>();

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.setTodayDate();
    this.getGenderTypes();
    this.setPatientForm();
    
    if (!this.isAddMode) {
      this.patientService.getPatient(this.idFromHome)
          .then(p => this.newPatient={
            ...p, dateOfBirth: new Date(p.dateOfBirth)
          })
    }else{
      this.newPatient.id =this.genId(this.patientsFromHomeComponent);
    }
  }

  setTodayDate(){
    let dd = String(this.today.getDate()).padStart(2, '0');
    let mm = String(this.today.getMonth() + 1).padStart(2, '0');
    let yyyy = this.today.getFullYear();
    this.today = new Date(mm + '/' + dd + '/' + yyyy);
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

  onSubmit(value: boolean){
    if (this.isAddMode) {
      this.add();
    } else {
      this.updatePatient();
    }
    this.saveEvent.emit(value)
  }

  add(): void {
    this.patientService.addPatient(this.newPatient)
    .then(
      (p) => {
        this.patientsFromHomeComponent.push(p);
        this.resetForm(false);
      },
      (error) => {
        console.log(error);
      }
    );
    
  }
 
  updatePatient(): void {
    this.patientService.updatePatient(this.newPatient)
      .then((p)=>{
        let patientIndex = this.patientsFromHomeComponent.findIndex(patient => patient.id == p.id);
        this.patientsFromHomeComponent[patientIndex] = p;
        this.resetForm(true);
      });
        
  }

  setPatientForm(){
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
  }

  resetForm(isAdd: boolean){
    this.newPatient = <Patient>{};
    this.idFromHome  = null;
    this.isAddMode = isAdd;
    this.patientForm.reset();
    this.modalRefFromHomeComponent.dismissAll();
  }
  
}
