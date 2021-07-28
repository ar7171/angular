import { DataRecieverService } from './../data-reciever.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar }  from '@angular/material/snack-bar';
import {  forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  public NumberList:any;
  public isNumberList:boolean=true;
  public multiplyValue:any;
  public multiplyError:number=0;
  public addValue:any;
  public addError:number=0;
  
  public DataRecieverService:DataRecieverService=new DataRecieverService;
 
  public getNumbersList!: Observable<{
    value: number;
    action: string;
    additionalValue: number;
  }[]>;

  public EmptyObs = this.getNumbersList;

  constructor(public snackBar: MatSnackBar) { 
  }
  
  //call this method for show snackbars
  openSnackbar(message:string, buttonText:string){
    this.isNumberList=false;
    this.snackBar.open(message, buttonText );
   }

  ngOnInit() {  
   this.getCombinedData();
  } 

  //combine data using mergemap
  public getCombinedData(){

    this.getNumbersList=this.DataRecieverService.getJsons("numbers");

     this.getNumbersList
      .pipe(
        mergeMap((result) => {
          let allIds = result.map(row => this.DataRecieverService.getJsons(row.action));
          const numbers=forkJoin(...allIds);
          const num=numbers.pipe(map((idDataArray) => {

            result.forEach((eachContact, index) => {
              eachContact.additionalValue = idDataArray[index][0].value;
            })
            
            return result;
          })
        );
          return num;
        })
      ).subscribe(
        res=>this.NumberList=res,
        err => err.status == 404 ? this.openSnackbar("Server Error","okay")  : this.isNumberList=true  
         );

  }

}
