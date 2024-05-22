import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NzModalRef } from 'ng-zorro-antd/modal';
import { BookingService } from '../../services/booking/booking.service';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-add-booking-modal',
  templateUrl: './add-booking-modal.component.html',
  styleUrl: './add-booking-modal.component.css'
})
export class AddBookingModalComponent {
  bookingForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private modalRef: NzModalRef
  ){
    this.bookingForm = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
  }
  async submitBooking() {
    if(this.bookingForm.valid){
      console.log(this.bookingForm.value)
      const newBooking: Booking= this.bookingForm.value
      console.log(newBooking)
      await this.bookingService.AddBooking(newBooking)
      this.modalRef.destroy()
    }else{
      // mark all controls as dirty
      Object.values(this.bookingForm.controls).forEach(control=>{
        if(control.invalid){
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true})
        }
      })
    }
  }
}
