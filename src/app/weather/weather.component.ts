import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiService } from "../api.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  //These are variables required for making a bar chart.

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [
    {data: [], label: 'Temperature (degree celsius)'},
    {data: [], label: 'Humidity (in percentage)'}
  ];


  public weatherSearchForm: FormGroup;
  weatherData1: any;
  weatherData2: any;
  showIcon: boolean = false;


  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  //This function passes the location to the API serviceamd fetches the returned data.
  // Then it converts the data into suitable form for making bar chart.
  onSubmitForm(formValues) {

    // To get the 5 days forecast

    this.apiService.getWeather1(formValues.location)
    .subscribe(data => {
      this.weatherData1 = data;
      console.log(typeof this.weatherData1);
      console.log("Data 1: ",this.weatherData1);

      for(let i=1,j=0;i<40&&j<5;i=i+8,j++) {
        this.barChartData[0].data[j] = (this.weatherData1.list[i].main.temp - 273).toPrecision(2);
        this.barChartData[1].data[j] = this.weatherData1.list[i].main.humidity;
        this.barChartLabels[j] = this.weatherData1.list[i].dt_txt.substring(0,10);
      }

    });

    //To get the current weather conditions

    this.apiService.getWeather2(formValues.location)
    .subscribe( data => {
      this.weatherData2 = data;
      console.log(typeof this.weatherData2);
      console.log("Data 2: ",this.weatherData2);
      this.showIcon = true;
    } )
  }

}
