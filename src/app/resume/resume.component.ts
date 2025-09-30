import { Component, computed, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { portfolioData } from '../shared/data';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="container-px section resume-section">
      <h1 class="text-heading" style="margin:0;">My Resume</h1>

      <section class="resume-section-item">
        <h2 class="text-heading section-title">Job Experience</h2>
        <article *ngFor="let e of experience()" class="card experience-card">
          <div class="experience-header">
            <div class="experience-main">
              <strong class="experience-role">{{ e.role }}</strong>
              <div class="text-body experience-company">{{ e.company }}</div>
            </div>
            <div class="experience-meta">
              <span class="experience-location">{{ e.location }}</span>
              <span class="experience-dates">{{ e.dates }}</span>
            </div>
          </div>
          <ul class="experience-details">
            <li *ngFor="let d of e.details">{{ d }}</li>
          </ul>
        </article>
      </section>

      <section class="resume-section-item">
        <h2 class="text-heading section-title">Education</h2>
        <div *ngFor="let ed of education()" class="card education-card">
          <div><strong>{{ ed.degree }}</strong></div>
          <div class="text-body">{{ ed.university }}</div>
          <div class="text-muted">Graduation: {{ ed.graduation }}</div>
        </div>
      </section>

      <section class="resume-section-item">
        <h2 class="text-heading section-title">Courses</h2>
        <div *ngFor="let c of courses()" class="card course-card">
          <div class="course-header">
            <strong class="course-title">{{ c.title }}</strong>
            <div class="course-meta">
              <span class="text-muted">{{ c.provider }}</span>
              <span class="text-muted">{{ c.dates }}</span>
              <span class="text-muted">{{ c.hours }}h</span>
            </div>
          </div>
          <ul class="course-modules">
            <li *ngFor="let m of c.modules">{{ m }}</li>
          </ul>
        </div>
      </section>

      <section class="resume-section-item">
        <h2 class="text-heading section-title">Personal</h2>
        <div class="personal-grid">
          <div class="personal-item">
            <strong class="text-muted personal-label">Name:</strong>
            <span class="text-body">{{ personal().name }}</span>
          </div>
          <div class="personal-item">
            <strong class="text-muted personal-label">Title:</strong>
            <span class="text-body">{{ personal().title }}</span>
          </div>
          <div class="personal-item">
            <strong class="text-muted personal-label">Tagline:</strong>
            <span class="text-body">{{ personal().tagline }}</span>
          </div>
          <div class="personal-item">
            <strong class="text-muted personal-label">Location:</strong>
            <span class="text-body">{{ personal().location }}</span>
          </div>
          <div class="personal-item">
            <strong class="text-muted personal-label">Email:</strong>
            <span class="text-body">{{ personal().email }}</span>
          </div>
          <div class="personal-item">
            <strong class="text-muted personal-label">Phone:</strong>
            <span class="text-body">{{ personal().phone }}</span>
          </div>
          <div class="personal-item">
            <strong class="text-muted personal-label">Iqama:</strong>
            <span class="text-body">{{ personal().iqama }}</span>
          </div>
          <div class="personal-item">
            <strong class="text-muted personal-label">LinkedIn:</strong>
            <a [href]="personal().linkedin" target="_blank" rel="noopener" class="text-body linkedin-link">View Profile</a>
          </div>
          <div class="personal-item">
            <strong class="text-muted personal-label">Nationality:</strong>
            <span class="text-body">{{ personal().nationality }}</span>
          </div>
          <div class="personal-item">
            <strong class="text-muted personal-label">Birthdate:</strong>
            <span class="text-body">{{ personal().birthdate }}</span>
          </div>
          <div class="personal-item">
            <strong class="text-muted personal-label">Status:</strong>
            <span class="text-body">{{ personal().status }}</span>
          </div>
        </div>
      </section>
    </section>
  `,
  styles: [`
    .resume-section {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    .resume-section-item {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .section-title {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
    }
    
    /* Experience Cards */
    .experience-card {
      padding: 1.5rem;
      margin: 0.75rem 0;
    }
    
    .experience-header {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .experience-main {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .experience-role {
      font-size: 1.125rem;
      color: var(--heading);
    }
    
    .experience-company {
      font-size: 1rem;
    }
    
    .experience-meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.875rem;
      color: var(--muted);
    }
    
    .experience-details {
      margin: 0 0 0 1rem;
      padding-left: 0.5rem;
    }
    
    @media (min-width: 768px) {
      .experience-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
      }
      
      .experience-meta {
        text-align: right;
        align-items: flex-end;
      }
    }
    
    /* Education and Course Cards */
    .education-card,
    .course-card {
      padding: 1rem;
      margin: 0.5rem 0;
    }
    
    .course-header {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    
    .course-title {
      font-size: 1.125rem;
    }
    
    .course-meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.875rem;
    }
    
    .course-modules {
      margin: 0 0 0 1rem;
      padding-left: 0.5rem;
    }
    
    @media (min-width: 768px) {
      .course-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
      }
      
      .course-meta {
        text-align: right;
        align-items: flex-end;
      }
    }
    
    /* Personal Grid */
    .personal-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    @media (min-width: 600px) {
      .personal-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .personal-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    .personal-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.75rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
    }
    
    .personal-label {
      font-size: 0.875rem;
      font-weight: 600;
    }
    
    .linkedin-link {
      color: var(--primary);
      text-decoration: none;
      font-weight: 500;
    }
    
    .linkedin-link:hover {
      color: var(--primary-hover);
      text-decoration: underline;
    }
    
    @media (min-width: 768px) {
      .personal-item {
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
      }
      
      .personal-label {
        min-width: 80px;
        flex-shrink: 0;
      }
    }
  `]
})
export class ResumeComponent {
  protected readonly data = signal(portfolioData);
  protected readonly experience = computed(() => this.data().experience);
  protected readonly education = computed(() => this.data().education);
  protected readonly courses = computed(() => this.data().courses);
  protected readonly personal = computed(() => this.data().personal);
}


