import { Component, computed, signal } from '@angular/core';
import { portfolioData } from '../shared/data';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section id="contact" class="container-px section">
      <h1 class="text-heading" style="margin:0 0 1rem 0;">Contact With Me</h1>
      <p class="text-muted">Feel free to reach out for opportunities or collaborations.</p>
      <div class="contact-grid" style="margin-top:1rem;">
        <a [href]="'mailto:' + personal().email" class="card focus-ring contact-card card-interactive">
          <div class="contact-icon">📧</div>
          <div class="contact-info">
            <div class="contact-label">Email</div>
            <div class="contact-value">{{ personal().email }}</div>
          </div>
        </a>
        <a [href]="'tel:' + personal().phone" class="card focus-ring contact-card card-interactive">
          <div class="contact-icon">📱</div>
          <div class="contact-info">
            <div class="contact-label">Phone</div>
            <div class="contact-value">{{ personal().phone }}</div>
          </div>
        </a>
        <a [href]="personal().linkedin" target="_blank" rel="noopener" class="card focus-ring contact-card card-interactive">
          <div class="contact-icon">💼</div>
          <div class="contact-info">
            <div class="contact-label">LinkedIn</div>
            <div class="contact-value">Connect with me</div>
          </div>
        </a>
        <div class="card contact-card">
          <div class="contact-icon">📍</div>
          <div class="contact-info">
            <div class="contact-label">Location</div>
            <div class="contact-value">{{ personal().location }}</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    @media (min-width: 600px) {
      .contact-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .contact-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    
    .contact-card {
      padding: 1.5rem 1rem;
      text-decoration: none;
      color: var(--heading);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.75rem;
    }
    
    .contact-icon {
      font-size: 2rem;
      opacity: 0.8;
    }
    
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .contact-label {
      font-size: 0.875rem;
      color: var(--muted);
      font-weight: 500;
    }
    
    .contact-value {
      font-size: 0.9rem;
      color: var(--heading);
      font-weight: 600;
    }
    
    @media (max-width: 480px) {
      .contact-card {
        flex-direction: row;
        text-align: left;
        align-items: center;
        margin: 0;
        width: 100%;
        max-width: 100%;
      }
      
      .contact-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
      }
      
      .contact-grid {
        margin: 0;
        padding: 0;
        width: 100%;
      }
    }
  `]
})
export class ContactComponent {
  protected readonly data = signal(portfolioData);
  protected readonly personal = computed(() => this.data().personal);
}


