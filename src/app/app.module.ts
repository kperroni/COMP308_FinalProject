// Libs
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular5-toaster';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// Services
import { UserService } from './modules/user/user.service';
import { TicketService } from './modules/ticket/ticket.service';
import { ServiceService } from './modules/service/service.service';
import { MessageService } from './shared/services/messages/message.service';
import { StudentService } from './modules/student/student.service';
import { GuestService } from './modules/guest/guest.service';
import { QueueService } from './modules/queue/queue.service';
import { CounterService } from './modules/counter/counter.service';

// Socket IO
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

// Components
import { HomeComponent } from './modules/misc/components/home/home.component';
import { AboutComponent } from './modules/misc/components/about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/components/login.component';
import { CreateTicketComponent } from './modules/ticket/components/create-ticket/create-ticket.component';
import { ViewActiveTicketsComponent } from './modules/ticket/components/view-active-tickets/view-active-tickets.component';
import { CurrentTicketComponent } from './modules/ticket/components/current-ticket/current-ticket.component';
import { ViewPrecedingTicketsComponent } from './modules/ticket/components/view-preceding-tickets/view-preceding-tickets.component';
import { ViewServicesComponent } from './modules/service/view-services/view-services.component';
import { StartShiftComponent } from './modules/service-provider/components/shift/shift.component';
import { ServiceProviderService } from './modules/service-provider/service-provider.service';
import { ViewStudentTicketComponent } from './modules/ticket/components/view-student-ticket/view-student-ticket.component';
import { GuestActiveTicketComponent } from './modules/guest/components/guest-active-ticket/guest-active-ticket.component';

// Header & Footer
import { HeaderComponent } from './shared/layout/components/header/header.component';
import { FooterComponent } from './shared/layout/components/footer/footer.component';

const appRoutes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createTicket', component: CreateTicketComponent },
  { path: 'getCurrentTicket', component: CurrentTicketComponent },
  { path: 'viewActiveTickets', component: ViewActiveTicketsComponent },
  { path: 'viewPrecedingTickets', component: ViewPrecedingTicketsComponent },
  { path: 'viewActiveTickets', component: ViewActiveTicketsComponent },
  { path: 'viewServices', component: ViewServicesComponent },
  { path: 'shift', component: StartShiftComponent },
  { path: 'viewStudentTicket', component: ViewStudentTicketComponent },
  { path: 'guestActiveTicket/:ticketNumber', component: GuestActiveTicketComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    CreateTicketComponent,
    CurrentTicketComponent,
    ViewActiveTicketsComponent,
    ViewPrecedingTicketsComponent,
    ViewServicesComponent,
    ViewServicesComponent,
    StartShiftComponent,
    ViewStudentTicketComponent,
    GuestActiveTicketComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ToasterModule,
    SocketIoModule.forRoot(config)
  ],

  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    UserService,
    TicketService,
    ServiceService,
    StudentService,
    GuestService,
    ServiceProviderService,
    QueueService,
    CounterService,
    MessageService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
