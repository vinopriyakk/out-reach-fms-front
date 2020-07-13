import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Auth } from './../../interface-module/auth';
import { LoginResponse } from 'src/app/interface-module/loginresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  serviceUrl: string = environment.apiURL;
  private url: string = this.serviceUrl + 'users/login';
  constructor(private http: HttpClient) { }

  public executeAuthBeanService(auth: Auth) {
    const httpHeaders = new HttpHeaders().set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.http.post<any>(this.url, auth, { headers: httpHeaders});
  }

}
