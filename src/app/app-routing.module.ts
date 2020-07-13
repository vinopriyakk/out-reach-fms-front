import { RouteGuardService } from './service/route-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { EventsComponent } from './events/events.component';
import { ReportsComponent } from './reports/reports.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import { RolesComponent } from './roles/roles.component';
import { QuestionComponent } from './question/question.component';
import { FeedbackQuestionComponent } from './feedbackquestions/feedback.component';
import { FeedbackSubmissionComponent } from './feedback-submission/feedback-submission.component';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';


const routes: Routes = [
  { path: '', component: LoginComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/:eventId', component: EventdetailComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'uploadexcel', component: UploadExcelComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService] },
  { path: 'configuration', component: RolesComponent },
  { path: 'feedbackqus', component: FeedbackQuestionComponent },
  { path: 'feedbackForm',  component: FeedbackSubmissionComponent },
  { path: 'question', component: QuestionComponent },
 { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
