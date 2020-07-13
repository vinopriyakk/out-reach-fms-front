import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File,
  url: SafeUrl,
  name: String
}

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();

  @HostBinding("style.background") private background = "#eee";

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';

    let files: FileHandle[] = [];
    for (let i = 0; i < evt.dataTransfer.files.length; i++) {
      const file = evt.dataTransfer.files[i];
      const name = evt.dataTransfer.files[i].name;
      let ext = name.split('.')[1];
      if (ext == 'xls' || ext == 'xlsx') {
        const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
        files.push({ file, url, name });
      }else{
        alert("Supported file type is excel");
      }
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }

}
