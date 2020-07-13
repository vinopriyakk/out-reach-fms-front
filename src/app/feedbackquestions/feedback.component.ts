import { OnInit, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild, Component, ViewRef } from '@angular/core';
import { FeedbackService } from "../service/feedback.service";
import { AddAnswerComponentComponent } from '../add-answer-component/add-answer-component.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackQuestionComponent implements OnInit {

  public feedbackQuestion: boolean = true;
  public addQuestionDiv: boolean = false;
  public ratingQuestion: boolean = false;
  public choiceQuestion: boolean = true;
  public isCheckNA_UN: boolean = true;
  public isCheckPC: boolean = false;
  public answerInputs: any;
  public i: any;
  public isCheckRadioPC: string = '';
  public isCheckRadioNA: string = '';
  public isCheckRadioUN: string = 'UN';
  public ratingQues: string = '';
  public likeQues: string = '';
  public dislikeQues: string = '';
  public array_of_items: any[];
  public UNNAQuestion: any;
  public participationType: string;

  public page: number = 0;
  public feedbackQuestions: Array<any>;
  public pages: Array<number>;

  // @ViewChild('div') div: ElementRef;

  @ViewChild("viewContainerRef", { read: ViewContainerRef })
  container: ViewContainerRef;

  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<AddAnswerComponentComponent>>()

  constructor(private feedbackService: FeedbackService, private _cfr: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.participationType = this.isCheckRadioUN;
    this.getFeedbackQuestions();
    setTimeout(function () {
      (<any>$('.collapse')).collapse();
    }, 100);
  }

  setPage(i: number, event: any) {
    event.preventDefault();
    this.page = i;
    this.getFeedbackQuestions();
  }

  getFeedbackQuestions() {
    this.feedbackService.getFeedbackQuestions(this.page).subscribe(
      (data: any) => {
        this.feedbackQuestions = data['content'];
        this.pages = new Array(data['totalPages']);
      },
      error => {
        console.log(error.error.error);
      }
    );
  }

  // private selectedLink: string = "Male";

  setradio(e: string): void {
    this.participationType = e;
    // this.selectedLink = e;
    if (e == 'UN' || e == 'NA') {
      this.isCheckNA_UN = true;
      this.choiceQuestion = true;
      this.isCheckPC = false;
      this.ratingQuestion = false;
    } else {
      this.isCheckNA_UN = false;
      this.choiceQuestion = false;
      this.isCheckPC = true;
      this.ratingQuestion = true;
    }
    // alert(e);

  }

  // isSelected(name: string): boolean {

  //   if (!this.selectedLink) {
  //     return false;
  //   }

  //   return (this.selectedLink === name);
  // }

  showHideDiv(div: String) {
    this.getFeedbackQuestions();
    if (div == 'feedbackQuestion') {
      this.feedbackQuestion = false;
      this.addQuestionDiv = true;
    } else {
      this.feedbackQuestion = true;
      this.addQuestionDiv = false;
      this.isCheckNA_UN = true;
      this.isCheckPC = false;
      this.isCheckRadioUN = 'UN';
      this.setradio('UN');
    }
    setTimeout(function () {
      (<any>$('.collapse')).collapse();
    }, 100);
  }

  saveRatingQuestion() {
    if (this.ratingQues == '') {
      alert("Please enter rating question");
    } else if (this.likeQues == '') {
      alert("Please enter like question");
    } else if (this.dislikeQues == '') {
      alert("Please enter dislike question");
    } else {
      this.feedbackService.addRatingQuestion(this.ratingQues, this.likeQues, this.dislikeQues).subscribe(
        (data: any) => {
          if (data.status == 'SUCCESS') {
            alert(data.message);
          }
          this.ratingQues = '';
          this.likeQues = '';
          this.dislikeQues = '';
        },
        error => {
          console.log(error.error.message);
        }
      )
    }
  }


  SaveNAUN_answer(): any {
    if (this.UNNAQuestion == '' || this.UNNAQuestion == undefined) {
      alert("Please enter question");
    } else {
      if ($('.inputAnswerNAUN').length == 0) {
        alert("Please add answer field");
      } else {
        let inputs = [];
        let validate = true;
        let x = $(".inputAnswerNAUN").val();
        // inputs = new Array($('.inputAnswerNAUN').length);
        $('.inputAnswerNAUN').each(function (k, v) {
          if ($(v).val() == '') {
            alert("Please fill the " + (k + 1) + " answer field");
            validate = false;
            return false;
          }
          inputs.push($(v).val());
        });
        // console.log(inputs);
        if (validate) {
          this.feedbackService.saveUNNAQuestions(inputs, this.UNNAQuestion, this.participationType).subscribe(
            (data: any) => {
              if (data.status == 'SUCCESS') {
                alert(data.message);
                $('.inputAnswerNAUN').each(function (k, v) {
                  $(this).val('');
                });
              }
            },
            error => {
              console.log(error.error.message);
            }
          );
        }
      }
    }
  }

  addComponent() {
    var comp = this._cfr.resolveComponentFactory(AddAnswerComponentComponent);
    var expComponent = this.container.createComponent(comp);
    expComponent.instance._ref = expComponent;
  }

  // addElement(){
  //   const div = this.renderer.createElement('div');
  //   this.renderer.setAttribute(div, 'class', 'row my-1');

  //   const div1inner1 = this.renderer.createElement('div');
  //   this.renderer.setAttribute(div1inner1, 'class', 'form-line col-md-2');

  //   const div1inner2 = this.renderer.createElement('div');
  //   this.renderer.setAttribute(div1inner2, 'class', 'col-md-12');

  //   const div2inner1 = this.renderer.createElement('div');
  //   this.renderer.setAttribute(div2inner1, 'class', 'form-line col-md-8');

  //   const div2inner2 = this.renderer.createElement('div');
  //   this.renderer.setAttribute(div2inner2, 'class', 'col-md-12');

  //   const div3inner1 = this.renderer.createElement('div');
  //   this.renderer.setAttribute(div3inner1, 'class', 'form-line col-md-2');

  //   const button = this.renderer.createElement('button');
  //   button.innerHTML = 'Delete Answer';
  //   this.renderer.setAttribute(button, 'class', 'mx-3 btn btn-warning text-uppercase');
  //   this.renderer.setAttribute(button, 'style', 'font-size: 12px;font-weight: bold;color: #fff;');

  //   div1inner2.innerHTML = "Answer";
  //   this.renderer.appendChild(div1inner1, div1inner2);

  //   const inputText = this.renderer.createElement('input');
  //   this.renderer.setAttribute(inputText, 'type', 'text');
  //   this.renderer.setAttribute(inputText, 'class', 'form-control');
  //   this.renderer.setAttribute(inputText, 'placeholder', 'Add Answer');

  //   this.renderer.appendChild(div2inner2, inputText);
  //   this.renderer.appendChild(div2inner1, div2inner2);

  //   this.renderer.appendChild(div3inner1, button);


  //   this.renderer.appendChild(div, div1inner1);
  //   this.renderer.appendChild(div, div2inner1);
  //   this.renderer.appendChild(div, div3inner1);

  //   this.renderer.appendChild(this.div.nativeElement, div);
  //   // p.innerHTML = "add new"
  //   // this.renderer.appendChild(this.div.nativeElement, p)

  //   // const li = this.renderer.createElement('li');
  //   //  const text = this.renderer.createText('Click here to add li');
  //   //  this.renderer.appendChild(li, text);
  //   // //  this.renderer.appendChild(this.div.nativeElement, p)
  //   // this.renderer.setAttribute(li, 'class','btn btn-primary');

  //   //  this.renderer.appendChild(this.div.nativeElement, li);
  //   //  this.renderer.appendChild(this.div.nativeElement, p)
  // }

}
