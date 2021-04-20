import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Client } from '../_models/client';
import { ClientService } from '../_services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clients: Client[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }



}
