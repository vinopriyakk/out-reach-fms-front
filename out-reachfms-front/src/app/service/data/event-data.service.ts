import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Event } from './../../interface-module/event';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {
  private event: Event[];
  serviceUrl: string = environment.apiURL;
  private url: string = this.serviceUrl ;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public executeEventBeanService() {
    const httpHeaders = new HttpHeaders().set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*').append('userId', this.cookieService.get('userId'));
    return this.http.get<Event[]>(this.url + 'events', { headers: httpHeaders});
    console.log(this.url);
  }

  public executeEventDetailsBeanService(eventid: string) {
    const httpHeaders = new HttpHeaders().set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.http.get<Event>(this.url + 'events' + '/' + eventid , { headers: httpHeaders});
    console.log(this.url);
  }
  sendRemainderEmailForFeedback(){
    return this.http.get(this.url + 'events/send-remainder-mail');
  }
  sendEmailForFeedback(eventId: any){
    return this.http.get(this.url + '/send-remainder-mail?eventId=' + eventId);
  }
  downloadFileExcel(filename: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json; charset=utf-8')
    .append('userId', this.cookieService.get('userId'));
    return this.http.get(this.url + 'event/report/download?filename=' + filename, {
      headers,
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', this.serviceUrl + 'events/upload/excel', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
