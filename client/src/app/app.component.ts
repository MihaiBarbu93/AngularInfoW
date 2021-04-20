import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Client } from './_models/client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'InfoWorld';
 

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    
  }

    
  
}
