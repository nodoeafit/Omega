import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  constructor() { }

  private isDarkModeSubject$ = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject$.asObservable();

  toggleDarkMode() {
    this.isDarkModeSubject$.next(!this.isDarkModeSubject$.value)
  }
}

