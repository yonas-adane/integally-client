import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupGroup } from 'src/app/models/lookupGroup.model';
import { Page } from 'src/app/models/page.model';
import { LookupGroupService } from 'src/app/services/lookup-group.service';

@Component({
  selector: 'app-lookup-group',
  templateUrl: 'lookup-group.component.html'
})
export class LookupGroupComponent implements OnInit {

  selectedLookupGroup: LookupGroup;
  lookupGroup: LookupGroup;

  feedback: any = {};

  get lookupGroupsPageable(): Page<LookupGroup> {
    return this.lookupGroupService.lookupGroupPageable;
  }

  constructor(    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private lookupGroupService: LookupGroupService) {
  }

  lookupGroupForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl('')
  });

  get f() { return this.lookupGroupForm.controls; }

  ngOnInit() {

    this.lookupGroupForm = this.formBuilder.group({
      id: [''],
      name: ['',[Validators.required]],
      description: ['']
    });

    this.load();
  }

  load(): void {
    this.lookupGroupService.load();
    
  }

  select(selected: LookupGroup): void {
    this.selectedLookupGroup = selected;
  }

  delete(lookupGroup: LookupGroup): void {
    if (confirm('Are you sure?')) {
      this.lookupGroupService.delete(lookupGroup).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load();
            this.feedback = null;
          }, 1000);
         }
      );
    }
  }

  setForEdit(lookupGroup: LookupGroup){

    if (confirm('Are you sure?')) {

      this.f['id'].setValue(lookupGroup.id);
      this.f['name'].setValue(lookupGroup.name);
      this.f['description'].setValue(lookupGroup.description);

    }

  }

  onSubmit(){

    const id = this.lookupGroupForm.get('id').value;

    const isCreate = id == null || id.length == 0 ? true : false;
    
        this.lookupGroupService.save(this.lookupGroupForm.value, isCreate ).subscribe(
        lookup => {
          this.lookupGroup = lookup;
          this.feedback = {type: 'success', message: 'Save was successful!'};
          this.lookupGroupForm.reset();
          this.load();
          setTimeout(() => {
            this.feedback = null;
          }, 1000);
        }
      );

  }

  clearForm(){
    this.lookupGroupForm.reset();
  }

  

}

