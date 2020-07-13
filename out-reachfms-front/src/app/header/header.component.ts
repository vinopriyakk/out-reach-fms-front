import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userRole: any;
  pmo = false;
  poc = false;
  hide = false;


  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.userRole = this.cookieService.get('userRole');
    this.roleAuth(this.userRole);
  }

  roleAuth(userRole: string){
    if (userRole === 'PMO') {
      this.pmo = true;
    }
    else if (userRole === 'POC') {
      this.poc = true;
    }
  }
}
