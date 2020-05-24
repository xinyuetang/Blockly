import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSharedService {

  public isLogin: BehaviorSubject<boolean> = new BehaviorSubject(false);

}
