import { Component, ElementRef } from '@angular/core';
import { ActiveSectionService } from '../active-section.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private elementRef: ElementRef, private activeSectionService: ActiveSectionService) { }

  ngOnInit() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.activeSectionService.setActiveSection('home');
      }
    }, { threshold: 0.5 });

    observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    // Disconnect observer on component destruction
    // This step prevents memory leaks
    // observer.disconnect();
  }
  scrollToContact(){
    document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});
  }
}
