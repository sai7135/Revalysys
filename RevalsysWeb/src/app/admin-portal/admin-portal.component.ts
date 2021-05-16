import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService } from '../repository.service';
import {TestDuration} from '../models/testduration.model';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {
  Elements:TestDuration[]
  constructor(private _repo:RepositoryService,private route:Router) { }

  ngOnInit(): void {this._repo.GetAdminName().subscribe(r=>{
    this._repo.communicate.next({loggedin:true,username:r.message});
    }
    );
    
    this._repo.GetAllAdminTest().subscribe(r=>{
      this.Elements=r;
    })
  }
  GetResults(nav):void{
    this.route.navigate([`result`],{queryParams:{testName:nav.testName}});
  }
  AddQuestion():void{
    this.route.navigate(["/addtest"]);
  }
}
