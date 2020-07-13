import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {
    serviceUrl: string = environment.apiURL;
    private url: string = this.serviceUrl ;
    constructor(private http: HttpClient, private cookieService: CookieService ) { }

   getEventReports(page: number) {
    let headers = new HttpHeaders();
    headers = headers.append('userId', this.cookieService.get('userId'));
    return this.http.get(this.url + 'events' + '?page=' + page , {
      headers
    });
  }

  downloadFileExcel(filename: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/ms-excel; charset=utf-8')
    .append('userId', this.cookieService.get('userId'));
    return this.http.get(this.url + 'event/report/download?filename=' + filename, {
      headers,
      observe: 'response',
      responseType: 'blob'
    });
  }
  sendReportExcelInEmail(emailId: string){
    return this.http.get(this.url + 'event/' + emailId + '/send-report');
  }
}
