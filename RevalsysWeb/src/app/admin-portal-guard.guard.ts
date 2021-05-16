import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RepositoryService } from './repository.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminPortalGuardGuard implements CanActivate {
  constructor(private repo:RepositoryService,private router:Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem("admintoken")==null){
        this.router.navigate(["/adminlogin"]);
        return false;
      }
      else{
        return this.repo.CheckAdminExist().pipe(map(r=>{
          if(r){
            return true;
          }
          else{
            localStorage.removeItem("admintoken");
            this.router.navigate(["/adminlogin"]);
            return false;
          }
        }));
      }
  }
  
}
