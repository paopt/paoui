import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RadioService implements OnDestroy{
  subject = new Subject<{name: string, id: string}>();

  constructor() { }

  ngOnDestroy() {
    this.subject.complete();
  }
}