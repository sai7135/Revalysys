import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Test } from '../models/test.model';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css']
})
export class StartTestComponent implements OnInit {
  page = 1;
  pageSize=5;
  testData:Test[];
  AnswerForm:FormGroup;
  appear:boolean;
  Seconds:number;
  Timer:string;
  constructor(private _repo:RepositoryService,private route:Router) { }
  ngOnInit(): void {this._repo.GetUserName().subscribe(r=>{
    this._repo.communicate.next({loggedin:true,username:r.message});
    }
    );
    this.AnswerForm=new FormGroup({
      'Answer':new FormArray([])
    });
    this.Seconds=this._repo.selectedTest.hours*60*60+this._repo.selectedTest.minutes*60+this._repo.selectedTest.seconds;
    setInterval(() => {
      this.Seconds--;
      if(this.Seconds==0)
      {
        this.Submit();
      }
      var h = Math.floor(this.Seconds / 3600);
      var m = Math.floor(this.Seconds % 3600 / 60);
      var s = Math.floor(this.Seconds % 3600 % 60);

      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      this.Timer= hDisplay + mDisplay + sDisplay; 
    },1000);
    this._repo.GetTestData(this._repo.selectedTest.testName).subscribe(r=>{
      this.testData=r;
      for(let v of this.testData){
        (<FormArray>this.AnswerForm.get('Answer')).push(new FormControl());
      }
    });
    this.appear=true;
  }
  Submit():void{
    this._repo.SubmitAnswers({TestName:this._repo.selectedTest.testName,Answer:this.AnswerForm.get('Answer').value}).subscribe(r=>{console.log(r);});
    this.route.navigate(['endtest']);
  }
  ClearSelection(clearindex){
    (<FormControl>(<FormArray>this.AnswerForm.get('Answer')).get(''+clearindex)).setValue(null);
  }
}
