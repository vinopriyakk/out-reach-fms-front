import { Injectable } from '@angular/core';
import { AuthDataService } from '../service/data/auth-data.service';
import { Auth } from '../interface-module/auth';
import { LoginResponse } from '../interface-module/loginresponse';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {
  public tblusername: any;
  public role: any;
  public userId: any;
  loginResponse: LoginResponse;

  constructor(private service: AuthDataService) { }

   /*authenticate(auth: Auth): any {
    this.service.executeAuthBeanService(auth).subscribe(
      data => {
       console.log('Response:' + data);
       this.loginResponse.role = data.role;
       this.loginResponse.userId = data.userId;
       console.log('Response:' + this.loginResponse);
       return this.loginResponse;
       // console.log(this.loginResponse );
       // this.router.navigate(['welcome']);
     // this.invalidLogin = false;
    },
    error => {
      console.log(error);
      // this.invalidLogin = true;
    });
     // console.log(data);
     // this.tblusername = data.username;
     // this.role = data.role;

      // console.log('user' + this.tblusername);
      // console.log('role---' + this.role);
    // });
  /*  if (username === this.tblusername && password === this.tblpassword) {
      sessionStorage.setItem('authenticaterUser', this.tblusername);
      return true;
    }
    return false;*/
  // }


  authenticate(auth: Auth): any {this.service.executeAuthBeanService(auth).subscribe(
      data => {
       console.log('Response:' + data);
     //  this.loginResponse.role = data.role;
    //   this.loginResponse.userId = data.userId;
      // console.log('Response:' + this.loginResponse);
     //  return this.loginResponse;
       // console.log(this.loginResponse );
       // this.router.navigate(['welcome']);
     // this.invalidLogin = false;
       console.log(data);
     // this.tblusername = data.username;
       this.role = data.role;
       this.userId = data.userId;
       console.log('role-----' + this.role);
       console.log('userId-----' + this.userId);
       if (this.role != null && this.userId != null) {
        console.log('success');
        sessionStorage.setItem('authenticaterUser', this.role);
        return true;
      }
       console.log('failure');
       return false;
    });
    /*error => {
      console.log(error);
      // this.invalidLogin = true;
    });8/

      // console.log('user' + this.tblusername);
      // console.log('role---' + this.role);
    // });
  /*  if (username === this.tblusername && password === this.tblpassword) {
      sessionStorage.setItem('authenticaterUser', this.tblusername);
      return true;
    }
    return false;*/
  }


  isUserLoggedIn() {
    // tslint:disable-next-line:prefer-const
    let user = sessionStorage.getItem('authenticaterUser');
    console.log('user---' + user);
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem('authenticaterUser');
  }

}
