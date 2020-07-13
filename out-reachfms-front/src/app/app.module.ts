import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { EventsComponent } from './events/events.component';
import { ReportsComponent } from './reports/reports.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import { RolesComponent } from './roles/roles.component';
import { QuestionComponent } from './question/question.component';
import { CookieService } from 'ngx-cookie-service';
import { FeedbackQuestionComponent } from './feedbackquestions/feedback.component';
import * as $ from 'jquery';
import { FeedbackSubmissionComponent } from './feedback-submission/feedback-submission.component';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { DragAndDropDirective } from './drag-and-drop.directive';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    HeaderComponent,
    EventsComponent,
    ReportsComponent,
    ConfigurationComponent,
    EventdetailComponent,
    RolesComponent,
    QuestionComponent,
    FeedbackQuestionComponent,
    UploadExcelComponent,
    FeedbackSubmissionComponent,
    DragAndDropDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
     {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService,
       multi: true}, CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
