import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../repository.service';
import { Result } from '../models/result.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  Results:Result[];
  TestName:string;
  constructor(private _repo:RepositoryService,private route:ActivatedRoute) { }

  ngOnInit(): void {this._repo.GetAdminName().subscribe(r=>{
    this._repo.communicate.next({loggedin:true,username:r.message});
    }
    );
    this.route.queryParamMap.subscribe(r=>{
      this.TestName=r.get('testName');
    });
    this._repo.GetResults(this.TestName).subscribe(r=>{
      this.Results=r;
      console.log(r);
    });

  }

}
