import { EmbeddedViewRef, Injectable, TemplateRef } from '@angular/core';

@Injectable()
export class LayoutCacheService {
  private readonly regions: Map<
    string,
    TemplateRef<any> | EmbeddedViewRef<any>
  >;

  constructor() {
    this.regions = new Map<string, any>();
  }

  fetchRegionByName(name: string): TemplateRef<any> | EmbeddedViewRef<any> {
    return this.regions.get(name);
  }

  fetchRegions(): Map<string, TemplateRef<any> | EmbeddedViewRef<any>> {
    return this.regions;
  }

  setRegion(
    name: string,
    tempRef: TemplateRef<any> | EmbeddedViewRef<any>
  ): void {
    this.regions.set(name.toLowerCase(), tempRef);
  }
}
