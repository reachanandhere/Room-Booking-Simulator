import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({
    checkInDate: new FormControl('', Validators.required),
    checkOutDate: new FormControl('', {
      validators: [Validators.required, this.dateValidator()],
    }),
    guestName: new FormControl('', Validators.required),
    guestEmail: new FormControl('', [Validators.required, Validators.email]),
    roomNumber: new FormControl('', Validators.required),
  });

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.reservationService.getReservation(id).subscribe((reservation) => {
        if (reservation) this.reservationForm.patchValue(reservation);
      });
    }
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const checkIn = this.reservationForm?.get('checkInDate')?.value;
      const checkOut = this.reservationForm?.get('checkOutDate')?.value;

      if (checkIn && checkOut && checkOut < checkIn) {
        return { dateMismatch: true }; // Return an error if check-out is before check-in
      }
      return null;
    };
  }

  get minCheckOutDate() {
    return this.checkInDate?.value;
  }

  get checkInDate() {
    return this.reservationForm.get('checkInDate');
  }

  get checkOutDate() {
    return this.reservationForm.get('checkOutDate');
  }

  get guestName() {
    return this.reservationForm.get('guestName');
  }

  get guestEmail() {
    return this.reservationForm.get('guestEmail');
  }

  get roomNumber() {
    return this.reservationForm.get('roomNumber');
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      let reservation: Reservation | undefined = this.reservationForm.value;
      if (id && reservation) {
        reservation.id = id;
        this.reservationService.updateReservation(reservation).subscribe(() => {});
        this.router.navigate(['/list']);
      } else {
        this.reservationService.addReservation(this.reservationForm.value).subscribe(() => {}); 
        this.reservationForm.reset();
        this.router.navigate(['/list']);
      }
    }
  }
}
