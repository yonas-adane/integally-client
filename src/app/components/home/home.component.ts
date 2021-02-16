import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { StatusCountReport } from 'src/app/models/event-message.model';
import { AlertService } from 'src/app/services/alert.service';
import { StatsService } from 'src/app/services/stats.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})


export class HomeComponent implements OnInit, OnDestroy  {

  statusCountReport: StatusCountReport[];

  subscriptionAutoLoad: Subscription;

  subscriptionAlertService: Subscription;

  rows: string[]=[];
  cols: String[]=[];

  autoLoadInterval: Observable<number> = timer(0, environment.autoLoadInterval);

  constructor(private statsService: StatsService,
    private alertService: AlertService) {
  }

  ngOnDestroy() {
    this.subscriptionAutoLoad.unsubscribe();
  }

   ngOnInit() {

    this.subscriptionAlertService = this.alertService.alert.subscribe(message => {

      //if we have any alert, stop auto refresh.
      if (message) {
        this.subscriptionAutoLoad.unsubscribe();
      } 
  
    });

    this.subscriptionAutoLoad = this.autoLoadInterval.subscribe(() => {
      this.load();
    });

    
  }

  load(): void {
    this.statsService.load().subscribe(result => {
        this.statusCountReport = result;

        for (var item of result) {

          this.rows.push(item.status);
          this.cols.push(item.reportDate.toString());

        }

        this.rows = this.dedupe(this.rows);
        this.cols = this.dedupe(this.cols);

      }
    );
  }

  dedupe(array): string[]{

   return array.filter((value,index) => array.indexOf(value) === index);

  }


  findVal(row, col): number{

    for (var item of this.statusCountReport) {

      if(item.reportDate == col && item.status == row){
        return item.statusCount;
      }

    }

  }

}
