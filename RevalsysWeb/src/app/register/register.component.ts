import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import {RepositoryService} from '../repository.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm:FormGroup;
  constructor(private repo:RepositoryService,private route:Router,private activroute:ActivatedRoute) { }
  
  

  ngOnInit(): void {
    setTimeout(() => {
      this.repo.communicate.next({loggedin:false,username:null});
    },0);
    this.RegisterForm=new FormGroup({
      "Username":new FormControl(),
      "Password":new FormControl(),
      "ConfirmPassword":new FormControl()
    });
  }
  SignUp(){
        this.repo.SignUp(this.RegisterForm.value).subscribe(r=>{
          this.route.navigate(['login']);
        });;
  }

}
