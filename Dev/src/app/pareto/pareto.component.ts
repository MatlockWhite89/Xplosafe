import {Component, OnDestroy, OnInit} from '@angular/core';
import {GraphService} from '../services/graph.service';
import {Subscription} from 'rxjs';
import {ModalWindowService} from '../services/modal-window.service';

// a Line interface to be used by the Pareto Project.
export interface Line {
  id: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

// a Bar interface to be used by the Pareto Project.
export interface Bar {
  id: string;
  colName: string;
  height: number;
  width: number;
  colour: any;
}

// a Dot interface to be used by the Pareto Project.
export interface Dot {
  id: string;
  y: number;
  x: number;
}

@Component({
  selector: 'app-pareto',
  templateUrl: './pareto.component.html',
  styleUrls: ['./pareto.component.css'],
})
export class ParetoComponent implements OnInit, OnDestroy {
  bars: Bar[];
  dots: Dot[];
  lines: Line[];
  offset: number;
  subscription: Subscription;
  displayGraph: boolean;

  constructor(
    private graphService: GraphService,
    private modalWindowService: ModalWindowService,
  ) {
    this.offset = 0;
    this.bars = [];
    this.dots = [];
    this.lines = [];
    this.subscription = new Subscription();
    this.displayGraph = false;
  }

  ngOnInit(): void {
    this.subscription.add(this.graphService.dataPopulated.subscribe(value => {
      if (value && this.graphService.paretoGraph){
        this.displayGraph = false;
        this.bars = [];
        this.bars = this.graphService.getBars();
        this.createColors();
        this.sortBars();
        this.buildDots();
        this.buildLines();
        this.displayGraph = true;
      }
      else{
        this.displayGraph = false;
        this.bars = [];
        this.lines = [];
        this.dots = [];
      }
    }));

    this.subscription.add(this.modalWindowService.popUpContextUpdated.subscribe(value => {
      if (!value){
        this.displayGraph = false;
        this.bars = [];
        this.lines = [];
        this.dots = [];
      }
    }));
  }

  // determines the colors for each bar to be rendered.
  createColors(): void {
    let colorArray: Array<string>;
    colorArray = this.getRandomColorStrings(this.bars.length);
    this.bars.forEach((bar, index) => {
      bar.colour = colorArray[index];
    });
  }

  // assigns a random color to each of the bars.
  getRandomColorStrings(x: number): string[] {
    const ret = [];
    // let count = 0;
    for (let i = 0; i < x; i++) {
      const c = this.graphService.colorModel.getColorAtIndex((Math.round((Math.random() * this.graphService.colorModel.colors.length))));
      ret.push(c);
      //   if (i % 2 === 0) {
      //     // Light display
      //     if (count > this.graphService.colorModel.LgreenGradient.length) { count = 0; }
      //     const c = this.graphService.colorModel.LgreenGradient[count].colorHexValue;
      //     ret.push(c);
      //   }
      //   else {
      //     // dark display
      //     const c = this.graphService.colorModel.DgreenGradient[count].colorHexValue;
      //     ret.push(c);
      //     count++;
      //   }
    }
    return ret;
  }

  // Resets the Array Values excluding the Bars Value
  resetValues(): void {
    this.dots = [];
    this.lines = [];
    this.offset = 0;
  }

  // Build all the dots based on the Bar heights.
  buildDots(): void {
    this.resetValues();
    let widthOffset = 0;
    const columnGap = this.bars[0].width / 2;
    let index = 1;
    for (const b of this.bars){
      let height;
      if (b.height) { height = b.height + this.offset; }
      else { height = this.offset; }
      const dot =
      {
        id: 'circle' + index,
        y: height,
        x: (b.width / 2) + widthOffset,
      };

      this.offset += b.height;
      widthOffset += b.width + columnGap;
      index++;
      this.dots.push(dot as Dot);
    }
  }

  // Format the Line data between the dots.
  buildLines(): void {
    let previousDot = null;
    let id = 1;
    for (const dot of this.dots)
    {
      if (previousDot){
        this.addLine(previousDot, dot, id);
        id++;
      }

      previousDot = dot;
    }

    this.lines.sort((a, b) => a.y2 > b.y2 ? -1 : a.y2 < b.y2 ? 1 : 0);
    this.lines.reverse();
  }

  // Instantiates the Line onto our local SVG.
  addLine(p1: Dot, p2: Dot, id): void {
    const x1 = p1.x;
    const x2 = p2.x;
    const y1 = p1.y;
    const y2 = p2.y;
    const line = {
      id: 'line' + id,
      x1,
      y1,
      x2,
      y2
    };

    this.lines.push(line as Line);
  }

  // Sort the bars from highest height to lowest.
  sortBars(): void
  {
    this.bars.sort((a, b) => a.height < b.height ? -1 : a.height > b.height ? 1 : 0);
    this.bars.reverse();
    let i = 1;
    for (const b of this.bars)
    {
      b.id = 'rect' + i;
      i++;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
