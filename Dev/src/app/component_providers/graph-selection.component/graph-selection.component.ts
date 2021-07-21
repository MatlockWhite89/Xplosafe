import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-graph-selection',
  templateUrl: './graph-selection.component.html',
  styleUrls: ['./graph-selection.component.css'],
})
export class GraphSelectionComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  displayParettoGraph: boolean;
  displayHistogramGraph: boolean;

  constructor(
    private graphService: GraphService,
  ) {
    this.subscription = new Subscription();
    this.displayHistogramGraph = false;
    this.displayParettoGraph = false;
  }

  ngOnInit(): void {
  }

  // Builds a Paretto Graph with Analyte Values.
  buildParetto(): void {
    this.resetDisplay();
    this.subscription.add(this.graphService.getAnalyzedTokenReportResponse().subscribe((value) => {
      const selectedCasNum = '108-88-3';
      this.graphService.buildAnalyzedDataParetto(value, selectedCasNum);
      this.displayParettoGraph = true;
    }));
  }

  // Builds a Histogram Graph with Analyte Values.
  buildHistogram(): void {
    this.resetDisplay();
    this.subscription.add(this.graphService.getAnalyzedTokenReportResponse().subscribe((value) => {
      this.graphService.buildAverageAnalyteData(value);
      this.displayHistogramGraph = true;
    }));
  }

  resetDisplay(): void {
    this.displayHistogramGraph = false;
    this.displayParettoGraph = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
