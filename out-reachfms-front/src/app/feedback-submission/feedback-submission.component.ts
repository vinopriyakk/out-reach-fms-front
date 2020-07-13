import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../service/feedback.service';

@Component({
  selector: 'app-feedback-submission',
  templateUrl: './feedback-submission.component.html',
  styleUrls: ['./feedback-submission.component.css']
})
export class FeedbackSubmissionComponent implements OnInit {

  public eventId: string;
  public employeeId: string;
  public secretCode: string;
  public questionType: String;
  public feedbackChoiceAnswers: any;
  public feedbackRatingQuestion: any;
  public eventName: string;
  public choiceAnswer: string;
  public rating: any;
  public likes: string = '';
  public dislikes: string = '';
  public responseMessage: string;

  public grinHeart: string = 'far';
  public smile: string = 'far';
  public meh: string = 'far';
  public frown: string = 'far';
  public angry: string = 'far';

  constructor(private service: FeedbackService, private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {
      this.eventId = params['eventId'];
      this.employeeId = params['employeeId'];
      this.secretCode = params['secretCode'];
    });
  }

  ngOnInit(): void {
    this.getFeedbackForm();
    setTimeout(function () {
      (<any>$('.collapse')).collapse();
    }, 100);
  }

  getFeedbackForm() {
    this.service.getFeedbackForm(this.eventId, this.employeeId, this.secretCode).subscribe(
      (data: any) => {
        this.questionType = data.status;
        this.eventName = data.eventName;
        if (data.status == 'PC') {
          this.feedbackRatingQuestion = data.feedbackRatingQuestion;
          console.log(data.feedbackRatingQuestion)
        } else if (data.status == 'NA' || data.status == 'UN') {
          this.feedbackChoiceAnswers = data.feedbackChoiceAnswers;
          console.log(data.feedbackChoiceAnswers)
        } else if (data.status == 'COMPLETED') {
          this.responseMessage = data.message;
        } else {
          alert(data.message);
          this.router.navigate(['login']);
        }
        setTimeout(function () {
          (<any>$('.collapse')).collapse();
        }, 100);
      },
      error => {
        console.log(error.error.message);
      }
    )
  }

  selectAnswer(id, answer) {
    this.choiceAnswer = answer;
  }

  saveChoiceAnswer() {
    if (this.choiceAnswer != undefined) {
      let data = {
        'employeeId': this.employeeId, 'eventId': this.eventId, 'feedbackType': this.questionType, 'questionId': this.feedbackChoiceAnswers[0].question.id,
        'choiceAnswer': this.choiceAnswer, 'rating': null, 'likeAnswer': null, 'dislikeAnswer': null, 'secretCode': this.secretCode
      };

      this.service.saveFeedbackAnswer(data).subscribe(
        (data: any) => {
          if (data.status == 'SUCCESS') {
            this.responseMessage = 'COMPLETED';
            this.responseMessage = data.message;
            window.location.reload();
          }
        },
        error => {
          console.log(error.error.message);
        }
      )
    } else {
      alert("Please provide your feedback response before submit");
    }
  }

  saveRatingAnswer() {
    if (this.likes != '' && this.dislikes != '' && this.rating != undefined) {
      let data = {
        'employeeId': this.employeeId, 'eventId': this.eventId, 'feedbackType': this.questionType, 'questionId': this.feedbackRatingQuestion.id,
        'choiceAnswer': null, 'rating': this.rating, 'likeAnswer': this.likes, 'dislikeAnswer': this.dislikes, 'secretCode': this.secretCode
      };

      this.service.saveFeedbackAnswer(data).subscribe(
        (data: any) => {
          if (data.status == 'SUCCESS') {
            this.responseMessage = 'COMPLETED';
            this.responseMessage = data.message;
            window.location.reload();
          }
        },
        error => {
          console.log(error.error.message);
        }
      )
    } else {
      if(this.rating == undefined){
        alert("Please provide your overall rating of the event");
      }else if (this.likes == '') {
        alert("Please fill the first text box");
      } else {
        alert("Please fill the second text box");
      } 
    }
  }

  selectRating(rating: number, smiley: string) {
    this.rating = rating;
    if (rating == 1) {
      this.grinHeart = 'far';
      this.smile = 'far';
      this.meh = 'far';
      this.frown = 'far';
      this.angry = smiley;
    } else if (rating == 2) {
      this.grinHeart = 'far';
      this.smile = 'far';
      this.meh = 'far';
      this.frown = smiley;
      this.angry = 'far';
    } else if (rating == 3) {
      this.grinHeart = 'far';
      this.smile = 'far';
      this.meh = smiley;
      this.frown = 'far';
      this.angry = 'far';
    } else if (rating == 4) {
      this.grinHeart = 'far';
      this.smile = smiley;
      this.meh = 'far';
      this.frown = 'far';
      this.angry = 'far';
    } else {
      this.grinHeart = smiley;
      this.smile = 'far';
      this.meh = 'far';
      this.frown = 'far';
      this.angry = 'far';
    }
  }

  reset() {
    window.location.reload();
  }

}
