import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QueueService {

  constructor(private http: HttpClient) { }

  getQueues() {
    return this.http.get('queue/getQueues');
  }
}
