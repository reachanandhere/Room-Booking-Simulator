import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  private apiURL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(`${this.apiURL}/reservations`);
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }

  addReservation(reservation: Reservation): void {
    const id = Math.random().toString(36).substr(2, 9);
    reservation.id = id;
    this.reservations.push(reservation);
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
