import { Component, OnInit } from '@angular/core';
import { ReportDataService } from '../service/data/report-data.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  constructor( private service: ReportDataService) { }
  public emailId: string;
  excelFileName = 'Report_details';
  public page: any = 0;
  public events: Event[];

  ngOnInit(): void {
    this.getEventReports();
  }
  sendReportExcelInEmail(){
    this.service.sendReportExcelInEmail(this.emailId).subscribe(
      (data: any) => {
        alert(data.message);
      },
      error => {
        console.log(error.error.message);
      }
    );
  }
  downloadFileExcel() {
    this.service.downloadFileExcel(this.excelFileName)
      .subscribe(response => {
        const filename = response.headers.get('filename');

        this.saveFile(response.body, filename);
      });
  }
  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], { type: 'application/ms-excel; charset=utf-8' });
    fileSaver.saveAs(blob, filename);
  }

  getEventReports() {
    this.service.getEventReports(this.page).subscribe(
      (data: any) => {
        console.log(data);
        this.events = data;
      },
      error => {
        console.log(error.error.message);
      }
    );
  }

}
