import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class hideMenuService {

  constructor() { }

    private hideMenuSubject = new BehaviorSubject<boolean>(false);
    hideMenu = this.hideMenuSubject.asObservable();

    toggleHideMenu(){
      this.hideMenuSubject.next(!this.hideMenuSubject.value)
    }
}
