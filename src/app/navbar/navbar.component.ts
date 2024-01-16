import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ActiveSectionService } from '../active-section.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  activeLink: string = 'home'; // Set default active link
  isDarkMode: boolean = false;

  setActive(link: string) {
    this.activeLink = link; // Set active link when clicked
  }

  scrollPercentage: number = 0;

  constructor(private renderer: Renderer2, private el: ElementRef,private activeSectionService: ActiveSectionService) {
    this.subscription = this.activeSectionService.activeSection.subscribe((section: string) => {
      this.activeLink = section;
    });
   }

  ngOnInit() {
    this.updateProgressBar();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.updateProgressBar();
    let nav = document.getElementById("nav-menu");
    nav?.classList.remove('show');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // If scrolling up or at the top, show the navbar
    if (currentScroll <= 0 || currentScroll < this.lastScrollTop) {
      this.hideNavbar = false;
    } else {
      // If scrolling down, hide the navbar
      this.hideNavbar = true;
    }

    this.lastScrollTop = currentScroll;
  }

  updateProgressBar() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollPercentage = (winScroll / height) * 100;
  }

  lastScrollTop = 0;
  hideNavbar = true;


  private subscription!: Subscription;


  ngOnDestroy() {
    // Unsubscribe from the active section service to avoid memory leaks
    this.subscription.unsubscribe();
  }

  // isDarkMode: boolean = false;

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        // Add logic to toggle dark mode here
        if (this.isDarkMode) {
            // Enable dark mode
            // Perform necessary actions for dark mode
        } else {
            // Enable light mode
            // Perform necessary actions for light mode
        }
    }

    @HostListener('window:click', ['$event'])
    onWindowClick(event:Event){
      if (event && (event.target as HTMLElement).classList.contains('pi-align-justify')) {
        this.showMenu('nav-toggle', 'nav-menu');
      }
    }

    showMenu(toggleId:string, navId:string){
      const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId)
      if(toggle && nav){
        nav.classList.toggle('show')
      }
  }
}
