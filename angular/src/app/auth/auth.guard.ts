import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserSharedService } from 'src/app/services/userShared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userSharedService: UserSharedService ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkLogin();
  }
  checkLogin(): boolean{
    let islogin = false;
    this.userSharedService.isLogin.subscribe(data => {
      islogin = data;
    });
    if (!islogin){
      this.router.navigate(['login']);
    }
    return islogin;
  }

}
