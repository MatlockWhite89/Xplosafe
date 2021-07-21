import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class MouseHoverDirective implements OnInit {
  @HostBinding('style.border') border: string;

  @HostListener('mouseover') onMouseOver() {
    this.border = '2px solid white';
  }

  @HostListener('mouseout') onMouseOut() {
    this.border = '2px solid transparent';
  }

  ngOnInit(): void {
    this.border = '2px solid transparent';
  }
}
