import { Component, ElementRef } from '@angular/core';
import { ActiveSectionService } from '../active-section.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  providers: [MessageService]
})
export class AboutComponent {
  constructor(private messageService: MessageService,private elementRef: ElementRef, private activeSectionService: ActiveSectionService,private httpClient: HttpClient) { }

  ngOnInit() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.activeSectionService.setActiveSection('about');
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
  downloadResume() {
    const resumeFilePath = '../../assets/Resume/Aadarsh_Prajapati_Resume.pdf'; // Adjust the path to your actual PDF file

    // Make an HTTP request to fetch the file
    this.httpClient.get(resumeFilePath, { responseType: 'blob' }).subscribe((blob: Blob) => {
      // Create a Blob from the response
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement('a');
      link.href = url;

      // Set the download attribute with the desired file name
      link.download = 'Aadarsh_Prajapati_CV.pdf'; // Change the file name if needed

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the click event on the link to initiate the download
      link.click();

      // Remove the link from the DOM
      document.body.removeChild(link);

      // Release the Blob URL
      window.URL.revokeObjectURL(url);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File Downloaded Successfully' });
    },
    error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Occured While Downloading File' });
    });
  }
}
