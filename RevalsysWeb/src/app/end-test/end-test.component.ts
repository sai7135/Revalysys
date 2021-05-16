import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-end-test',
  templateUrl: './end-test.component.html',
  styleUrls: ['./end-test.component.css']
})
export class EndTestComponent implements OnInit {

 
  constructor(private _repo:RepositoryService,private route:Router) { }
  ngOnInit(): void {this._repo.GetUserName().subscribe(r=>{
    this._repo.communicate.next({loggedin:true,username:r.message});
    }
    );
  }
  Gototest():void{
    this.route.navigate(['test']);
  }
}
