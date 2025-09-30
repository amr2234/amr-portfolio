import { Component, computed, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { portfolioData } from '../shared/data';
 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <section id="home" class="container-px section">
      <header class="card hero-card">
        <div class="hero-content">
          <h1 class="text-heading hero-title">{{ hero().headline }}</h1>
          <p class="text-muted hero-subtitle">{{ hero().subheadline }}</p>
          <div class="hero-ctas">
            <a *ngFor="let c of hero().ctas" [href]="c.label === 'Download CV' ? 'https://drive.google.com/file/d/1pYcGCBiweuMeH592UtCQL6XTAFZUU5-l/view?usp=sharing' : c.href" [target]="c.label === 'Download CV' ? '_blank' : '_self'" [rel]="c.label === 'Download CV' ? 'noopener' : ''" class="btn btn-primary focus-ring">{{ c.label }}</a>
          </div>
          <div class="hero-links">
            <a href="https://www.linkedin.com/in/amr-salama-37282722b" target="_blank" rel="noopener" class="btn" style="background:transparent;">LinkedIn</a>
            <a href="#contact" class="btn" style="background:transparent;">Email</a>
          </div>
        </div>
        <div class="portrait card hero-portrait">
          <img src="sss.jpg" alt="Amr Mohamed" class="portrait-image" onerror="console.log('Image failed to load')">
        </div>
      </header>

      <section class="section" style="padding-top:0;">
        <h2 class="text-heading" style="margin:.5rem 0; font-size:1.25rem;">About</h2>
        <p class="text-body" style="line-height:1.7;">{{ about().summary }}</p>
      </section>

      <section id="services" class="section" style="padding-top:0;">
        <h2 class="text-heading" style="margin:.5rem 0; font-size:1.25rem;">What I Do</h2>
        <div class="services-grid">
          <div *ngFor="let s of services()" class="service-card card scale-hover">
            <div class="text-heading service-title">{{ s.title }}</div>
            <div class="text-muted service-desc">{{ s.desc }}</div>
          </div>
        </div>
      </section>

      <section id="skills" class="section" style="padding-top:0;">
        <h2 class="text-heading" style="margin:.5rem 0; font-size:1.25rem;">Skills</h2>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
          <span *ngFor="let sk of skills()" class="pill hairline" style="padding:.375rem .75rem;font-size:.9rem;color:var(--body);">{{ sk.name }}</span>
        </div>
      </section>

      <section id="portfolio" class="section" style="padding-top:0;">
        <h2 class="text-heading" style="margin:.5rem 0 1rem 0; font-size:1.25rem;">Projects</h2>
        <!-- Filters removed - showing only Web projects -->
        <div class="portfolio-grid">
          <div *ngFor="let p of projects(); let i = index" class="portfolio-card card card-interactive" (click)="open(p)">
            <div class="card-image" [style.background-image]="getProjectBackgroundImage(i)">
              <div class="image-overlay"></div>
            </div>
            <div class="card-content">
              <div class="pill" style="background:rgba(255,59,127,.12);color:var(--primary);padding:.25rem .5rem;font-size:.8rem;margin-bottom:.5rem;">{{ category(p) }}</div>
              <div class="text-heading" style="font-weight:600;margin-bottom:.25rem;">{{ p.name }}</div>
              <div class="text-muted" style="font-size:.85rem;">{{ p.dates }}</div>
              
              <!-- Add links under Exab LMS -->
              <div *ngIf="p.name === 'Exab LMS'" class="project-links" style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap;">
                <a href="#" class="project-link" (click)="openProjectLink($event, 'https://training.kawla.gov.sa/home')">
                  <img src="/lms2.png" alt="Project Link 1" class="link-image" />
                  <span class="link-text">King Abdulaziz</span>
                </a>
                <a href="#" class="project-link" (click)="openProjectLink($event, 'https://tr.moh.gov.sa/home')">
                  <img src="/lms1.png" alt="Project Link 2" class="link-image" />
                  <span class="link-text">Ministry Of Health</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="modal()" class="modal-backdrop" (click)="close()"></div>
        <div *ngIf="modal()" class="modal card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;">
            <strong class="text-heading">{{ modal()?.name }}</strong>
            <button class="btn" (click)="close()">Close</button>
          </div>
          <ul style="margin:.75rem 0 0 1rem;">
            <li *ngFor="let d of modal()?.details" class="text-body">{{ d }}</li>
          </ul>
        </div>
      </section>

      <section id="resume" class="section" style="padding-top:0;">
        <h2 class="text-heading" style="margin:.5rem 0 1rem 0; font-size:1.25rem;">My Resume</h2>
        <div class="tabs card" style="display:flex;gap:.5rem;padding:.5rem;margin-bottom:1rem;">
          <button *ngFor="let t of resumeTabs" (click)="setResumeTab(t)" class="pill btn" [style.background]="activeResumeTab()===t?'rgba(255,59,127,.12)':'transparent'" [style.color]="activeResumeTab()===t?'var(--heading)':'var(--body)'">{{ t }}</button>
        </div>

        <div *ngIf="activeResumeTab()==='Education'" class="timeline-grid">
          <div *ngFor="let ed of education()" class="timeline card">
            <div class="year-pill pill">{{ ed.graduation }}</div>
            <div class="text-heading" style="font-weight:600;">{{ ed.degree }}</div>
            <div class="text-muted">{{ ed.university }}</div>
            <p class="text-body">Graduated {{ ed.graduation }}</p>
          </div>
        </div>

        <div *ngIf="activeResumeTab()==='Job Experience'" class="timeline-grid">
          <div *ngFor="let e of experience()" class="timeline card">
            <div class="year-pill pill">{{ e.dates }}</div>
            <div class="text-heading" style="font-weight:600;">{{ e.role }}</div>
            <div class="text-muted">{{ e.company }} — {{ e.location }}</div>
            <ul class="text-body" style="margin:.5rem 0 0 1rem;">
              <li *ngFor="let d of e.details">{{ d }}</li>
            </ul>
          </div>
        </div>

        <div *ngIf="activeResumeTab()==='Certifications'" class="timeline-grid">
          <div *ngFor="let c of courses()" class="timeline card">
            <div class="year-pill pill">{{ c.dates }}</div>
            <div class="text-heading" style="font-weight:600;">{{ c.title }}</div>
            <div class="text-muted">{{ c.provider }} — {{ c.hours }}h</div>
            <ul class="text-body" style="margin:.5rem 0 0 1rem;">
              <li *ngFor="let m of c.modules">{{ m }}</li>
            </ul>
          </div>
        </div>

        <div *ngIf="activeResumeTab()==='Skills'" class="skills-grid">
          <div *ngFor="let sk of skills()" class="skill-row">
            <div class="text-body">{{ sk.name }}</div>
            <div class="dots">
              <span *ngFor="let i of [1,2,3,4,5]" class="dot" [class.filled]="i <= sk.level"></span>
            </div>
          </div>
        </div>
      </section>
      
      <section id="contact" class="section" style="padding-top:0;">
        <h2 class="text-heading" style="margin:.5rem 0 1rem 0; font-size:1.25rem;">Get In Touch</h2>
        <div class="contact-preview card" style="padding:2rem;text-align:center;">
          <p class="text-body" style="margin-bottom:1.5rem;">Feel free to reach out for opportunities or collaborations.</p>
          <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
            <a href="mailto:Amr.salama223@outlook.com" class="btn btn-primary focus-ring">Send Email</a>
            <a href="tel:0567691122" class="btn" style="background:transparent;">Call Me</a>
          </div>
        </div>
      </section>
    </section>
  `,
  styles: [
    `
    /* Hero Section Responsive Styles */
    .hero-card {
      padding: 1rem;
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      align-items: center;
      text-align: center;
      width: 100%;
      max-width: 100%;
    }
    
    .hero-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 100%;
    }
    
    .hero-title {
      margin: 0;
      font-size: 1.875rem;
      line-height: 1.2;
      word-wrap: break-word;
    }
    
    .hero-subtitle {
      margin: 0;
      font-size: 1rem;
      line-height: 1.5;
      word-wrap: break-word;
    }
    
    .hero-ctas {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
    }
    
    .hero-links {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
    }
    
    .hero-portrait {
      width: 200px;
      height: 240px;
      background: linear-gradient(180deg, rgba(255,59,127,.1), transparent), var(--surface);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius);
      box-shadow: 0 10px 30px var(--primary-glow);
      flex-shrink: 0;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      border: 2px solid rgba(255,59,127,.3);
    }
    
    .portrait-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: calc(var(--radius) - 2px);
      display: block;
    }
    
    /* Tablet styles */
    @media (min-width: 768px) {
      .hero-card {
        padding: 1.5rem;
        flex-direction: row;
        text-align: left;
        align-items: flex-start;
      }
      
      .hero-content {
        flex: 1;
      }
      
      .hero-title {
        font-size: 2.25rem;
      }
      
      .hero-subtitle {
        font-size: 1.125rem;
      }
      
      .hero-ctas {
        justify-content: flex-start;
      }
      
      .hero-links {
        justify-content: flex-start;
      }
      
      .hero-portrait {
        width: 220px;
        height: 260px;
      }
    }
    
    /* Desktop styles */
    @media (min-width: 1024px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-portrait {
        width: 240px;
        height: 280px;
      }
    }
    
    /* Services Grid Responsive */
    .services-grid{display:grid;grid-template-columns:1fr;gap:1rem;width:100%;max-width:100%}
    .service-card{padding:1.5rem 1rem;width:100%;max-width:100%;text-align:center}
    
    .service-title {
      font-weight: 700;
      font-size: 1.125rem;
      margin-bottom: 0.75rem;
      color: var(--heading);
    }
    
    .service-desc {
      font-size: 0.9rem;
      line-height: 1.5;
    }
    
    @media(min-width: 560px){.services-grid{grid-template-columns:repeat(2,1fr)}}
    @media(min-width: 1000px){.services-grid{grid-template-columns:repeat(4,1fr)}}

    /* Portfolio Grid Responsive */
    .portfolio-grid{display:grid;grid-template-columns:1fr;gap:1rem;width:100%;max-width:100%}
    @media(min-width: 560px){.portfolio-grid{grid-template-columns:repeat(2,1fr)}}
    @media(min-width: 1000px){.portfolio-grid{grid-template-columns:repeat(3,1fr)}}
    .portfolio-card{position:relative;overflow:hidden;cursor:pointer;padding:0;width:100%;max-width:100%;transition:transform 0.2s ease, box-shadow 0.2s ease;display:flex;flex-direction:column;border-radius:var(--radius);background:var(--surface);border:1px solid var(--border);height:320px}
    .portfolio-card .card-image{height:220px;background:white;background-size:cover;background-position:center;background-repeat:no-repeat;position:relative;transition:transform .2s;border-radius:var(--radius) var(--radius) 0 0}
    .portfolio-card .image-overlay{position:absolute;inset:0;background:linear-gradient(180deg, rgba(255,59,127,.08), rgba(0,0,0,.2));border-radius:var(--radius) var(--radius) 0 0}
    .portfolio-card .card-content{padding:0.75rem;background:var(--surface);flex-grow:1;border-radius:0 0 var(--radius) var(--radius);display:flex;flex-direction:column;justify-content:center}
    .portfolio-card:hover{transform:scale(1.01) translateY(-4px);box-shadow:0 10px 25px rgba(0,0,0,0.15)}
    .portfolio-card:hover .card-image{transform:scale(1.03)}
    
    /* Project Links Styling */
    .project-links{margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap}
    .project-link{display:flex;align-items:center;gap:.375rem;padding:.375rem .5rem;background:rgba(255,59,127,.08);border:1px solid rgba(255,59,127,.2);border-radius:calc(var(--radius) / 2);text-decoration:none;color:var(--heading);font-size:.8rem;transition:all 0.2s ease}
    .project-link:hover{background:rgba(255,59,127,.15);transform:translateY(-1px)}
    .link-image{width:40px;height:40px;object-fit:cover;border-radius:calc(var(--radius) / 3)}
    .link-text{font-weight:500}
    .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(3px);z-index:40}
    .modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);max-width:800px;width:92%;padding:1rem;z-index:41}
    .gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem}
    .shot{height:140px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}

    /* Timeline Grid Responsive */
    .timeline-grid{display:grid;grid-template-columns:1fr;gap:1rem;width:100%;max-width:100%}
    @media(min-width: 900px){.timeline-grid{grid-template-columns:repeat(2,1fr)}}
    .timeline{padding:1rem;position:relative;width:100%;max-width:100%}
    .year-pill{background:rgba(255,59,127,.12);color:var(--primary);padding:.25rem .6rem;font-size:.8rem;display:inline-block;margin-bottom:.35rem}
    .tabs button{border:1px solid var(--border)}

    /* Skills Grid Responsive */
    .skills-grid{display:grid;grid-template-columns:1fr;gap:.75rem;width:100%;max-width:100%}
    @media(min-width: 900px){.skills-grid{grid-template-columns:repeat(2,1fr)}}
    .skill-row{display:flex;justify-content:space-between;align-items:center;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:.5rem .75rem;width:100%;max-width:100%}
    .dots{display:flex;gap:.25rem}
    .dot{width:10px;height:10px;border-radius:50%;background:rgba(255,59,127,.15);box-shadow:inset 0 0 0 1px var(--border);transition:background-color 0.2s ease}
    .dot.filled{background:var(--primary);box-shadow:inset 0 0 0 1px var(--primary)}
    
    /* Mobile specific fixes */
    @media (max-width: 767px) {
      .hero-card {
        margin-left: 0;
        margin-right: 0;
      }
      
      .services-grid,
      .portfolio-grid,
      .timeline-grid,
      .skills-grid {
        margin: 0;
        padding: 0;
      }
      
      .service-card,
      .portfolio-card,
      .timeline,
      .skill-row {
        margin: 0;
      }
      
      /* Fix button overflow */
      .hero-ctas .btn,
      .hero-links .btn {
        font-size: 0.875rem;
        padding: 0.5rem 0.875rem;
        white-space: nowrap;
      }
      
      /* Ensure pills don't overflow */
      .pill {
        font-size: 0.8rem;
        padding: 0.25rem 0.5rem;
      }
    }
    `
  ]
})
export class HomeComponent {
  protected readonly data = signal(portfolioData);
  protected readonly hero = computed(() => this.data().hero);
  protected readonly about = computed(() => this.data().about);
  protected readonly services = computed(() => this.data().services);
  protected readonly skills = computed(() => this.data().skills);
  protected readonly education = computed(() => this.data().education);
  protected readonly experience = computed(() => this.data().experience);
  protected readonly courses = computed(() => this.data().courses);
  protected readonly projects = computed(() => this.data().projects);

  // portfolio controls - removed filters, showing all as Web projects
  protected readonly modal = signal<{name:string;dates:string;details:string[]} | null>(null);
  protected category(p: { name:string }): string {
    return 'Web'; // All projects are Web projects
  }
  protected open(p:any){ this.modal.set(p); }
  protected close(){ this.modal.set(null); }
  
  protected openProjectLink(event: Event, linkType: string) {
    event.preventDefault();
    event.stopPropagation();
    window.open(linkType , '_blank');
  } 
  
  protected getProjectBackgroundImage(index: number): string {
    const images = [
      '/exab-lms.png',
      '/municipality-violations.png', 
      '/ticketing-system.png'
    ];
    const imageUrl = images[index % images.length];
    return `url('${imageUrl}')`;
  }

  // resume tabs
  protected readonly resumeTabs = ['Education','Job Experience','Certifications','Skills'];
  protected readonly activeResumeTab = signal<'Education'|'Job Experience'|'Certifications'|'Skills'>('Education');
  protected setResumeTab(t:any){ this.activeResumeTab.set(t); }
}


