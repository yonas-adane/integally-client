import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { MappingTemplate } from 'src/app/models/mapping-template.model';
import { MappingTemplateService } from 'src/app/services/mapping-template.service';

@Component({
  selector: 'app-mapping-template',
  templateUrl: 'mapping-template-list.component.html'
})
export class MappingTemplateListComponent implements OnInit {

  selectedMappingTemplate: MappingTemplate;
  feedback: any = {};

  get mappingTemplateList(): MappingTemplate[] {
    return this.mappingTemplateService.mappingTemplateList;
  }

  constructor(private mappingTemplateService: MappingTemplateService) {
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.mappingTemplateService.load();
  }

  select(selected: MappingTemplate): void {
    this.selectedMappingTemplate = selected;
  }

  delete(event: Event): void {
    if (confirm('Are you sure? This will also delete all trace data for this event.')) {

    }
  }


}
