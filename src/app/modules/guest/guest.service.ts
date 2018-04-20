import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GuestService {

  constructor(private http: HttpClient) { }

  getGuestByGuestId(id) {
    return this.http.post('guest/getGuestByGuestId', id);
  }
}
