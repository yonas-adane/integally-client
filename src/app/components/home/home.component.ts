import { Component, OnInit } from '@angular/core';
import { StatusCountReport } from 'src/app/models/event-message.model';
import { StatsService } from 'src/app/services/stats.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})


export class HomeComponent implements OnInit {

  statusCountReport: StatusCountReport[];

  constructor(private statsService: StatsService) {
  }

   ngOnInit() {

    this.load();
    
  }

  load(): void {
    this.statsService.load().subscribe(result => {
        this.statusCountReport = result;
      }
    );
  }
}
