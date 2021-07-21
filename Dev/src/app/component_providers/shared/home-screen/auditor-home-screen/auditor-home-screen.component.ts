import {Component, OnInit, OnDestroy} from '@angular/core';
import {GridService} from '../../../../services/agGrid.service';

@Component({
  selector: 'app-auditor-home-screen',
  templateUrl: './auditor-home-screen.component.html',
  styleUrls: ['./auditor-home-screen.component.css'],
})
export class AuditorHomeScreenComponent implements OnInit, OnDestroy {
  constructor(
    private gridService: GridService,
  ) {
    // Set the grid to display badges
    this.gridService.setGridType(14);
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
