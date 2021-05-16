import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RepositoryService } from './repository.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedActiveGuard implements CanActivate {
  constructor(private repo:RepositoryService,private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem("token")==null&&localStorage.getItem("admintoken")==null){
      return true;
    }
    else if(localStorage.getItem("token")!=null){
      return this.repo.CheckUserExist().pipe(map(r=>{
        if(r){
          this.router.navigate(["/test"]);
          return false;
        }
        else{
          localStorage.removeItem("token");
            return true;
        }
      }));
    }
      else if(localStorage.getItem("admintoken")!=null){
        return this.repo.CheckAdminExist().pipe(map(r=>{
          if(r){
            this.router.navigate(["/adminportal"]);
            return false;
          }
          else{
            localStorage.removeItem("admintoken");
            return true;
          }
        }));
      }
    }
  
}
