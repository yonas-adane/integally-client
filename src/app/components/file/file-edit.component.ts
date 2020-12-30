import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FileService } from '../../services/file.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { File } from 'src/app/models/file.model';

@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.component.html'
})
export class FileEditComponent implements OnInit {

  id: string;
  file: File;
  feedback: any = {};
  formHeader: string;

  fileUploadForm = new FormGroup({
    filename: new FormControl(''),
    file: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService) {
  }

  ngOnInit() {

    this.fileUploadForm = this.formBuilder.group({
      filename: ['',[Validators.required, Validators.minLength(6)]],
      file: ['',[Validators.required]]
    });

    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          
          if (id === 'new') { 
            this.formHeader = "New file";
            return of(new File()); 
          }

          this.formHeader = "Edit file";

          return this.fileService.findById(id);
        })
      )
      .subscribe(file => {
          this.file = file;
          this.feedback = {};
        }
      );
  }

  get f() { return this.fileUploadForm.controls; }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileUploadForm.get('file').setValue(file);
    }
  }

  onSubmit() {

    const formData = new FormData();

    formData.append('filename', this.fileUploadForm.get('filename').value);
    formData.append('file', this.fileUploadForm.get('file').value);

    console.log(formData);

    this.fileService.save(formData).subscribe(
      file => {
        this.file = file;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/files']);
        }, 1000);
      }
    );
  }

  cancel() {
    this.router.navigate(['/files']);
  }
}
