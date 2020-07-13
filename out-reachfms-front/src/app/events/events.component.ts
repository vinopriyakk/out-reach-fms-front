import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDataService } from '../service/data/event-data.service';
import { Event } from './../interface-module/event';
import { CookieService } from 'ngx-cookie-service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: EventDataService,
    private cookieService: CookieService) { }
    public event: Event[];
    public userRole: any;
    isPmoOrPoc = true;

    excelFileName: any  = 'Event_Details';

  ngOnInit(){
    this.service.executeEventBeanService().subscribe((data) => {
      this.userRole = this.cookieService.get('userRole');
      console.log(data);
      this.event = data;
      this.roleAuth(this.userRole);
    });

  }
  getEventDetail(eventId) {
      // Redirect to Event Deatil Page
      this.router.navigate(['events', eventId]);
      console.log(eventId);
    }
    sendEmailForFeedback(){
      // alert(this.eventIdEmail);
      this.service.sendRemainderEmailForFeedback().subscribe(
        (data: any) => {
          alert(data.message);
        },
        error => {
          console.log(error.error.message);
        }
      );
    }
    roleAuth(userRole: string){
      if (userRole === 'PMO') {
        this.isPmoOrPoc = false;
      }
      else if (userRole === 'POC') {
        this.isPmoOrPoc = false;
      }
    }
  downloadFileExcel() {
    this.service.downloadFileExcel(this.excelFileName)
      .subscribe(response => {
        const filename = response.headers.get('filename');

        this.saveFile(response.body, filename);
      });
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fileSaver.saveAs(blob, filename);
  }
}
