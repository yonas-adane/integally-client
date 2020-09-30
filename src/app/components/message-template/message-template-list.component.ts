import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { MessageTemplateService } from 'src/app/services/message-template.service';
import { MessageTemplate } from 'src/app/models/message-template.model';

@Component({
  selector: 'app-message-template',
  templateUrl: 'message-template-list.component.html'
})
export class MessageTemplateListComponent implements OnInit {

  selectedMessageTemplate: MessageTemplate;
  feedback: any = {};

  get messageTemplateList(): MessageTemplate[] {
    return this.messageTemplateService.messageTemplateList;
  }

  constructor(private messageTemplateService: MessageTemplateService) {
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.messageTemplateService.load();
  }

  select(selected: MessageTemplate): void {
    this.selectedMessageTemplate = selected;
  }

  delete(event: Event): void {
    if (confirm('Are you sure? This will also delete all trace data for this event.')) {

     

    }
  }
 

}
