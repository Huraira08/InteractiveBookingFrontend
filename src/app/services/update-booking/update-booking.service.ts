import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateBookingService {
  private hubConntection!: signalR.HubConnection

  constructor() {
    this.hubConntection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7149/updateBooking')
    .build()
  }

  startConnection(){
    return new Observable<void>((observer)=>{
      this.hubConntection.start()
      .then(()=>{
        console.log("Connection established with booking update hub");
        observer.next()
        observer.complete()
      })
      .catch((error)=>{
        console.error("Error connecting to booking update hub: ", error);
        observer.error(error)
      })
    })
  }

  receiveUpdate(): Observable<any>{
    return new Observable<any>((observer)=>{
      this.hubConntection.on('update', (message: any)=>{
        observer.next(message)
      })
    })
  }
}
