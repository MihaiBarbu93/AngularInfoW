import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pacient } from '../_models/pacient';
import { PacientService } from '../_services/pacient.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pacients: Pacient[] = [];

  constructor(private pacientService: PacientService) { }

  ngOnInit(): void {
    this.getPacients();
  }

  getPacients(){
    this.pacientService.getPacients().subscribe((pacinets) => {
      this.pacients = pacinets;
    });
  }
  delete(pacient: Pacient): void {
    this.pacients = this.pacients.filter(p => p !== pacient );
    this.pacientService.deletePacient(pacient.Id).subscribe();
  }



}
