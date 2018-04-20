import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { MessageService } from '../../../shared/services/messages/message.service';
import { ToasterService } from 'angular5-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private userService: UserService, private router: Router,
    private message: MessageService, private toaster: ToasterService) { }

  ngOnInit() {
  }

  onLogIn() {
    this.userService.logIn({ username: this.username, password: this.password })
      .subscribe(
        (data: any) => {
          const loginResult = data;
          switch (loginResult.message) {
            case '0': {
              this.toaster.pop('error', 'Qme', 'Invalid credentials. Please try again');
              break;
            }
            case '1': {
              this.userService.getUserSession()
                .subscribe(
                  (data: any) => {
                    this.message.setMessage('success', 'Qme', 'Welcome! ' + data.firstName);
                    this.router.navigate(['/home']);
                  }
                );
              break;
            }
          }
        },
        err => { console.error(err); }
      );
  }
}
