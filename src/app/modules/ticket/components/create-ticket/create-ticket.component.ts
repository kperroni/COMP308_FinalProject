import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { UserService } from '../../../user/user.service';
import { ServiceService } from '../../../service/service.service';
import { StudentService } from '../../../student/student.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../../shared/services/messages/message.service';
import { ToasterService } from 'angular5-toaster';


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  user: any;

  typeCustomer: any;

  customer: any = {
    studentNumber: String,
    firstName: String,
    lastName: String,
    email: String,
  }
  studentInformation: any;  // to show in just one field the studet number and full name of a student

  ticket: any = {
    ticketNumber: Number,
    serviceId: String,
    subject: String,
    description: String,
    studentId: null,
    guestId: null,
    weight: Number,
    status: String,
    userId: String,
    creationTime: Date,
  }

  services: any[]; // Eventually it should be an array of User (Class)
  error: any;

  constructor(
    private ticketService: TicketService,
    private serviceService: ServiceService,
    private studentService: StudentService,
    private userService: UserService,
    private router: Router,
    private message: MessageService,
    private toaster: ToasterService) {

    this.userService.getActiveUser().subscribe(
      (data: any[]) => {
        this.user = data;
        if (this.user.type == 'S') {
          this.studentInformation = this.user.firstName + " " + this.user.lastName;
          this.studentService.getStudentByUserId({ userId: this.user._id }).subscribe(
            (data: any) => {
              if (data != null) {
                this.ticket.studentId = data._id;
                this.studentInformation = data.studentNumber + " - " + this.studentInformation + ", program: " + data.program;
              } else {
                this.studentInformation = '';
              }
            }
          )
        }
      },
      err => { console.error(err) }
    );

  }

  ngOnInit() {
    this.typeCustomer = "Student";
    this.customer.studentNumber = '';
    this.customer.firstName = '';
    this.customer.lastName = '';
    this.customer.email = '';
    this.user = { type: '' }; // initialize to avoid the error meanwhile the function recover the actual value and override it.

    this.serviceService.getServices().subscribe(
      (data: any[]) => {
        this.services = data;
      },
      err => { console.error(err) }
    );
    this.ticket.subject = "";
    this.ticket.description = "";
  }

  onClickCreateTicket() {
    // preparing the object to send to the server
    let sendObj = {
      ticket: this.ticket,
      guest: null
    };
    if (this.user.type == 'E') {
      if (this.typeCustomer == 'Guest') {
        sendObj.guest = {
          firstName: this.customer.firstName,
          lastName: this.customer.lastName,
          email: this.customer.email
        }
      }
    }
    this.ticketService.createTicket(sendObj).subscribe(
      (data: any) => {
        let creationResult = data;
        console.log("data", data);
        switch (creationResult.message) {
          case '0': {
            this.toaster.pop('error', 'Qme', 'Missing information. Please try again');
            break;
          }
          case '1': {
            console.log("message = 1");
            this.message.clearMessage();
            this.message.setMessage('success', 'Qme', 'The ticket number ' + creationResult.ticketNumber + ' was successfully created!');
            this.router.navigate(['/home']);
            break;
          }
        }
      },
      err => { console.error(err); }
    );
  }

  onKeyup(event: KeyboardEvent) {
    this.studentInformation = "";
    this.studentService.getStudentByStudentNumber({ studentNumber: this.customer.studentNumber }).subscribe(
      (data: any) => {
        if (data != null) {
          this.ticket.studentId = data._id;
          this.userService.getUserById({ _id: data.userId }).subscribe(
            (data2: any) => {
              if (data2 != null) {
                this.studentInformation = data2.firstName + " " + data2.lastName + ", program: " + data.program;
              }
            }
          )
        }
      }
    )
  }

}
