import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveSectionService {
  activeSection = new Subject<string>();

  setActiveSection(section: string) {
    this.activeSection.next(section);
  }
}