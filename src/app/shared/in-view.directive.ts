import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[inView]'
})
export class InViewDirective implements OnDestroy {
  @Input('inView') classToAdd: string = 'in-view';
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef) {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (this.el.nativeElement as HTMLElement).classList.add(this.classToAdd);
          }
        }
      }, { threshold: 0.3 });
      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}


