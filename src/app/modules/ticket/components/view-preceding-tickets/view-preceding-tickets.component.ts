import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { UserService } from '../../../user/user.service';
import { Router, NavigationStart } from '@angular/router';
import { StudentService } from '../../../student/student.service';

@Component({
  selector: 'app-view-preceding-tickets',
  templateUrl: './view-preceding-tickets.component.html',
  styleUrls: ['./view-preceding-tickets.component.scss']
})
export class ViewPrecedingTicketsComponent implements OnInit {

  private precedingTickets: any;
  private activeStudent: any;

  constructor(private ticketService: TicketService,
    private userService: UserService,
    private studentService: StudentService,
    private router: Router) { }

  ngOnInit() {

    this.userService.getActiveUser().subscribe(
      (user: any) => {
        console.log(user);
        if (user !== null && user.type == 'S') {
          this.studentService.getStudentByUserId({ userId: user._id }).subscribe(
            (student: any) => {

              this.activeStudent = student;

              this.ticketService.viewPrecedingTickets({ body: student }).subscribe(
                (data: any) => {
                  this.precedingTickets = data;

                  console.log("yeh rah " + data);

                  this.precedingTickets.forEach(ticket => {
                    this.studentService.getStudentByUserId({ userId: ticket.studentId }).subscribe(
                      (student2: any) => {

                        if (student2 !== null) {
                          console.log(student2);
                          ticket.studentNumber = student2.studentNumber;
                        }
                      }, err => { console.error(err); });
                  });
                },
                err => { console.error(err); }
              );
            },
            err => { console.error(err); }
          );
        }
        else {
          this.router.navigateByUrl('/home');
        }
      },
      err => { console.error(err); }
    );
  }
}
