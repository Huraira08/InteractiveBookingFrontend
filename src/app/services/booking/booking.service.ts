import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable, tap } from 'rxjs';
import { Booking } from '../../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private url = 'https://localhost:7149/api/Bookings'


  constructor(private http: HttpClient) {
  }

  transformDate(bookingObs: Observable<Booking[]>){
    return bookingObs
      .pipe(map(bookingList => bookingList.map(b=>
        ({...b, 
          startDate: (new Date(b.startDate)).toLocaleDateString(),
          endDate: (new Date(b.endDate)).toLocaleDateString(),
        })
      )),
    )
  }
  
  getAllBooking(){
    let bookingObs = this.http.get<Booking[]>(this.url).pipe(this.transformDate);
    const promise = firstValueFrom(bookingObs)
    return promise;
  }

  getBookingByDateRange(dateRange: string[]){
    let bookingObs = this.http.get<Booking[]>(`${this.url}/${dateRange[0]}/${dateRange[1]}`)
    .pipe(this.transformDate);
    const promise = firstValueFrom(bookingObs)
    return promise
  }

  AddBooking(booking: Booking){
    const promise = firstValueFrom(this.http.post<number>(this.url, booking))
    return promise;
  }
}
