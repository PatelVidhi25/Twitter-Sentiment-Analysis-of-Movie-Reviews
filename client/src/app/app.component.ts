import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';


export class Result {
  Index: number;
  Tweet: number;
  Sentiment: string;
  SentimentScore: {
    Positive: number;
    Negative: number;
    Neutral: number;
    Mixed: number;
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //bar chart
  public barChartType: string = 'bar';
  public barChartDatasets: Array<any> = [
    { data: [], label: 'Sentiment Analysis' }
  ];
  public barChartLabels: Array<any> = ['Positive', 'Negative', 'Neutral', 'Mixed'];

  public barChartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public barChartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  // pie chart
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Positive', 'Negative', 'Neutral','Mixed'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  results = [];
  displayedColumns: string[] = ['Index', 'Tweet', 'Sentiment', 'PositiveScore', 'NegativeScore', 'NeutralScore' ,'MixedScore'];
  dataSource = new MatTableDataSource<Result>();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private apiService: ApiService) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

  }

  submit(movieName) {
    this.apiService.get(movieName).subscribe((data: any[])=>{
      this.results = data['ResultList'];
      this.dataSource = new MatTableDataSource<Result>(this.results);
      this.barChartDatasets[0].data = [];
      this.barChartDatasets[0].data.push(data['totalPositive']*1511111);
      this.barChartDatasets[0].data.push(data['totalNegative']*1511111);
      this.barChartDatasets[0].data.push(data['totalNeutral']*1511111);
      this.barChartDatasets[0].data.push(data['totalMixed']*1511111);
      this.pieChartData = [];
      this.pieChartData.push(data['totalPositive']*100/25);
      this.pieChartData.push(data['totalNegative']*100/25);
      this.pieChartData.push(data['totalNeutral']*100/25);
      this.pieChartData.push(data['totalMixed']*100/25);
    });
  }
}
