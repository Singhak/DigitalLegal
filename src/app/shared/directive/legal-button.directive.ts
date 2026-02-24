// src/app/shared/directives/legal-button.directive.ts
import { Directive, ElementRef, HostBinding, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: 'button[appLegalBtn]', // Targets buttons with this attribute
  standalone: true
})
export class LegalButtonDirective implements OnInit {
  private el = inject(ElementRef);

  @Input() variant: 'primary' | 'outline' | 'text' = 'primary';

  @HostBinding('class') get hostClasses() {
    return `legal-btn-${this.variant}`;
  }

  ngOnInit() {
    // Forcefully remove Bootstrap's default borders and browser resets
    const style = this.el.nativeElement.style;
    style.border = 'none';
    style.outline = 'none';
  }
}