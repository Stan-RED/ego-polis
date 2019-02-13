import { OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/**
 * Allows to be sure you are unsubscribing from observables when component is destroyed.
 * @example
 * this.someObservable
 *  .pipe(
 *      takeUntil(this.lifecycle.onDestroy)
 *   )
 *  .subscribe(...);
 */
export abstract class Lifecycle implements OnDestroy {
  // TODO: It's temporary until https://github.com/angular/angular/issues/10185
  // Creates ReplaySubject to complete on ngOnDestroy.
  // It is possible to use this property as argument to `.takeUntil`, e.g. `someObservable.takeUntil(this.lifecycle.onDestroy)...`
  // Why ReplaySubject? It helps to keep the component in an destroyed state even in case of using any of the observable
  // after ngOnDestroy has already been called.
  // Any late subscriptions will instantly trigger the replayed value from the replaySubject and complete.
  protected lifecycle: { onDestroy: ReplaySubject<boolean> } = {
    onDestroy: new ReplaySubject(1)
  };

  constructor() {
  }

  ngOnDestroy() {
    // Emits destroy event.
    this.lifecycle.onDestroy.next(true);

    // Completes our lifecycle onDestroy Subject.
    this.lifecycle.onDestroy.complete();
  }
}
