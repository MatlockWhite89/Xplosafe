import { Component, Input, Optional } from '@angular/core';
@Component({
  selector: 'app-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.css'],
  providers: [LayoutWrapperComponent],
})
export class LayoutWrapperComponent {
  /*
   * The following properties are currently here to allow the parent component
   * to pass strings that correlate to CSS class selectors defined in this
   * component's CSS file. My thinking was to allow common styles could be defined
   * once and reused again even though the parent component wouldn't know where it
   * is defined. Each property binds to the a specific element in the template.
   */
  @Optional() @Input() cssHeaderOverride: string;
  @Optional() @Input() cssNavOverride: string;
  @Optional() @Input() cssArticleOverride: string;
  @Optional() @Input() cssSideOverride: string;
  @Optional() @Input() cssAdOverride: string;
  @Optional() @Input() cssFooterOverride: string;
  @Optional() @Input() cssWrapperOverride: string | string[];

  constructor() {}

  get headerSelectors(): any {
    let headerClasses;
    headerClasses = {
      'base-head': true,
    };
    if (this.cssHeaderOverride) {
      headerClasses[this.cssHeaderOverride] = true;
    }
    return headerClasses;
  }

  get navSelectors(): any {
    let navClasses;
    navClasses = {
      'base-nav': true,
    };
    if (this.cssNavOverride) {
      navClasses[this.cssNavOverride] = true;
    }
    return navClasses;
  }

  get adSelectors(): any {
    let adClasses;
    adClasses = {
      'base-ad': true,
    };
    if (this.cssAdOverride) {
      adClasses[this.cssAdOverride] = true;
    }
    return adClasses;
  }

  get asideSelectors(): any {
    let asideClasses;
    asideClasses = {
      'base-side': true,
    };
    if (this.cssSideOverride) {
      asideClasses[this.cssSideOverride] = true;
    }
    return asideClasses;
  }

  get footerSelectors(): any {
    let footerClasses;
    footerClasses = {
      'base-footer': true,
    };
    if (this.cssFooterOverride) {
      footerClasses[this.cssFooterOverride] = true;
    }
    return footerClasses;
  }

  get articleSelectors(): any {
    let articleClasses;
    articleClasses = {
      'base-content': true,
    };

    if (this.cssArticleOverride) {
      articleClasses[this.cssArticleOverride] = true;
    }

    return articleClasses;
  }

  get wrapperSelectors(): any {
    let wrapperClasses;
    wrapperClasses = {
      'base-wrapper-all': true,
    };
    if (this.cssWrapperOverride) {
      if (typeof this.cssWrapperOverride == 'string') {
        wrapperClasses[this.cssWrapperOverride] = true;
      } else {
        for (let value in this.cssWrapperOverride) {
          wrapperClasses[value] = true;
        }
      }
    } else {
      wrapperClasses['base-wrapper'] = true;
    }
    return wrapperClasses;
  }
}
