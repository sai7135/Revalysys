import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestDuration } from '../models/testduration.model';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  Elements:TestDuration[]
  constructor(private _repo:RepositoryService,private route:Router) { }

  ngOnInit(): void {this._repo.GetUserName().subscribe(r=>{
    this._repo.communicate.next({loggedin:true,username:r.message});
    }
    );
    
    this._repo.GetAllUserTest().subscribe(r=>{
      this.Elements=r;
    })
  }
  StartTest(e):void{
    this._repo.selectedTest=e;
    this.route.navigate(['starttest']);
  }
}
