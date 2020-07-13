import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  serviceUrl: string = environment.apiURL;
  private url: string = this.serviceUrl ;

  saveUNNAQuestions(inputs: any[], UNNAQuestion: any, participationType: string): any {
    const body = new HttpParams().
      set('question', UNNAQuestion).set('participationType', participationType)
      .set('answers', inputs.join(', '));
    return this.http.post(this.serviceUrl + 'feedback/unregister-not-attended-question', body);

  }

  constructor(private http: HttpClient) { }

  addRatingQuestion(ratingQues: string, likeQues: string, dislikeQues: string) {
    const body = new HttpParams()
      .set('ratingQues', ratingQues)
      .set('likeQues', likeQues)
      .set('dislikeQues', dislikeQues);
    return this.http.post(this.serviceUrl + 'feedback/rating-question', body);
  }

  getFeedbackQuestions(page: number){
    return this.http.get(this.serviceUrl + 'feedback/questions?page=' + page );
  }

  getFeedbackForm(eventId, employeeId, secretCode) {
    const httpHeaders = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<any>(this.url +  'feedback/form?eventId=' + eventId + '&employeeId=' + employeeId + '&secretCode=' + secretCode,
     { headers: httpHeaders });
  }

  saveFeedbackAnswer(data: any){
    const httpHeaders = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post<any>(this.url + 'feedback/submit', data, { headers: httpHeaders});
  }
}
