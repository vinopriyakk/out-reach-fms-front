import { Component, OnInit } from '@angular/core';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-add-answer-component',
  templateUrl: './add-answer-component.component.html',
  styleUrls: ['./add-answer-component.component.css']
})
export class AddAnswerComponentComponent implements OnInit {

  public unique_key: number;
  public parentRef: FeedbackComponent;
  constructor() { }

  ngOnInit(): void {
  }

  _ref:any;   
  removeObject(){
    this._ref.destroy();
  }  
}
