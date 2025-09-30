import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="container-px" style="padding:2rem 0;border-top:1px solid var(--border);margin-top:2rem;text-align:center;color:var(--muted);font-size:0.9rem;">
      <div>© 2025 Amr Mohamed · .NET Developer</div>
      <div style="margin-top:0.5rem;">
        <a href="mailto:Amr.salama223@outlook.com" class="focus-ring" style="color:var(--body);text-decoration:none;">Amr.salama223@outlook.com</a>
        · <a href="tel:0567691122" class="focus-ring" style="color:var(--body);text-decoration:none;">0567691122</a>
      </div>
    </footer>
  `,
})
export class FooterComponent {}


