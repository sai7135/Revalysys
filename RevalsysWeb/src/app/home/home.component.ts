import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _rep:RepositoryService) { }
  

  ngOnInit(): void {
    setTimeout(() => {
      this._rep.communicate.next({loggedin:false,username:null});
    },0);
  }

}
