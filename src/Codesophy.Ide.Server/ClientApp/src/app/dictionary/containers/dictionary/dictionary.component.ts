import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { uniq } from "lodash-es";

import { Observable, of, ReplaySubject, Subscription } from "rxjs";
import { filter, map, withLatestFrom } from "rxjs/operators";

import { Term } from "../../models";
import { DICTIONARY } from "./dictionary.data";

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
export class DictionaryComponent implements OnInit, AfterViewInit, OnDestroy {
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

  // WORK: Lifecycle OnDestroy
  private subscriptions: Array<Subscription> = [];

  constructor(@Inject(DOCUMENT) private document: Document,
              private router: Router,
              private store: Store<any>) {
    this.subscriptions.push(
      // Send next anchor value on navigation end in case we have one.
      this.router.events
        .pipe(
          filter(e => e instanceof NavigationEnd),
          withLatestFrom(this.store.pipe(select(routerSelector.selectRouter.fragment))))
        .subscribe(([_, fragment]) => {
          if (fragment) {
            this.anchor$.next(fragment);
          }
        })
    );
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      // On active anchor - scroll anchor into view.
      this.anchor$.subscribe(anchor => {
        const element = this.document.querySelector(`#${anchor}`);
        if (element) {
          element.scrollIntoView(true);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
