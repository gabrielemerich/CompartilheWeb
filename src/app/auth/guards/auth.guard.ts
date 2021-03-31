import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../signin/shared/user.service";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

  
  constructor(
    private usuario:UserService,
    private router: Router
    ){}
  

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean{
   
    return this.usuario.isLoggedIn 
      .pipe(
        take(1),                            
        map((isLoggedIn: boolean) => { 
          if (!isLoggedIn){
            this.router.navigate(['auth/signin']);
            return false;
          }
          return true;
        })
      )
  }


}