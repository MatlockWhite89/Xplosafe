import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUserComponentSelector]',
})
export class UserComponentSelectorDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef
  ) {}

  @Input() set appUserComponentSelector(condition: boolean) {
    if (condition) {
      console.log('Creating an embedded view.');
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      console.log('Clearing the view container.');
      this.viewContainerRef.clear();
    }
  }
}
