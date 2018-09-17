import { AfterViewInit, Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { uniq } from "lodash-es";

import { Observable, of, ReplaySubject } from "rxjs";
import { takeUntil, filter, map, withLatestFrom } from "rxjs/operators";

import { Term } from "../../models";
import { DICTIONARY } from "./dictionary.data";
import { Lifecycle } from "../../../_shared/bases";

import * as routerSelector from "../../../_core/store/selectors/router.selectors"

export interface TermsForLetter {
  letter: string;
  terms: Term[];
}

@Component({
  selector: "app-dictionary",
  templateUrl: "./dictionary.component.html",
  styleUrls: ["./dictionary.component.scss"]
})
export class DictionaryComponent extends Lifecycle implements OnInit, AfterViewInit {
  terms$: Observable<Array<Term>> = of(DICTIONARY);

  // Unique case-insensitive first letters of terms list.
  firstLetters$: Observable<Array<string>> = this.terms$.pipe(
    map(terms => terms.map(term => term.label[0].toUpperCase())),
    map(terms => uniq(terms)),
  );

  // Groups terms by first letters.
  termsForLetters$: Observable<Array<TermsForLetter>> = this.terms$.pipe(
    withLatestFrom(this.firstLetters$),
    map(([terms, firstLetters]) => {
      const termsForLetters: TermsForLetter[] = [];

      firstLetters.forEach(letter => {
        termsForLetters.push({
          letter,
          terms: terms.filter(item => item.label[0].toUpperCase() === letter)
        })
      });

      return termsForLetters;
    })
  );

  // Url fragment (selected letter).
  anchor$: ReplaySubject<string> = new ReplaySubject<string>();

  constructor(@Inject(DOCUMENT) private document: Document,
              private router: Router,
              private store: Store<any>) {
    super();

    // Send next anchor value on navigation end in case we have one.
    this.router.events
      .pipe(
        takeUntil(this.lifecycle.onDestroy),
        filter(e => e instanceof NavigationEnd),
        withLatestFrom(this.store.pipe(select(routerSelector.selectRouter.fragment))))
      .subscribe(([_, fragment]) => {
        if (fragment) {
          this.anchor$.next(fragment);
        }
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
      // On active anchor - scroll anchor into view.
    this.anchor$
      .pipe(takeUntil(this.lifecycle.onDestroy))
      .subscribe(anchor => {
        const element = this.document.querySelector(`#${anchor}`);
        if (element) {
          element.scrollIntoView(true);
        }
      });
  }
}
