import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { File } from 'src/app/models/file.model';

@Component({
  selector: 'app-file',
  templateUrl: 'file-list.component.html'
})
export class FileListComponent implements OnInit {

  selectedFile: File;
  feedback: any = {};

  get fileList(): File[] {
    return this.fileService.fileList;
  }

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.fileService.load(null);
  }

  select(selected: File): void {
    this.selectedFile = selected;
  }

  delete(file: File): void {
    if (confirm('Are you sure?')) {
      this.fileService.delete(file).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
         }
      );
    }
  }
}
