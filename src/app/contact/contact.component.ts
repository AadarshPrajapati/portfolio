import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActiveSectionService } from '../active-section.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private elementRef: ElementRef, private activeSectionService: ActiveSectionService) {
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d+$/)]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const { firstName, message } = this.contactForm.value;
      const emailSubject = 'Connecting for Professional Engagement'; // Subject line for the email
      const recipientEmail = 'k.aadarsh06@gmail.com'; // Email recipient
      const mailContent = `Dear Aadarsh,\n\nI hope this message finds you well. My name is ${firstName}, and I am reaching out regarding an opportunity for potential collaboration. I am interested in discussing "${message}" with you, and I believe our interaction could be beneficial for both parties involved.\n\nWould it be possible for us to schedule a time to connect and explore potential synergies? I am looking forward to exchanging thoughts and ideas that might lead to a mutually beneficial relationship.\n\nThank you for your time and consideration.\n\nBest regards,\n${firstName}`;
      const mailToLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(mailContent)}`;
      window.open(mailToLink);
      this.contactForm.reset();
    }
  }
  

  ngOnInit() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.activeSectionService.setActiveSection('contact');
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
