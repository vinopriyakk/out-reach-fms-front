import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.hardcodedAuthenticationService.logout();
    this.cookieService.delete('userRole');
  }

}
