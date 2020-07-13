import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interface-module/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {
  serviceUrl: string = environment.apiURL;
  private url: string = this.serviceUrl + 'users';
  constructor(private http: HttpClient) { }

  public addUser(user: User) {
    const httpHeaders = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post<any>(this.url, user, { headers: httpHeaders});
  }

  public getUser() {
    const httpHeaders = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<User[]>(this.url, { headers: httpHeaders});
  }

  public deleteUser(email: any) {
    const httpHeaders = new HttpHeaders().set('Accept', 'application/json');
    return this.http.delete<any>(this.url  + '/' + email, { headers: httpHeaders});
  }

  downloadFileExcel(filename: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/ms-excel; charset=utf-8');
    return this.http.get(this.url + '/download?filename=' + filename, {
      headers,
      observe: 'response',
      responseType: 'blob'
    });
  }
}
