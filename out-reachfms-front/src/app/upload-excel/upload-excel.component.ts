import { Component, OnInit } from '@angular/core';
import { FileHandle } from '../drag-and-drop.directive';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDataService } from '../service/data/event-data.service';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css']
})
export class UploadExcelComponent implements OnInit {

  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;

  constructor(private service: EventDataService) { }

  ngOnInit(): void {
  }

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.service.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          // this.fileInfos = this.authService.getFiles();
          this.message = 'Excel Upload completed';
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

  // name = 'Angular 5';
  // files: FileHandle[] = [];

  // filesDropped(files: FileHandle[]): void {
  //   this.files = files;
  // }

  // upload(): void {
  //   //get image upload file obj;
  //   console.log(this.files[0].url);
  //   this.authService.uploadExcelFile(this.files).subscribe(
  //     (data:any) => {

  //     },
  //     error => {

  //     }
  //   );
  // }

}
