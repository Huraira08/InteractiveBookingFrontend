import { TestBed } from '@angular/core/testing';

import { UpdateBookingService } from './update-booking.service';

describe('UpdateBookingService', () => {
  let service: UpdateBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
