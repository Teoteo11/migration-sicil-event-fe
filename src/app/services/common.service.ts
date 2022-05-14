import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _subject = new BehaviorSubject<string>('');

  constructor() { }

  newEvent = (event) => this._subject.next(event);
  
  get events$ () {
    return this._subject.asObservable();
  }
}