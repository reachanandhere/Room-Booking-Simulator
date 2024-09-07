import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { ReservationListComponent } from '../reservation/reservation-list/reservation-list.component';
import { ReservationFormComponent } from '../reservation/reservation-form/reservation-form.component';
import { ReservationModule } from '../reservation/reservation.module';








@NgModule({
  declarations: [
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    
    ReservationModule
  ]
})
export class HomeModule { }
