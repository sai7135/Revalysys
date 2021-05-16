import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RepositoryService } from './repository.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedActiveGuard implements CanActivate {
  constructor(private repo:RepositoryService,private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem("token")==null){
        this.router.navigate(["/login"]);
        return false;
      }
      else{
        return this.repo.CheckUserExist().pipe(map(r=>{
          if(r){
            return true;
          }
          else{
            localStorage.removeItem("token");
            this.router.navigate(["/login"]);
            return false;
          }
        }));
      }
  }
  
}
