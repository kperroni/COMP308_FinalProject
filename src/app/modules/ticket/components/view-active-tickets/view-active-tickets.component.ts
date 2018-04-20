import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { Router, NavigationStart } from '@angular/router';
import { UserService } from '../../../user/user.service';
import { ServiceProviderService } from '../../../service-provider/service-provider.service';
import { StudentService } from '../../../student/student.service';

@Component({
  selector: 'app-view-active-tickets',
  templateUrl: './view-active-tickets.component.html',
  styleUrls: ['./view-active-tickets.component.scss']
})
export class ViewActiveTicketsComponent implements OnInit {

  private activeTickets: any;
  private currentShift: any;

  constructor(private ticketService: TicketService,
    private userService: UserService,
    private serviceProviderService: ServiceProviderService,
    private router: Router,
    private studentService: StudentService) { }

  ngOnInit() {

    this.ticketService.getActiveTicketsSocket().subscribe(data => {
      this.ngOnInit();
    });

    this.userService.getActiveUser().subscribe(
      (user: any) => {
        if (user !== null && user.type == 'E') {
          this.serviceProviderService.getProviderByUserId({ userId: user._id }).subscribe(
            (employee: any) => {
              this.serviceProviderService.checkShift().subscribe(
                (shifts: any) => {
                  this.currentShift = shifts[0];
                  if (this.currentShift !== null) {
                    this.ticketService.getActiveTicketsInQueue(this.currentShift).subscribe(
                      (tickets: any) => {
                        this.activeTickets = tickets;
                        this.activeTickets.forEach(ticket => {
                          this.studentService.getStudentByStudentId({ studentId: ticket.studentId }).subscribe(
                            (student2: any) => {
                              if (student2 !== null) {
                                ticket.studentNumber = student2.studentNumber;
                              }
                              else {
                                console.log("student not found");
                              }
                            }, err => { console.error(err); }
                          );
                        });
                      },
                      err => { console.error(err); }
                    );
                  }
                },
                err => { console.error(err); }
              );
            },
            err => { console.error(err); }
          );
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

  onClickTicket(ticketNumber) {
    //this.ticketService.getTicketByTicketNumber(ticketNumber);
  }
}