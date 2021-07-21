import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Bar, Dot, Line } from '../pareto.component';
import { Subscription } from 'rxjs';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-pareto-line',
  templateUrl: './pareto-line.component.html',
  styleUrls: ['./pareto-line.component.css'],
})
export class ParetoLineComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('svg1', { static: false }) svg1: ElementRef;
  @Input() bars: Bar[];
  @Input() dots: Dot[];
  @Input() lines: Line[];

  yVertices: number[];
  yVerticesPopulated: boolean;
  subscription: Subscription;
  heightModifier: number;
  widthModifier: number;
  columnGap: number;
  xOffset: number;
  yOffset: number;
  circleRadius: number;
  graphHeader?: string;
  units?: string;
  unitsArray?: any;

  constructor(private graphService: GraphService) {
    this.yVertices = [];
    this.unitsArray = [];
    this.heightModifier = 1;
    this.widthModifier = 1;
    this.yVerticesPopulated = false;
    this.subscription = new Subscription();
    this.columnGap = 0;
    this.yOffset = 30;
    this.xOffset = 80;
    this.circleRadius = 3;
    this.graphHeader = this.graphService.getGraphHeader();
    this.units = this.graphService.getUnits();
    if (!this.units){
      this.units = '';
    }
    for (let i = 0; i < this.units.length; i++){
      this.unitsArray.push(this.units.charAt(i));
    }
  }

  ngOnInit(): void {
    this.subscription.add(
      this.graphService.dataPopulated.subscribe((value) => {
        if (value && this.graphService.paretoGraph) {
          this.yVerticesPopulated = false;
          this.yVertices = [];
          this.heightModifier = 1;
          this.bars = this.graphService.getBars();
          this.determineHeightModifier();
          this.determineYVertices();
          this.drawParetoDiagram();
        }
      })
    );

    this.determineHeightModifier();
    this.determineYVertices();
  }

  // determines the column Gap between the bars.
  // ** Note Must also match the Build dots method in the pareto component **
  // ** or will have to overwrite the x placement of each to match here in this function. **
  determineColumnGap(): void {
    // currently we are setting the column gap = to the width of the columns / 2. which in our default = 10 after evaluation;
    this.columnGap = this.bars[0].width / 2;
  }

  // Readjust the height of all nodes based on the container and the maxHeight value of the dots.
  determineHeightModifier(): void {
    this.determineColumnGap();
    this.heightModifier = 1;
    if (!document.getElementById('svg1') || !document.getElementById('svg1').clientHeight)
    {
      return;
    }

    const maxHeight = document.getElementById('svg1').clientHeight - 30;
    const evaluatedHeight = this.dots[this.dots.length - 1].y / maxHeight;
    if (evaluatedHeight * this.heightModifier > 1) {
      // Reduce the overall size of the graph.
      while (evaluatedHeight * this.heightModifier > 1) {
        this.heightModifier /= 2;
      }
    } else if (evaluatedHeight * 2 < 1) {
      // Increase the overall size of the graph.
      while (evaluatedHeight * this.heightModifier * 2 < 1) {
        this.heightModifier *= 2;
      }
    } else {
      return;
    }
  }

  // Sets the Y vertices based on the lines max height.
  determineYVertices(): void {
    const maxHeight = this.lines[this.lines.length - 1].y2;
    this.yVertices = [];

    for (let i = 1; i < 11; i++) {
      const temp: number = Math.round(maxHeight * (0.1 * i) * 100) / 100;
      this.yVertices.push(+temp.toFixed(3));
    }

    this.yVerticesPopulated = true;
  }

  // Overwrites the values for the graph displays.
  ngAfterViewInit(): void {
    this.drawParetoDiagram();
  }

  drawVerticesParameters(container: HTMLElement): void {
    // Draw the Header Label values
    if (!container){
      return;
    }

    const headerName = 'parettoHeader';
    const headerText = document.getElementById(headerName);
    // headerText.setAttributeNS(null, 'x', ((container.clientWidth / 3)).toString());

    if (!headerText) {
      return;
    }

    headerText.setAttributeNS(null, 'x', (this.xOffset).toString());
    headerText.setAttributeNS(null, 'y', this.yOffset.toString());
    headerText.setAttributeNS(null, 'font-weight', 'bold');
    headerText.setAttributeNS(null, 'alignment', 'center');

    // Draw the Footer Label values
    for (let index = 0; index < this.units.length; index++)
    {
      const footerName = 'parettoFooter' + index;
      const footerText = document.getElementById(footerName);
      if (!footerText)
      {
        return;
      }

      if (footerText){
        footerText.setAttributeNS(null, 'max-width', '1ch');
        footerText.setAttributeNS(null, 'x', '0');
        footerText.setAttributeNS(null, 'font-weight', 'bold');
        footerText.setAttributeNS(
          null,
          'y',
          (((container.clientHeight / 2) - this.units.length * 5) + (index * 15)).toString()
        );
      }
    }
  }

  // draws the bottom line.
  drawBaseline(container: HTMLElement): void {
    if (!container) {
      return;
    }

    const line = document.getElementById('baseline');
    if (!line) {
      return;
    }
    line.setAttributeNS(null, 'x1', this.xOffset.toString());
    line.setAttributeNS(null, 'y1', (container.clientHeight - this.yOffset).toString());
    line.setAttributeNS(null, 'x2', (container.clientWidth - this.xOffset).toString());
    line.setAttributeNS(null, 'y2', (container.clientHeight - this.yOffset).toString());
    line.setAttributeNS(null, 'stroke', 'black');
    line.setAttributeNS(null, 'stroke-width', '1');
    line.setAttributeNS(null, 'opacity', '0.5');
  }

  // The following will draw the Graph lines and Y vertices based on the calculated inputs.
  drawGraphYVertices(container: HTMLElement): void {
    if (!container){
      return;
    }

    this.drawBaseline(container);
    for (const l of this.yVertices) {
      const line = document.getElementById(l.toString()); // Works
      if (!line) {
        continue;
      }
      line.setAttributeNS(null, 'x1', this.xOffset.toString());
      line.setAttributeNS(
        null,
        'y1',
        (((container.clientHeight - this.yOffset - l * this.heightModifier) * 1000) / 1000).toString()
      );
      line.setAttributeNS(null, 'x2', (container.clientWidth - this.xOffset).toString());
      line.setAttributeNS(
        null,
        'y2',
        (((container.clientHeight - this.yOffset - l * this.heightModifier) * 1000) / 1000).toString()
      );
      line.setAttributeNS(null, 'stroke', 'black');
      line.setAttributeNS(null, 'stroke-width', '1');
      line.setAttributeNS(null, 'opacity', '0.5');

      // Draw the Label values
      const elementName = 'y' + l;
      const text = document.getElementById(elementName);
      text.setAttributeNS(null, 'x', (this.xOffset / 2).toString());
      text.setAttributeNS(
        null,
        'y',
        (container.clientHeight - this.yOffset - l * this.heightModifier).toString()
      );
    }
  }

  // draws the entirety of the Pareto diagram.
  drawParetoDiagram(): void {
    const containerEl = document.getElementById('svg1');
    if (!containerEl){
      return;
    }

    this.drawVerticesParameters(containerEl);
    this.drawGraphYVertices(containerEl);

    for (const l of this.lines) {
      // Draw the line between each dot.
      const line = document.getElementById(l.id); // Works
      if (!line) {
        continue;
      }
      line.setAttributeNS(null, 'x1', (this.xOffset + l.x1).toString());
      line.setAttributeNS(
        null,
        'y1',
        (containerEl.clientHeight - this.yOffset - l.y1 * this.heightModifier).toString()
      );
      line.setAttributeNS(null, 'x2', (this.xOffset + l.x2).toString());
      line.setAttributeNS(
        null,
        'y2',
        (containerEl.clientHeight - this.yOffset - l.y2 * this.heightModifier).toString()
      );
      line.setAttributeNS(null, 'stroke', 'orange');
      line.setAttributeNS(null, 'stroke-width', '2');
    }

    let widthOffset = 0;
    for (const [index, b] of this.bars.entries()) {
      // Draw the Bar.
      const rect = document.getElementById(b.id);
      if (!rect) {
        continue;
      }
      if (b.height) {
        rect.setAttributeNS(
          null,
          'y',
          (containerEl.clientHeight - this.yOffset - b.height * this.heightModifier).toString()
        );
      } else {
        rect.setAttributeNS(null, 'y', (containerEl.clientHeight - this.yOffset).toString());
      }
      rect.setAttributeNS(
        null,
        'x',
        (this.xOffset + widthOffset * this.widthModifier).toString()
      );
      rect.setAttributeNS(null, 'width', b.width.toString());
      if (b.height) {
        rect.setAttributeNS(
          null,
          'height',
          (b.height * this.heightModifier).toString()
        );
      } else {
        rect.setAttributeNS(null, 'height', '0');
      }
      rect.setAttributeNS(null, 'fill', b.colour.toString());
      rect.setAttributeNS(null, 'title', b.height.toString());

      // Set the Label under the bar.
      const text = document.getElementById('text' + b.id);
      text.setAttributeNS(null, 'x', (this.xOffset + widthOffset * this.widthModifier - this.widthModifier / 2).toString());
      text.setAttributeNS(null, 'y', (containerEl.clientHeight - this.yOffset).toString());
      if (index < 10){ text.setAttributeNS(null, 'dx', (b.width / 3).toString()); }
      text.setAttributeNS(null, 'dy', '10');
      text.setAttributeNS(null, 'length', b.height.toString().length.toString());

      // Draw the dot above the Bar.
      const circle = document.getElementById(this.dots[index].id);
      if (!circle) {
        continue;
      }
      circle.setAttributeNS(null, 'r', this.circleRadius.toString());
      circle.setAttributeNS(null, 'cx', (this.xOffset + this.dots[index].x).toString());
      circle.setAttributeNS(
        null,
        'cy',
        (
          containerEl.clientHeight - this.yOffset -
          this.dots[index].y * this.heightModifier
        ).toString()
      );
      circle.setAttributeNS(null, 'fill', '#708090');
      widthOffset += this.columnGap + b.width;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
