import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { File } from 'src/app/models/file.model';
import { ConnectorService } from 'src/app/services/connector.service';
import { Connector } from 'src/app/models/connector.model';

@Component({
  selector: 'app-connector',
  templateUrl: 'connector-list.component.html'
})
export class ConnectorListComponent implements OnInit {

  selectedConnector: Connector;
  feedback: any = {};

  get connectorList(): Connector[] {
    return this.connectorService.connectorList;
  }

  constructor(private connectorService: ConnectorService) {
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.connectorService.load();
  }

  translateProfile(id: number): String{

    switch(id) { 
      case 0: 
         return "ALL"; 
      case 1: 
         return "LOCAL"; 
      case 2: 
         return "DEV"; 
      case 3: 
         return "PROD"; 
      default: 
        return "UNKNOWN";  
   } 

}

  select(selected: Connector): void {
    this.selectedConnector = selected;
  }

  delete(connector: Connector): void {
    if (confirm('Are you sure?')) {
      this.connectorService.delete(connector).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load();
          }, 1000);
         }
      );
    }
  }
}
