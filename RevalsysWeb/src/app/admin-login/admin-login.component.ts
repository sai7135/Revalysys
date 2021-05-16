import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  LoginForm:FormGroup;
  constructor(private _rep:RepositoryService,private _route:Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._rep.communicate.next({loggedin:false,username:null});
    },0);
    this.LoginForm=new FormGroup({
      'UserName':new FormControl(),
      'Password':new FormControl()
    });
  }
  Login():void{
    this._rep.AdminLogin(this.LoginForm.value).subscribe(r=>{
      localStorage.setItem('admintoken',r.token);
      this._route.navigate(['/adminportal']);
    }
      );

  }
}
