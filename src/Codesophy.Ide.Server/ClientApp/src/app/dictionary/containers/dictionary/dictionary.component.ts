import { Component } from "@angular/core";

import { Term } from "../../models";

@Component({
  selector: "app-dictionary",
  templateUrl: "./dictionary.component.html",
  styleUrls: ["./dictionary.component.scss"]
})
export class DictionaryComponent {
  terms: Array<Term> = [
    {
      id: `12345`,
      label: `Feed`
    },
  ];
}
