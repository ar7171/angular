import { Injectable } from '@angular/core';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataRecieverService {
  public http: HttpClient= new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));

  private obs!: Observable<{
    value: number;
    action: string;
    additionalValue: number;
  }[]>;

  //additional observable to handle files errors
  private EmptyObs!: Observable<any[]>;

  constructor() {
    this.EmptyObs = this.http.get<{value: number, action: string, additionalValue:number}[]>('./assets/fake.json'); 
  }

  //call this method when we want to get local json file content
  //fileName => just file name without extension ex: numbers | not numbers.json
  getJsons(fileName:string) {
   this.obs =  this.http.get<{value: number, action: string, additionalValue:number}[]>('./assets/'+fileName+'.json');

  if(fileName !="numbers" && this.doesFileExist('./assets/'+fileName+'.json') != 200){
    return this.EmptyObs;
  }

  return this.obs
  }

//returns XMLHttpRequest status => 200 means okay | 404 means not found
doesFileExist(urlToFile:string) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    return xhr.status;
}
  
}
