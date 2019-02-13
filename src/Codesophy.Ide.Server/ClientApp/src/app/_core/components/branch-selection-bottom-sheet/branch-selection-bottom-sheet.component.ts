import { Component, Inject, OnInit } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { Branch } from "../branch-selection/branch-selection.component";

export interface BranchSelectionBottomSheetData {
  branches: Array<Branch>;
}

@Component({
  selector: "app-branch-selection-bottom-sheet",
  templateUrl: "./branch-selection-bottom-sheet.component.html",
  styleUrls: ["./branch-selection-bottom-sheet.component.scss"]
})
export class BranchSelectionBottomSheetComponent implements OnInit {
  filteredBranches$: Observable<Array<Branch>>;
  filterString: BehaviorSubject<string> = new BehaviorSubject<string>(``);

  constructor(private bottomSheetRef: MatBottomSheetRef<BranchSelectionBottomSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: BranchSelectionBottomSheetData) {
  }

  ngOnInit() {
    this.filteredBranches$ = combineLatest(
      of(this.data.branches),
      this.filterString
    ).pipe(
      map(([branches, filterString]) => branches.filter(branch => branch.name.includes(filterString)))
    );
  }

  changeFilterString(event: string) {
    this.filterString.next(event);
  }

  selectBranch(): void {
    // WORK: Real selection.
    this.bottomSheetRef.dismiss();
  }
}
