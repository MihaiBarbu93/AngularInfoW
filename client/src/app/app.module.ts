import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { PacientComponent } from './pacient/pacient.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../app/_services/in-memory-data.service'
import { FormsModule } from '@angular/forms';
import { PacientService } from './_services/pacient.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PacientComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [PacientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
