import { Component, Input } from '@angular/core';
import { Group } from '../histogram.component';

@Component({
  selector: 'app-histogram-group',
  templateUrl: './histogram-group.component.html',
  styleUrls: ['./histogram-group.component.css'],
})
export class HistogramGroupComponent {
  @Input() group: Group;

  constructor() {}
}
