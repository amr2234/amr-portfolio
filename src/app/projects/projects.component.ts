import { Component, computed, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { portfolioData } from '../shared/data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <section class="container-px section" id="portfolio" [@fadeInUp]>
      <h1 class="text-heading" style="margin:0 0 1rem 0;">Projects</h1>

      <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem;">
        <!-- Filters removed - showing only Web projects -->
      </div>

      <div class="portfolio-grid">
        <div *ngFor="let p of projects()" class="portfolio-card card card-interactive" (click)="open(p)">
          <div class="card-image">
            <img [src]="p.image" [alt]="p.name" class="project-image" (error)="onImageError($event)" (load)="onImageLoad($event)" />
          </div>
          <div class="card-content">
            <div class="pill" style="background:rgba(255,59,127,.12);color:var(--primary);padding:.25rem .5rem;font-size:.8rem;margin-bottom:.5rem;">{{ category(p) }}</div>
            <div class="text-heading" style="font-weight:600;margin-bottom:.25rem;">{{ p.name }}</div>
            <div class="text-muted" style="font-size:.85rem;">{{ p.dates }}</div>
          </div>
        </div>
      </div>

      <div *ngIf="modal()" class="modal-backdrop" (click)="close()" (keydown.escape)="close()" tabindex="-1"></div>
      <div *ngIf="modal()" class="modal card" role="dialog" aria-modal="true">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;">
          <strong class="text-heading">{{ modal()?.name }}</strong>
          <button class="btn" (click)="close()">Close</button>
        </div>
        <div class="gallery">
          <div class="shot"></div>
          <div class="shot"></div>
          <div class="shot"></div>
        </div>
        <ul style="margin:.75rem 0 0 1rem;">
          <li *ngFor="let d of modal()?.details" class="text-body">{{ d }}</li>
        </ul>
      </div>
    </section>
  `,
  styles: [`
    .portfolio-grid{display:grid;grid-template-columns:1fr;gap:1rem}
    @media(min-width: 560px){.portfolio-grid{grid-template-columns:repeat(2,1fr)}}
    @media(min-width: 1000px){.portfolio-grid{grid-template-columns:repeat(3,1fr)}}
    .portfolio-card{position:relative;overflow:hidden;cursor:pointer;padding:0;transition:transform 0.2s ease, box-shadow 0.2s ease;display:flex;flex-direction:column;border-radius:var(--radius);background:white;border:1px solid var(--border)}
    .portfolio-card .card-image{height:180px;overflow:hidden;background:var(--surface);border-radius:var(--radius) var(--radius) 0 0}
    .portfolio-card .project-image{width:100%;height:100%;object-fit:cover;display:block;transition:transform .2s}
    .portfolio-card .card-content{padding:0.75rem;background:linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.95)), url('/sss.jpg');background-size:cover;background-position:center;background-blend-mode:overlay;flex-grow:1;border-radius:0 0 var(--radius) var(--radius)}
    .portfolio-card:hover{transform:scale(1.01) translateY(-4px);box-shadow:0 10px 25px rgba(0,0,0,0.15)}
    .portfolio-card:hover .project-image{transform:scale(1.05)}
    .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(3px);z-index:40}
    .modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);max-width:800px;width:92%;padding:1rem;z-index:41;max-height:90vh;overflow-y:auto}
    .gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem}
    @media(max-width: 600px){.gallery{grid-template-columns:1fr}}
    .shot{height:140px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)}
    @media(max-width: 600px){.shot{height:120px}}
  `]
})
export class ProjectsComponent {
  protected readonly data = signal(portfolioData);
  protected readonly projects = computed(() => this.data().projects);
  protected readonly modal = signal<{name:string;dates:string;details:string[]} | null>(null);

  protected category(p: { name:string }): string {
    return 'Web'; // All projects are Web projects
  }
  protected open(p:any){ this.modal.set(p); }
  protected close(){ this.modal.set(null); }
  protected onImageError(event: any) {
    console.log('Image failed to load:', event.target.src);
    event.target.style.display = 'none';
  }
  protected onImageLoad(event: any) {
    console.log('Image loaded successfully:', event.target.src);
  }
}


