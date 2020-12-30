import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';
import { StatsService } from 'src/app/services/stats.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})


export class AboutComponent implements OnInit {

graph: any;
summary: any;

  constructor(private aboutService: AboutService) {
  }

  async ngOnInit() {
    
    this.summary = this.aboutService.load();

    
  }
}
