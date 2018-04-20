import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { ServiceProviderService } from '../../../service-provider/service-provider.service';
import { UserService } from '../../../user/user.service';
import { ServiceService } from '../../../service/service.service';
import { GuestService } from '../../../guest/guest.service';
import { StudentService } from '../../../student/student.service';
import { CounterService } from '../../../counter/counter.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../../shared/services/messages/message.service';
import { ToasterService } from 'angular5-toaster';

@Component({
  selector: 'app-current-ticket',
  templateUrl: './current-ticket.component.html',
  styleUrls: ['./current-ticket.component.scss']
})
export class CurrentTicketComponent implements OnInit {

  private currentTicket: any;
  private stringMsg: any;
  private currentShift: any;
  private services: any;
  private selectedAction: any;

  constructor(private ticketService: TicketService, private providerService: ServiceProviderService, private userService: UserService,
    private serviceService: ServiceService, private guestService: GuestService, private studentService: StudentService, private counterService: CounterService,
    private router: Router, private message: MessageService, private toaster: ToasterService) { }

  ngOnInit() {
    if (this.message.getMessage().clear === "0") {
      let toastMessage = this.message.getMessage();
      this.toaster.pop(toastMessage.type, toastMessage.title, toastMessage.body);
      this.message.clearMessage();
    }

    this.providerService.checkShift().subscribe(
      (data: any) => {
        this.currentShift = data[0];
        if (this.currentShift) {
          console.log("currentShiftId", this.currentShift._id);
          this.ticketService.getCurrentActiveTicket(this.currentShift).subscribe(
            (data1: any) => {
              if (data1.length > 0) {
                this.currentTicket = data1[0];
                if (this.currentTicket.details.length > 0) {
                  this.selectedAction = this.currentTicket.details[0].actions;
                }
                this.userService.getUserById({ _id: this.currentTicket.userId }).subscribe(
                  (data2: any) => {
                    this.currentTicket.username = data2.username;
                    this.serviceService.getServices().subscribe(
                      (data3: any) => {
                        this.services = data3;
                        console.log("services", this.services);
                      }
                    );
                  }
                );
              }
              else {
                this.currentTicket = null;
              }
              console.log(this.currentTicket);
            },
            err => { console.error(err); }
          );
        }
      },
      err => { console.error(err); }
    );
  }

  onClickUpdateTicket() {
    this.ticketService.updateCurrentTicket(this.currentTicket)
      .subscribe(
        (data: any) => {
          this.stringMsg = data.message;
          this.currentTicket = data.ticket;
          console.log("data", data);
          switch (this.stringMsg) {
            case '0': {
              this.toaster.pop('error', 'Qme', 'Something went wrong, ticket update failed.');
              break;
            }
            case '1': {
              console.log("message = 1");
              this.message.clearMessage();
              this.message.setMessage('success', 'Qme', 'The ticket number ' + this.currentTicket.ticketNumber +
                ' was successfully updated with new status of \'' + this.currentTicket.status + '\'!');
              this.router.navigate(['/home']);
              break;
            }
          }
        },
        err => { console.error(err); }
      );
  }

  onClickCallTicket() {
    this.counterService.getCounterByCounterId({ counterId: this.currentShift.counterId }).subscribe(
      (data: any) => {
        console.log("data", data);
        if (data != null) {
          this.currentShift.counterName = data.counterName;
          if (this.currentTicket.studentId) {
            this.studentService.getStudentByStudentId({ studentId: this.currentTicket.studentId }).subscribe(
              (data2: any) => {
                console.log("data2", data2);
                if (data2 != null) {
                  this.currentTicket.ticketFor = data2.studentNumber;
                  this.toaster.pop('success', 'Calling Ticket...', 'Student #' + this.currentTicket.ticketFor +
                    ' should proceed to counter ' + this.currentShift.counterName + '.');
                }
              }
            );
          }
          else {
            this.guestService.getGuestByGuestId({ guestId: this.currentTicket.guestId }).subscribe(
              (data2: any) => {
                console.log("data2", data2);
                if (data2 != null) {
                  this.currentTicket.ticketFor = data2.firstName + " " + data2.lastName;
                  this.toaster.pop('success', 'Calling Ticket...', 'Guest \'' + this.currentTicket.ticketFor +
                    '\' should proceed to counter ' + this.currentShift.counterName + '.');
                }
              }
            );
          }
        }
      }
    );
  }
}
