import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Booking } from '../../models/booking';
import { UpdateBookingService } from '../../services/update-booking/update-booking.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddBookingModalComponent } from '../../components/add-booking-modal/add-booking-modal.component';

@Component({
  selector: 'app-bookings-page',
  templateUrl: './bookings-page.component.html',
  styleUrl: './bookings-page.component.css'
})
export class BookingsPageComponent implements OnInit {
  isLoading: boolean = false;
  dateRange!: Date[]

  bookings: Booking[] = [];

  colDefs: ColDef[] = [
    {field: "id"},
    {field: "startDate"},
    {field: "endDate"},
    {field: "userID"},
    {field: "price"},
  ]

  constructor(private bookingService: BookingService,
    private bookingUpdateService: UpdateBookingService,
    private modal: NzModalService
  ){
  }

  async ngOnInit() {
    this.bookings = await this.bookingService.getAllBooking();
    this.bookingUpdateService.startConnection().subscribe(()=>{
      this.bookingUpdateService.receiveUpdate().subscribe(update=>{
        console.log(update)
        this.bookingService.getAllBooking().then(bookings=>{
          this.bookings = bookings;
          this.dateRange=[]
        })
      })
    })
  }

  async searchBookings(dateRange: (Date|null)[]) {
    console.log(dateRange)
    console.log(this.dateRange)
    if(dateRange[0] && dateRange[1]){
      const newdateRange = dateRange.map(date=>`${date?.getFullYear()}-${date?.getMonth()!+1}-${date?.getDate()}`)
      this.bookings = await this.bookingService.getBookingByDateRange(newdateRange)
    }
  }

  showAddBookingModal(){
    const modal = this.modal.create({
      nzTitle: "Create new Bookign",
      nzContent: AddBookingModalComponent,
      nzFooter: null,
    })

    modal.afterClose.subscribe(async (result) =>{
      this.bookings = await this.bookingService.getAllBooking()
    })
  }
}
