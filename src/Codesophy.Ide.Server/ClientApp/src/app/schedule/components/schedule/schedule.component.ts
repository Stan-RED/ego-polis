import * as moment from 'moment';
import { Component } from "@angular/core";
import { head } from "lodash-es";

import { enumToValuesArray } from "../../../_shared/utils";
import { RepeatEvent } from "../../models";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.scss"]
})
export class ScheduleComponent {
  repeatEverys: number[] = enumToValuesArray(RepeatEvent);
  repeatEvery: number = head(this.repeatEverys);

  isDaylong: boolean = true;

  // WORK: What if physical date has been changed while user setting up an event.
  moment: moment.Moment = moment();

  eventDate: Date = this.moment.toDate();
  eventTime: string = this.moment.add(25, 'm').format(`HH:mm`);
}
