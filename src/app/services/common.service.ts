import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _subject = new BehaviorSubject<string>('');
  private _subjectForReceptionist = new BehaviorSubject<number>(0);

  constructor() { }

  newEvent = (event: string) => this._subject.next(event);

  sendNumRecep = (event: number) => this._subjectForReceptionist.next(event);

  get events$ () {
    return this._subject.asObservable();
  }

  get eventsRecep$ () {
    return this._subjectForReceptionist.asObservable();
  }
}