import { ScheduleComponent } from "./schedule/schedule.component";
import { ScheduleDialogComponent } from "./schedule-dialog/schedule-dialog.component";

export const components: any[] = [
  ScheduleComponent,
  ScheduleDialogComponent,
];

export const entryComponents: any[] = [
  ScheduleDialogComponent,
];

export * from "./schedule/schedule.component";
export * from "./schedule-dialog/schedule-dialog.component";
