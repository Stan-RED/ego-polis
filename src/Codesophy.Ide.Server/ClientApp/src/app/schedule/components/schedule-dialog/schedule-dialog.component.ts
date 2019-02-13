import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-schedule-dialog",
  templateUrl: "./schedule-dialog.component.html",
  styleUrls: ["./schedule-dialog.component.scss"]
})
export class ScheduleDialogComponent {

  constructor(public dialogRef: MatDialogRef<ScheduleDialogComponent>) {
  }

  attachEvent() {
  //  WORK: Send value from child component's form via Store to the IndexedDB with validation and canDeactivate for the dialog.
  }

  onCancel() {
    this.dialogRef.close();
  }
}
