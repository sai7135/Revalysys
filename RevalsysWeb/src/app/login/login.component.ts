import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm:FormGroup
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
    this._rep.Login(this.LoginForm.value).subscribe(r=>{
      localStorage.setItem('token',r.token);
      this._route.navigate(['/test']);
    }
      );
  }
}
