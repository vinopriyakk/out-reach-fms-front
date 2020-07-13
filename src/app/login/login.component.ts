import { BasicAuthenticationService } from './../service/basic-authentication.service';
import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../interface-module/auth';
import { LoginResponse } from '../interface-module/loginresponse';
import { AuthDataService } from '../service/data/auth-data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: '';
  password: '';
  role: '';
  userId: '';
  name: '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;
  loginResponse: LoginResponse;

  // Router
  // Angular.giveMeRouter
  // Dependency Injection
  constructor(private router: Router,
              private hardcodedAuthenticationService: HardcodedAuthenticationService,
              private basicAuthenticationService: BasicAuthenticationService,
              private authDataService: AuthDataService,
              private cookieService: CookieService
              ) { }

  ngOnInit() {
  }

  handleLogin() {
    const auth: Auth = {
      username: this.username,
      password: this.password,
      role: this.role,
      userId: this.userId,
      name: this.name
    };

    this.authDataService.executeAuthBeanService(auth).subscribe( (data) => {

     console.log('data' + data);
     if (data !== null && data.role !== null) {
      console.log('success in component');
      this.cookieService.set('userRole', data.role);
      this.cookieService.set('userId', data.userId);
      console.log('Cookie' + this.cookieService.get('userRole'));
      console.log('Cookie userId' + this.cookieService.get('userId'));

      this.router.navigate(['welcome']);
      this.invalidLogin = false;
    } else {
      console.log('fail in component');
      this.invalidLogin = true;
    }
    },
    error => {
      console.log(error);
      this.invalidLogin = true;
    }
    );
  }
}
