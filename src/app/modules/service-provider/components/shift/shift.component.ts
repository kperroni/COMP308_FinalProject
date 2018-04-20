import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../../queue/queue.service';
import { CounterService } from '../../../counter/counter.service';
import { ServiceProviderService } from '../../service-provider.service';
import { MessageService } from '../../../../shared/services/messages/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class StartShiftComponent implements OnInit {

  queues: any = [];
  queueDropdownLegend: String = 'Select a Queue';
  selectedQueue: String = '';

  showCounters = false;
  counters: any = [];
  counterDropdownLegend: String = 'Select a Counter';
  selectedCounter: String = '';

  disableStartShiftButton = true;

  shiftStarted = false;

  constructor(
    private queueService: QueueService,
    private counterService: CounterService,
    private serviceProviderService: ServiceProviderService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.onCheckShift();

    this.queueService.getQueues()
      .subscribe(
        (data: any[]) => this.queues = data
      );
  }

  onQueueSelected(queue) {
    this.queueDropdownLegend = queue.name;
    this.counterService.getQueueCounters(queue._id)
      .subscribe(
        (data: any[]) => this.counters = data
      );
    this.showCounters = true;
    this.selectedQueue = queue._id;
  }

  onCounterSelected(counter) {
    this.counterDropdownLegend = counter.counterName;
    this.disableStartShiftButton = false;
    this.selectedCounter = counter._id;
  }

  onStartShift() {
    this.serviceProviderService.createShift({ queueId: this.selectedQueue, counterId: this.selectedCounter })
      .subscribe(
        (data: any) => {
          console.log(data.message);
          this.messageService.setMessage('success', 'Qme', data.message);
          this.router.navigate(['/home']);
        }
      );
  }

  onCheckShift() {
    this.serviceProviderService.checkShift()
    .subscribe(
      (data: any[]) => {
        if (data.length > 0) {
         this.shiftStarted = true;
         console.log(data);
        }
      }
    );
  }

  onFinishShift() {
    this.serviceProviderService.finishShift().
    subscribe(
      (data: any) => {
        this.messageService.setMessage('success', 'Qme', data.message);
        this.router.navigate(['/home']);
      }
    );
  }
}
