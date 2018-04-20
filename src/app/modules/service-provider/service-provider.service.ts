import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServiceProviderService {

  constructor(private http: HttpClient) { }

  createShift(body) {
    return this.http.post('shift/createShift', body);
  }

  checkShift() {
    return this.http.get('shift/checkShift');
  }

  finishShift() {
    return this.http.put('shift/finishShift', {});
  }

  getProviderByUserId(userId) {
    return this.http.post('serviceProvider/getProviderByUserId', userId);
  }
}
