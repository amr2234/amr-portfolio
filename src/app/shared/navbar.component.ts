import { Component, signal, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  template: `
    <nav class="container-px" style="display:flex;gap:1rem;align-items:center;justify-content:space-between;padding:1.5rem 0;border-bottom:1px solid var(--border);position:relative;min-height:60px;">
      <a (click)="scrollToSection('home')" class="focus-ring" style="font-weight:700;text-decoration:none;color:var(--heading);cursor:pointer;padding:0.5rem;">Amr Mohamed</a>
      
      <!-- Desktop Navigation -->
      <div class="desktop-only" style="display:flex;gap:1rem;">
        <a (click)="scrollToSection('services')" class="btn" style="background:transparent;color:var(--body);cursor:pointer;">What I Do</a>
        <a (click)="scrollToSection('skills')" class="btn" style="background:transparent;color:var(--body);cursor:pointer;">Skills</a>
        <a (click)="scrollToSection('portfolio')" class="btn" style="background:transparent;color:var(--body);cursor:pointer;">Projects</a>
        <a (click)="scrollToSection('resume')" class="btn" style="background:transparent;color:var(--body);cursor:pointer;">Resume</a>
        <a (click)="scrollToSection('contact')" class="btn btn-primary focus-ring" style="cursor:pointer;">Contact</a>
      </div>
      
      <!-- Mobile Hamburger Button -->
      <button class="mobile-only btn" 
              (click)="toggleMenu()" 
              style="background:transparent;color:var(--body);padding:0.75rem;margin:0.25rem;"
              [attr.aria-label]="isMenuOpen() ? 'Close menu' : 'Open menu'"
              [attr.aria-expanded]="isMenuOpen()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line *ngIf="!isMenuOpen()" x1="3" y1="6" x2="21" y2="6"></line>
          <line *ngIf="!isMenuOpen()" x1="3" y1="12" x2="21" y2="12"></line>
          <line *ngIf="!isMenuOpen()" x1="3" y1="18" x2="21" y2="18"></line>
          <line *ngIf="isMenuOpen()" x1="18" y1="6" x2="6" y2="18"></line>
          <line *ngIf="isMenuOpen()" x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <!-- Mobile Menu -->
      <div *ngIf="isMenuOpen()" 
           class="mobile-menu mobile-only" 
           style="position:absolute;top:100%;left:0;right:0;background:var(--surface);border:1px solid var(--border);border-top:none;border-radius:0 0 var(--radius) var(--radius);box-shadow:var(--shadow);z-index:50;">
        <div style="display:flex;flex-direction:column;padding:1rem;gap:0.5rem;">
          <a (click)="scrollToSection('services')" 
             class="btn focus-ring" 
             style="background:transparent;color:var(--body);justify-content:flex-start;width:100%;cursor:pointer;">What I Do</a>
          <a (click)="scrollToSection('skills')" 
             class="btn focus-ring" 
             style="background:transparent;color:var(--body);justify-content:flex-start;width:100%;cursor:pointer;">Skills</a>
          <a (click)="scrollToSection('portfolio')" 
             class="btn focus-ring" 
             style="background:transparent;color:var(--body);justify-content:flex-start;width:100%;cursor:pointer;">Projects</a>
          <a (click)="scrollToSection('resume')" 
             class="btn focus-ring" 
             style="background:transparent;color:var(--body);justify-content:flex-start;width:100%;cursor:pointer;">Resume</a>
          <a (click)="scrollToSection('contact')" 
             class="btn btn-primary focus-ring" 
             style="justify-content:flex-start;width:100%;cursor:pointer;">Contact</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      padding: 1.5rem 0;
      min-height: 60px;
    }
    
    @media (max-width: 480px) {
      nav {
        padding: 1rem 0;
        margin: 0;
      }
      
      nav .container-px {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }
    
    .mobile-menu {
      display: block;
    }
    
    @media (min-width: 768px) {
      .mobile-menu {
        display: none !important;
      }
    }
    
    .desktop-only {
      display: none;
    }
    
    @media (min-width: 768px) {
      .desktop-only {
        display: flex;
      }
    }
    
    .mobile-only {
      display: block;
    }
    
    @media (min-width: 768px) {
      .mobile-only {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  protected readonly isMenuOpen = signal(false);
  
  constructor(private router: Router) {
    // Ensure menu is closed on initialization
    this.isMenuOpen.set(false);
  }
  
  protected toggleMenu() {
    this.isMenuOpen.update(current => !current);
  }
  
  protected closeMenu() {
    this.isMenuOpen.set(false);
  }
  
  protected scrollToSection(sectionId: string) {
    this.closeMenu(); // Close mobile menu when clicking a link
    
    // If we're not on the home page, navigate to it first
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          this.performScroll(sectionId);
        }, 100);
      });
    } else {
      this.performScroll(sectionId);
    }
  }
  
  private performScroll(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  
  // Close mobile menu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const nav = target.closest('nav');
    if (!nav && this.isMenuOpen()) {
      this.closeMenu();
    }
  }
  
  // Close mobile menu when screen size changes to desktop
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 768) {
      this.closeMenu();
    }
  }
}


