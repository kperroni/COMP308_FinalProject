import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  username: String;
  result: any;
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('user/getUsers');
  }

  getActiveUser() {
    return this.http.get('user/getActiveUser');
  }


  logIn(body) {
    return this.http.post('user/logIn', body);

  }

  getUserById(body) {
    return this.http.post('user/getUserById', body);
  }

  logOut() {
    return this.http.get('user/logOut');
  }

  getUserSession() {
    return this.http.get('user/getUserSession');
  }
}
