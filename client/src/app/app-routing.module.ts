import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [{ 
  
  path: '', component: HomeComponent,
    children: [
    {
      path: 'edit-patient/:CNP',
      component: PatientComponent
    },
    {
      path: 'add-patient',
      component: PatientComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
