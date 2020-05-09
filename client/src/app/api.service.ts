import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "http://localhost:5000/tweets";

  constructor(private httpClient: HttpClient) { }

  public get(movieName){
    return this.httpClient.get(this.SERVER_URL +"/"+ movieName);
  }
}
