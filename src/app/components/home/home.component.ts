import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})


export class HomeComponent implements OnInit {

graph: any;
summary: any;

  constructor(private statsService: StatsService) {
  }

  async ngOnInit() {
    
    //this.summary = this.statsService.load();

    
  }
}
