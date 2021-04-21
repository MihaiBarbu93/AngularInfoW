import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PacientComponent } from './pacient/pacient.component';

const routes: Routes = [{ 
  
  path: '', component: HomeComponent,
    children: [
    {
      path: 'edit-pacient/:CNP',
      component: PacientComponent
    },
    {
      path: 'add-pacient',
      component: PacientComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
