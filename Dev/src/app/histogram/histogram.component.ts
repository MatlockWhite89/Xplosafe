import {Component, OnDestroy, OnInit} from '@angular/core';
import { max } from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {GraphService} from '../services/graph.service';
import {ColorSelectionModel} from '../shared/color-selection.model';
import {group} from '@angular/animations';


export interface Bar {
  id: string;
  colName: string;
  height: any;
  width: any;
  colour: any;
}

export interface Group {
  barGroupName: string;
  bars: Array<Bar>;
}

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css'],
})
export class HistogramComponent implements OnInit, OnDestroy {
  /*
  Groups are the collection of bar graphs.
  */
  groups: Group[];

  /*
   The members are the unique collection of all bars. Used for the legend.
   */
  members: Bar[];
  subscriptions: Subscription;
  graphHeader: string;

  constructor(private graphService: GraphService){
    this.groups = [];
    this.members = [];
    this.graphHeader = '';
    this.subscriptions = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.graphService.dataPopulated.subscribe((value) => {
      if (value && !this.graphService.paretoGraph){
        this.groups = [];
        this.members = [];
        this.graphHeader = this.graphService.getGraphHeader();
        const groups = this.filterGroups(this.graphService.getGroups());
        const bars = this.filterBars(this.graphService.getBars());
        if (groups.length < 1 || bars.length < 1) {
          this.groups = this.buildDefaultData();
        }
        else{
          this.groups = groups;
          for (const bar of bars){
            if (this.members.length < 1){
              this.members.push(bar);
            }
            else if (!this.members.includes(bar) && !this.members.some((member) => member.colName === bar.colName)){
              this.members.push(bar);
            }
          }

          this.determineColors();
        }
      }
    }));
  }

  filterGroups(unfiltered: Group[]): Group[] {
    const groupArray = [];
    for (const g of unfiltered){
      g.bars = this.filterBars(g.bars);
      groupArray.push(g);
    }
    return groupArray;
  }

  filterBars(unfiltered: Bar[]): Bar[] {
    const barArray = [];
    for (const b of unfiltered){
      if (b.height > 0){
        barArray.push(b);
      }
    }

    return barArray;
  }
  buildDefaultData(): Group[] {
    const firstGroup: Group = {
      barGroupName: 'Group 1',
      bars: [
        {
          id: '',
          width: '',
          colName: 'Column1',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column2',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column3',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column4',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
      ],
    };
    const secondGroup: Group = {
      barGroupName: 'Group 2',
      bars: [
        {
          id: '',
          width: '',
          colName: 'Column1',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column2',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column3',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
      ],
    };
    const thirdGroup: Group = {
      barGroupName: 'Group 3',
      bars: [
        {
          id: '',
          width: '',
          colName: 'Column1',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column2',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column3',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column4',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column5',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column6',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column7',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
      ],
    };
    const fourthGroup: Group = {
      barGroupName: 'Group 4',
      bars: [
        {
          id: '',
          width: '',
          colName: 'Column1',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column2',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column3',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
        {
          id: '',
          width: '',
          colName: 'Column4',
          height: Math.round(Math.random() * 100),
          colour: undefined,
        },
      ],
    };
    /*
        This block of code here is for assigning a color to the bar instances across
        all the groups. Secondly, determines which group of has the most bars. This is
        for the members property assignment.
         */
    let colorArray: Array<string>;
    of(firstGroup, secondGroup, thirdGroup, fourthGroup)
      .pipe(max((x, y) => (x.bars.length > y.bars.length ? 1 : -1)))
      .subscribe((groupWithMostBars) => {
        colorArray = this.getRandomColorStrings(groupWithMostBars.bars.length);
        this.members = groupWithMostBars.bars;
      });
    [firstGroup, secondGroup, thirdGroup, fourthGroup].forEach((group) => {
      group.bars.forEach((bar, index) => {
        bar.colour = colorArray[index];
      });
    });
    return [firstGroup, secondGroup, thirdGroup, fourthGroup];
  }

  // Assigns a color to the bar instances across all the groups.
  determineColors(): void {
    let colourArray: Array<string>;
    this.groups.sort((a, b) => a.bars.length < b.bars.length ? -1 : a.bars.length > b.bars.length ? 1 : 0);
    this.groups.reverse();

    colourArray = this.getRandomColorStrings(this.members.length);

    let index = 0;
    this.members.forEach(item => {
      this.groups.forEach((g) => {
        g.bars.forEach((bar) => {
          if (bar.colName === item.colName){
            bar.colour = colourArray[index];
          }
        });
      });
      index++;
    });
  }

  // Gets a random array of colours based on the number.
  getRandomColorStrings(x: number): string[] {
    const ret = [];
    for (let i = 0; i < x; i++) {
      const c = this.graphService.colorModel.getColorAtIndex((Math.round((Math.random() * this.graphService.colorModel.colors.length))));
      ret.push(c);
    }
    return ret;
  }
}
