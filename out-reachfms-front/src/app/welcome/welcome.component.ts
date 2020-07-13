import { WelcomeDataService } from './../service/data/welcome-data.service';
import { ActivatedRoute } from '@angular/router';
import { Dashboard } from './../interface-module/dashboard';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  public dashboard: Dashboard;
  public userRole: any;
  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService,
    private cookieService: CookieService) {

  }
  ngOnInit(){
    this.service.executeWelcomeBeanService().subscribe((data) => {
      console.log(data);
      console.log('Cookie2' + this.cookieService.get('userRole'));
      this.userRole = this.cookieService.get('userRole');
      this.dashboard = data;
    });

  }
}
