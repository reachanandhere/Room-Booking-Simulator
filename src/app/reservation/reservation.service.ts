import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }

  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
    console.log(this.reservations);
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex((reservation) => reservation.id === id);
    this.reservations.splice(index, 1);
  }

    updateReservation(reservation: Reservation): void {
        let index = this.reservations.findIndex((res) => reservation.id === res.id);
        this.reservations[index] = reservation;
    }

}
