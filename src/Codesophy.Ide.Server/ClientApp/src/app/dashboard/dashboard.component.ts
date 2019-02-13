import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";

import { ScheduleDialogComponent } from "../schedule/components/schedule-dialog/schedule-dialog.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    this.dialog.open(ScheduleDialogComponent, {
      // height: '400px',
      // width: '600px',
    });
  }
}
