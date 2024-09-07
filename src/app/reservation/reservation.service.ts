import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor() {
    let reservations = localStorage.getItem('reservations');
    if (reservations) {
      this.reservations = JSON.parse(reservations);
    } else [];
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }

  addReservation(reservation: Reservation): void {
    const id = Math.random().toString(36).substr(2, 9);
    reservation.id = id;
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(
      (reservation) => reservation.id === id
    );
    this.reservations.splice(index, 1);
  }

  updateReservation(reservation: Reservation): void {
    let index = this.reservations.findIndex((res) => reservation.id === res.id);
    this.reservations[index] = reservation;
  }
}
