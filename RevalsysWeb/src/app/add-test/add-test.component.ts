import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {
  NewQuestionForm:FormGroup;
  AddedQuestions:string[];
  AddTest:FormGroup;
  constructor(private _repo:RepositoryService,private route:Router) { }

  ngOnInit(): void {
    this._repo.GetAdminName().subscribe(r=>{
    this._repo.communicate.next({loggedin:true,username:r.message});
    }
    );
    this.AddedQuestions=[];
    this.NewQuestionForm=new FormGroup({
      'TestName':new FormControl(),
      'Question':new FormControl(),
      'Option1':new FormControl(),
      'Option2':new FormControl(),
      'Option3':new FormControl(),
      'Option4':new FormControl(),
      'Answer':new FormControl()
    });
    this.AddTest=new FormGroup({
      'Hours':new FormControl(),
      'Minutes':new FormControl(),
      'Seconds':new FormControl()
    });
  }
  AddQuestion():void{
    this._repo.AddQuestion(this.NewQuestionForm.value).subscribe(r=>{
      this.AddedQuestions.push(this.NewQuestionForm.get("Question").value);
      this.NewQuestionForm.patchValue({Question:null,Option1:null,Option2:null,Option3:null,Option4:null,Answer:null});
    });    
  }
  AddDuration():void{
    this._repo.AddTest({TestName:this.NewQuestionForm.get("TestName").value,Hours:this.AddTest.get('Hours').value,Minutes:this.AddTest.get('Minutes').value,Seconds:this.AddTest.get("Seconds").value})
    .subscribe(r=>{
      this.route.navigate(['adminportal']);
    });
  }
}
