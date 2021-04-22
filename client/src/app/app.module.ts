import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../app/_services/in-memory-data.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from './_services/patient.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PatientComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SelectDropDownModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    BsModalService,
    PatientService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
