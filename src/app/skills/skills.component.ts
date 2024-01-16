import { Component, ElementRef } from '@angular/core';
import { ActiveSectionService } from '../active-section.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  languages: string[] = ['Java', 'Python', 'C', 'C++', 'TypeScript', 'JavaScript', 'PHP', 'R', 'LaTeX', 'SQL', 'MongoDB', 'HTML', 'CSS'];
  frameworks: string[] = ['Angular', 'Spring Boot', 'PrimeNG', 'GOJS', 'Apache Camel', 'Tkinter'];
  devTools: string[] = ['Git/GitHub', 'VS code', 'Postman', 'STS (Spring Tool Suite)', 'Eclipse'];
  others: string[] = ['DSA', 'DBMS', 'OOPs', 'SDLC'];
  images: string[] = [
    '../../assets/Images/skiils2.avif',
    '../../assets/Images/skills.avif',
    '../../assets/Images/skills1.avif'
  ];
  constructor(private elementRef: ElementRef, private activeSectionService: ActiveSectionService) {}

  ngOnInit() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.activeSectionService.setActiveSection('skills');
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
