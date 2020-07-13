import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EventDataService } from '../service/data/event-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {

  isPmoOrPoc = true;
  public userRole: any;
  public event: any;
  eventId: any;

  constructor(private cookieService: CookieService,
              private service: EventDataService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userRole = this.cookieService.get('userRole');
    this.eventId = this.route.snapshot.params.eventId;
    this.service.executeEventDetailsBeanService(this.eventId).subscribe((data) => {
    this.event = data;
    this.roleAuth(this.userRole);
    });
  }

  roleAuth(userRole: string){
    if (userRole === 'PMO') {
      this.isPmoOrPoc = false;
    }
    else if (userRole === 'POC') {
      this.isPmoOrPoc = false;
    }
  }
  sendEmailForFeedback(){
    // alert(this.eventId);
    this.service.sendEmailForFeedback(this.eventId).subscribe(
      (data: any) => {
        alert(data.message);
      },
      error => {
        console.log(error.error.message);
      }
    );
  }
}
