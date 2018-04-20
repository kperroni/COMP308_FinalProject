import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { ToasterService } from 'angular5-toaster';

@Component({
  selector: 'app-view-services',
  templateUrl: './view-services.component.html',
  styleUrls: ['./view-services.component.scss']
})
export class ViewServicesComponent implements OnInit {

  private services: any[];
  private servicesUpdated: any;

  constructor(private serviceService: ServiceService, private toaster: ToasterService) { }

  ngOnInit() {
    this.serviceService.getServices().subscribe(
      (data: any[]) => {
        this.services = data;
      },
      err => { console.error(err); }
    );
  }

  onClickSave() {
    this.servicesUpdated = 0;
    this.services.forEach(service => {
      this.serviceService.updateService(service).subscribe(
        (data: any) => {
          this.servicesUpdated = this.servicesUpdated + 1;
        },
        err => { console.error(err); }
      );
    });
    this.toaster.pop('success', 'Qme', 'Services updated');
  }

}
