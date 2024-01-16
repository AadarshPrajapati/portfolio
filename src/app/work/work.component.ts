import { Component, ElementRef } from '@angular/core';
import { ActiveSectionService } from '../active-section.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrl: './work.component.css'
})
export class WorkComponent {
  constructor(private elementRef: ElementRef, private activeSectionService: ActiveSectionService) { }

  ngOnInit() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.activeSectionService.setActiveSection('work');
      }
    }, { threshold: 0.5 });

    observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    // Disconnect observer on component destruction
    // This step prevents memory leaks
    // observer.disconnect();
  }
}
