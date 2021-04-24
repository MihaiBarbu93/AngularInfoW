import { Component, OnInit, TemplateRef } from '@angular/core';
import { Patient } from '../_models/patient';
import { PatientService } from '../_services/patient.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PatientComponent } from '../patient/patient.component';
import { Gender } from '../_models/enums/gender';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mService: NgbModal;
  isAddMode: boolean;
  ordrNr: number;
  patients: Patient[] = [];

  constructor(private patientService: PatientService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.mService=modalService;
   }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(){
    this.patientService.getPatients().subscribe((patients) => {
      this.patients = patients;
    });
  }
  delete(patient: Patient): void {
    this.patients = this.patients.filter(p => p !== patient );
    this.patientService.deletePatient(patient.id).subscribe();
  }
  open(content: TemplateRef<any>, id?:number) {
    if(id) {
      this.ordrNr=id;
      this.isAddMode=false;
    }else{
      this.isAddMode=true;
    };
    this.modalService.open(content);
  }

  close(){
    this.ordrNr = null;
    this.isAddMode=null;
    this.modalService.dismissAll();
  }
}