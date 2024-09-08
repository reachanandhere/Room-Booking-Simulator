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

  getReservation(id: string): Observable<Reservation> {
    return this.httpClient.get<Reservation>(`${this.apiURL}/reservation/${id}`);
  }

  addReservation(reservation: Reservation): Observable<void> {
    const id = Math.random().toString(36).substr(2, 9);
    reservation.id = id;
    return this.httpClient.post<void>(`${this.apiURL}/reservation`, reservation);
  }

  deleteReservation(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/reservation/${id}`);
  }

  updateReservation(reservation: Reservation): Observable<void> {
    // let index = this.reservations.findIndex((res) => reservation.id === res.id);
    // this.reservations[index] = reservation;
    return this.httpClient.post<void>(`${this.apiURL}/reservation`, reservation);
  }
}
