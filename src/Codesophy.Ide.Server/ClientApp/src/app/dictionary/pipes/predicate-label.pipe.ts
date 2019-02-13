import { Pipe, PipeTransform } from "@angular/core";

import { PredicateType } from "../models";

@Pipe({
  name: "predicateLabel"
})
export class PredicateLabelPipe implements PipeTransform {
  transform(predicate: PredicateType): string {
    switch (predicate) {
      case PredicateType.hasMeaning:
        return `Definition`;
      case PredicateType.arisesFrom:
        return `Related discussion`;
      case PredicateType.isChildOf:
        return `Parent items`;
      case PredicateType.isParentFor:
        return `Child items`;
      case PredicateType.isSynonymFor:
        return `Synonyms`;
      default:
        return ``;
    }
  }
}
