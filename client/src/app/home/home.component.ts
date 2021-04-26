import { Component, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { Patient } from '../_models/patient';
import { PatientService } from '../_services/patient.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PatientComponent } from '../patient/patient.component';
import { Gender } from '../_models/enums/gender';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mService: NgbModal;
  isAddMode: boolean;
  ordrNr: number;
  confirm: boolean;
  patients: Patient[];

  constructor(private patientService: PatientService, config: NgbModalConfig, private modalService: NgbModal, public dialog: MatDialog) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.mService=modalService;
    this.patients=[];
   }

  ngOnInit(): void {
    if(this.patients.length===0){
      this.getPatients();
    }
  }

  getPatients(){
    this.patientService.getPatients().subscribe((patients) => {
      this.patients = patients;
    });
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

  openRemoveDialog(patient: Patient) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: patient
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete(patient);
      }
    });
  }

  delete(patient: Patient): void {
    this.patients = this.patients.filter(p => p !== patient );
    this.patientService.deletePatient(patient.id).subscribe();
  }
  

  close(){
    this.ordrNr = null;
    this.isAddMode=null;
    this.modalService.dismissAll();
  }
}