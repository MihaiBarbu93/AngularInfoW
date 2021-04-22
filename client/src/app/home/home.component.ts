import { Component, OnInit, TemplateRef } from '@angular/core';
import { Patient } from '../_models/patient';
import { PatientService } from '../_services/patient.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PatientComponent } from '../patient/patient.component';
import { Gender } from '../_models/enums/gender';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalRef!: BsModalRef;
  config = {
    keyboard: true,
  };
  patients: Patient[] = [];

  constructor(private patientService: PatientService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(){
    this.patientService.getPatients().subscribe((pacinets) => {
      this.patients = pacinets;
    });
  }
  delete(patient: Patient): void {
    this.patients = this.patients.filter(p => p !== patient );
    this.patientService.deletePatient(patient.OrderNr).subscribe();
  }

  openAddPatientModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }




}
