// Represents a bit modified semantic triple (subject/predicate/object).
// The whole `Subject` is [the combination of Subject-related triples] and [the subject from the triple] at the same time.
export interface Subject {
  // All Subject's connections (predicates references and objects references).
  connections: Array<Connection>;
}

export interface Connection {
  predicate: PredicateType;

  // TODO: Different PredicateType -> different objects type.
  // One predicate type can point to any number of objects.
  objects: Array<any>;
}

export enum PredicateType {
  hasMeaning,
  arisesFrom,
  isChildOf,
  isParentFor,
  isSynonymFor,
}
