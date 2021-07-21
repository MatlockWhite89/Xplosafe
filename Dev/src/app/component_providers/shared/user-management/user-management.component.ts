import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridService } from '../../../services/agGrid.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit, OnDestroy {
  constructor(private agGridService: GridService) {}

  ngOnInit(): void {
    if (this.agGridService.getGridType() !== 5) {
      this.agGridService.setGridType(5);
    }

    // When the edit-user component loads, we do not want any previously selected rows to be used here.
    if (this.agGridService.getSelectedRow()) {
      console.debug(
        'The following row was left selected in the GridService: ',
        this.agGridService.getSelectedRow()
      );
      this.agGridService.setSelectedRow(null);
    }
  }

  ngOnDestroy(): void {
    this.agGridService.setSelectedRow(null);
  }
}
