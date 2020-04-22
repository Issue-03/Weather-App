import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_ENDPOINT_1: string ="https://api.openweathermap.org/data/2.5/forecast?q=";
  API_ENDPOINT_2: string ="http://api.weatherstack.com/current?access_key=4b403734201324b8c2dae59d81ced03b&query=" ;

  constructor(private http: HttpClient) { }


  // This function returns the data after getting it from the OpenWeatherMap-API
  getWeather1(location) {

    return this.http.get( this.API_ENDPOINT_1 + location + "&appid=defe13e9574be12b62456e91969b6d82");

  }

  // This function returns the data after getting it from the WeatherStack-API
  getWeather2(location) {
    return this.http.get( this.API_ENDPOINT_2 + location );
  }
}
