import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";

import { CRUD, ScheduleEvent } from "../models";
import { APP_DATABASE } from "../../_db";

@Injectable()
export class SchedulerService implements CRUD<ScheduleEvent> {
  create(model: ScheduleEvent): Observable<{}> {
    return from(APP_DATABASE.scheduleEvents.add(model));
  }

  getAll(): Observable<ScheduleEvent[]> {
    return from(APP_DATABASE.scheduleEvents.toArray());
  }

  // TODO:
  // getNext() {}

  remove(id: string): Observable<void> {
    return from(APP_DATABASE.scheduleEvents.delete(id));
  }

  update(model: Partial<ScheduleEvent> & {id: string}): Observable<{}> {
    return from(APP_DATABASE.scheduleEvents.update(model.id, model));
  }
}
