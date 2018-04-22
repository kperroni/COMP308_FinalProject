import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { UserService } from '../../../user/user.service';
import { StudentService } from '../../../student/student.service';
import { Router, NavigationStart, Params, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ServiceService } from '../../../service/service.service';
import { tick } from '@angular/core/testing';
import { Services } from '@angular/core/src/view';
import { MessageService } from '../../../../shared/services/messages/message.service';

@Component({
  selector: 'app-view-student-ticket',
  templateUrl: './view-student-ticket.component.html',
  styleUrls: ['./view-student-ticket.component.scss']
})
export class ViewStudentTicketComponent implements OnInit {

  private activeTicket: any;

  constructor(private ticketService: TicketService,
    private userService: UserService,
    private studentService: StudentService,
    private sService: ServiceService,
    private router: Router,
    private message: MessageService) { }

  ngOnInit() {

    this.userService.getActiveUser().subscribe(
      (user: any) => {

        if (user !== null && user.type == 'S') {
          this.studentService.getStudentByUserId({ userId: user._id }).subscribe(
            (student: any) => {

              this.ticketService.getStudentTicket({ body: student }).subscribe(
                (studentTicket: any) => {
                  
                  if (studentTicket === null) {
                    console.log('no ticket');
                  } else {
                    console.log(studentTicket);
                    studentTicket.studentNumber = student.studentNumber;
                    this.activeTicket = studentTicket;
                    this.sService.getServiceById({ _id: studentTicket.serviceId }).subscribe(
                      (service: any) => {
  
                        this.ticketService.getActiveTicketsInQueue({ queueId: service.queueId }).subscribe(
                          (precedingTickets: any) => {
  
                            this.activeTicket.ticketCount = 0;
  
                            var minutes = 0;
  
                            for (var i = 0; i < precedingTickets.length; i++) {
  
                              if ((precedingTickets[i]._id != studentTicket._id)
                                && (precedingTickets[i].weight > studentTicket.weight
                                  || (precedingTickets[i].weight == precedingTickets[i].weight
                                    && precedingTickets[i].creationTime < studentTicket.creationTime
                                  ))) {
  
                                ++this.activeTicket.ticketCount;
  
                                minutes += parseInt("" + precedingTickets[i].services.averageMinutes);
                              }
  
                              this.activeTicket.hours = parseInt("" + (minutes / 60));
                              this.activeTicket.minutes = minutes % 60;
  
                            }
                          },
                          err => { console.error(err); }
                        );
                      },
                      err => { console.error(err); }
                    );
                  }
                },
                err => { console.error(err); }
              );
            });
        }
        else {
          this.router.navigateByUrl('/login');
        }
      },
      err => {
        console.error(err);
        this.router.navigateByUrl('/login');
      }
    );
  }

  onCancelTicket() {
    this.ticketService.updateToCancel({ id: this.activeTicket._id })
      .subscribe((data: any) => {
        this.message.setMessage('warning', 'Qme', 'Your Ticket has been canceled!');
        this.router.navigate(['/home']);
      }
      );
  }
}
