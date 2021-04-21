import { Component, OnInit } from '@angular/core';
import { Gender } from '../_models/enums/gender';
import { Pacient } from '../_models/pacient';
import { PacientService } from '../_services/pacient.service';

@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.component.html',
  styleUrls: ['./pacient.component.css']
})
export class PacientComponent implements OnInit {

  constructor(private pacientService: PacientService) { }

  ngOnInit(): void {

  }

  add(patientFromForm: Pacient): void {
    this.pacientService.addPacient(patientFromForm)
    .subscribe();
  }
  
}
