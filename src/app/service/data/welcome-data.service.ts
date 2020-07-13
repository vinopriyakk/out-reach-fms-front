import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Dashboard } from './../../interface-module/dashboard';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  private dashboard: Dashboard;
  serviceUrl: string = environment.apiURL;
  private url: string = this.serviceUrl + 'events/dashboard';
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public executeWelcomeBeanService() {
    const httpHeaders = new HttpHeaders().set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .append('userId', this.cookieService.get('userId'));
    return this.http.get<Dashboard>(this.url, { headers: httpHeaders});
    console.log(this.url);
  }

}
