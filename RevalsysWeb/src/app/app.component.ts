import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService } from './repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedin:boolean=false;
  username:string;
  constructor(private _repo:RepositoryService,private _route:Router){
   
  }
  ngOnInit(): void { this._repo.communicate.subscribe(r=>{
    this.loggedin=r.loggedin;
    this.username=r.username;
  })
   
  }
  title = 'RevalsysWeb';
  logout():void{
    localStorage.removeItem('token');
    localStorage.removeItem('admintoken');
    this._route.navigate(["/login"]);

  }
}
