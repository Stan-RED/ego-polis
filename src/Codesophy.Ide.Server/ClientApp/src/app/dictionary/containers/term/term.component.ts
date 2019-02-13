import { Component } from "@angular/core";

import { PredicateType, TermAsSubject } from "../../models";

@Component({
  selector: "app-term",
  templateUrl: "./term.component.html",
  styleUrls: ["./term.component.scss"]
})
export class TermComponent {
  term: TermAsSubject = {
    id: `12345`,
    label: `Feed`,
    connections: [
      {
        predicate: PredicateType.hasMeaning,
        objects: [`Meaning1`, `Meaning2`]
      },
      {
        predicate: PredicateType.arisesFrom,
        objects: [`message-id-1`, `message-id-2`]
      }
    ]
  }
}
