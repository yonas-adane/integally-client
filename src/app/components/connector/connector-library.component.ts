import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { File } from 'src/app/models/file.model';
import { ConnectorService } from 'src/app/services/connector.service';
import { Connector } from 'src/app/models/connector.model';
import { Page } from 'src/app/models/page.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectorLibrary } from 'src/app/models/connector-library.model';
import { ConnectorLibraryService } from 'src/app/services/connector-library.service';

@Component({
  selector: 'app-connector-library',
  templateUrl: 'connector-library.component.html'
})
export class ConnectorLibraryComponent implements OnInit {

  connectorLibrary: ConnectorLibrary;
  selectedConnectorLibrary: ConnectorLibrary;
  feedback: any = {};

  connectorLibraryForm = new FormGroup({
    id: new FormControl(''),
    description: new FormControl(''),
    file: new FormControl('')
  });

  get connectorLibrariesPageable(): Page<ConnectorLibrary> {
    return this.connectorLibraryService.connectorLibrariesPageable;
  }

  constructor(  private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router, private connectorLibraryService: ConnectorLibraryService) {
  }

  ngOnInit() {

    this.connectorLibrary = new ConnectorLibrary();
    
    this.connectorLibraryForm = this.formBuilder.group({
      id: [''],
      description: [''],
      file: ['']
    });
    
    this.load();
  }

  load(): void {
    this.connectorLibraryService.load();
  }

  get f() { return this.connectorLibraryForm.controls; }


  select(selected: ConnectorLibrary): void {
    this.selectedConnectorLibrary = selected;
  }

  clearForm() {
    this.connectorLibraryForm.reset();
  }

  setForEdit(connectorLibrary: ConnectorLibrary){


    if (confirm('Are you sure?')) {

      this.f['id'].setValue(connectorLibrary.id);
      this.f['description'].setValue(connectorLibrary.description);
      this.f['file'].setValue(connectorLibrary.file);

    }

  }

  delete(connectorLibrary: ConnectorLibrary): void {
    if (confirm('Are you sure?')) {
      this.connectorLibraryService.delete(connectorLibrary).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load();
            this.feedback = null;
          }, 1000);
         }
      );
    }
  }


  onSubmit() {

    const formData = new FormData();
    const id = this.connectorLibraryForm.get('id').value;

    formData.append('id', id);
    formData.append('description', this.connectorLibraryForm.get('description').value);
    formData.append('file', this.connectorLibraryForm.get('file').value);

      this.connectorLibraryService.save(formData, id ).subscribe(
        connectorLibrary => {
          this.connectorLibrary = connectorLibrary;
          this.connectorLibraryForm.reset();
          this.feedback = { type: 'success', message: 'Save was successful!' };
          setTimeout(() => {
            this.load();
            this.feedback = null;
          }, 1000);
        }
    );



}


onFileSelect(event) {
  if (event.target.files.length > 0) {
    const packageFile = event.target.files[0];
    this.connectorLibraryForm.get('file').setValue(packageFile);    
  }
}

}


