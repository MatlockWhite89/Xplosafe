import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appCssToggle]',
})
export class CssToggleDirective {
  @HostBinding('class.collapsed') isCollapsed = true;
  constructor(private elRef: ElementRef) {}

  @HostListener('click', ['$event']) toggleOpen(event: Event) {
    this.isCollapsed = !this.isCollapsed;
  }
}
