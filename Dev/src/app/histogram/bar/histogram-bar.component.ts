import { Component, Input } from '@angular/core';
import { Bar } from '../histogram.component';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-histogram-bar',
  templateUrl: './histogram-bar.component.html',
  styleUrls: ['./histogram-bar.component.css'],
})
export class HistogramBarComponent {
  @Input() bar: Bar;

  constructor(
    private graphService: GraphService
  ) {}
}
