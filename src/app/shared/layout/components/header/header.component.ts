import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../modules/user/user.service';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../../../services/messages/message.service';
import { ToasterService } from 'angular5-toaster/angular5-toaster';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: Observable<any>;

  constructor(private userService: UserService, private router: Router, private toaster: ToasterService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.user = this.userService.getUserSession();
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  ngOnInit() {
    this.onAlertHide();
  }

  onLogOut() {
    this.userService.logOut().subscribe(
      (data: any) => {
        if (data.message === '1') {
          this.toaster.pop('success', 'Qme', 'You have successfully logged out');
          this.user = this.userService.getUserSession();
          this.router.navigateByUrl('/home');
        } else {
          console.log('Something went wrong when logging out');
        }
      }
    );
  }

  onAlertShow() {
    $('#alertTicketInput').show();
  }

  onAlertHide() {
    $('#alertTicketInput').hide();
  }

  showGuestTicket() {
    console.log('tick num : ' + $('#guestticketNumber').val());
    this.router.navigateByUrl('/guestActiveTicket/' + $('#guestticketNumber').val());
  }
}