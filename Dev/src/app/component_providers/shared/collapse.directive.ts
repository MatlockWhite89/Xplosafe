import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCollapse]',
})
export class CollapseDirective {
  isVisible = true;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event']) toggleOpen() {
    const nextEl = this.renderer.nextSibling(this.elRef.nativeElement);
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.renderer.addClass(nextEl, 'collapse');
    } else {
      this.renderer.removeClass(nextEl, 'collapse');
    }
  }
}
