import { Component } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent {
  reservations: Reservation[] = [];
  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservationService.getReservations().subscribe((reservations) => {
      this.reservations = reservations;
    });
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id).subscribe(() => {
      this.reservations = this.reservations.filter((res) => res.id !== id);
    });
  }
}
