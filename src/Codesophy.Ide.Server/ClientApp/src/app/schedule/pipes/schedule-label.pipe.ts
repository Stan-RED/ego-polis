import { Pipe, PipeTransform } from "@angular/core";

import { RepeatEvent } from "../models";

@Pipe({
  name: "scheduleLabel"
})
export class ScheduleLabelPipe implements PipeTransform {
  transform(repeatEvent: RepeatEvent): string {
    switch (repeatEvent) {
      case RepeatEvent.DoesNotRepeat:
        return `Does not repeat`;
      case RepeatEvent.EveryDay:
        return `Every day`;
      case RepeatEvent.EveryWeek:
        return `Every week`;
      case RepeatEvent.EveryMonth:
        return `Every month`;
      case RepeatEvent.EveryYear:
        return `Every year`;
      default:
        return ``;
    }
  }
}
