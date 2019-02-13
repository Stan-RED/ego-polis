import { Subject } from "./subject";

export interface Term {
  id: string;
  label: string;
}

export interface TermAsSubject extends Term, Subject {
}

// WORK: So, we have to have 2 different API methods: getTerms(): Array<Term> and getTermAsSubject(): TermAsSubject ?
