import { Component } from "@angular/core";
import { MatBottomSheet } from "@angular/material";
import { head } from "lodash-es";

import {
  BranchSelectionBottomSheetComponent,
  BranchSelectionBottomSheetData
} from "../branch-selection-bottom-sheet/branch-selection-bottom-sheet.component";

export interface Branch {
  id: string;
  name: string;
}

@Component({
  selector: "app-branch-selection",
  templateUrl: "./branch-selection.component.html",
  styleUrls: ["./branch-selection.component.scss"]
})
export class BranchSelectionComponent {
  branches: Array<Branch> = [
    {
      id: `1`,
      name: `master`
    },
    {
      id: `2`,
      name: `lab/design`
    },
    {
      id: `3`,
      name: `feature/branch-selection`
    },
  ];

  activeBranch: Branch = head(this.branches);

  constructor(private bottomSheet: MatBottomSheet) {
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BranchSelectionBottomSheetComponent, {data: {branches: this.branches}} as { data: BranchSelectionBottomSheetData });
  }
}
