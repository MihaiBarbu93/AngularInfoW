import { Component, Input, OnInit } from '@angular/core';
import { Gender } from '../_models/enums/gender';
import { Patient } from '../_models/patient';
import { PatientService } from '../_services/patient.service';
import {Location} from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  @Input() modalRefFromHomeComponent: any;
  @Input() patientsFromHomeComponent:any;
  newPatient: Patient = <Patient>{};
  patientForm: FormGroup;
  genderTypes: string[] = [];

  constructor(private patientService: PatientService, private _location: Location) { }

  ngOnInit(): void {
    this.getGenderTypes();
    this.newPatient.OrderNr =this.genId(this.patientsFromHomeComponent);
    this.patientForm = new FormGroup({
      orderNr: new FormControl(''),
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
      CNP: new FormControl('',[
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

  configGenderType = {
    displayKey: 'description', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Gender', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr', // the direction of the search input can be rtl or ltr(default)
  };

  getGenderTypes() {
    for (var n in Gender) {
      if (typeof Gender[n] === 'number') this.genderTypes.push(n);
    }
  }
  genId(patients: Patient[]): number {
    return patients.length > 0 ? Math.max(...patients.map(patient => patient.OrderNr)) + 1 : 11;
  }

  get firstName() {
    return this.patientForm.get('firstName');
  }
  get lastName() {
    return this.patientForm.get('lastName');
  }
  get dateOfBirth() {
    return this.patientForm.get('dateOfBirth');
  }
  get gender() {
    return this.patientForm.get('gender');
  }
  get CNP() {
    return this.patientForm.get('CNP');
  }
  get phoneNumber() {
    return this.patientForm.get('phoneNumber');
  }

  get orderNr(){
    return this.patientForm.get('orderNr');
  }

  get f() {
    return this.patientForm.controls;
  }




  add(): void {
    this.patientService.addPatient(this.newPatient)
    .subscribe(
      (p) => {
        this.patientsFromHomeComponent.push(p),
        this.modalRefFromHomeComponent.hide()
      },
      (error) => {
        console.log(error);
      }
    );
  }

  save(patientFromForm: Patient): void {
    this.patientService.updatePatient(patientFromForm)
      .subscribe(() => this._location.back());
  }
  
}
