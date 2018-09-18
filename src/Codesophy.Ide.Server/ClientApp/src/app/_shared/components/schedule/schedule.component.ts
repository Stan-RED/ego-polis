import { Component } from "@angular/core";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.scss"]
})
export class ScheduleComponent {
  repeatEvery: number = 0;
  repeatEverys: string[] = [
    "Does not repeat",
    "Every day",
    "Every week",
    "Every month",
    "Every year",
  ];

  date: Date = new Date();
}
