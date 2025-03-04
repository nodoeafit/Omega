import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private isActivateMondalSubject = new BehaviorSubject<boolean>(false);
  isActivateMondal = this.isActivateMondalSubject.asObservable();

  toggleActivateMondal(){
    this.isActivateMondalSubject.next(!this.isActivateMondalSubject.value)
  }
}
