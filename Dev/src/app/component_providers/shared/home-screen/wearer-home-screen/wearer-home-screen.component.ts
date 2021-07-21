import {Component, OnInit, OnDestroy} from '@angular/core';
import {GridService} from '../../../../services/agGrid.service';

@Component({
  selector: 'app-wearer-home-screen',
  templateUrl: './wearer-home-screen.component.html',
  styleUrls: ['./wearer-home-screen.component.css'],
})
export class WearerHomeScreenComponent implements OnInit, OnDestroy {
  constructor(
    private gridService: GridService,
  ) {
    // Set the grid to display badges
    this.gridService.setGridType(7);
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
