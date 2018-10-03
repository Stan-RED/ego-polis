export enum RepeatEvent {
  DoesNotRepeat,
  EveryDay,
  EveryWeek,
  EveryMonth,
  EveryYear,
}

export interface ScheduleEvent {
  id: string;
  isDaylong: boolean;
  message?: string;
  repeatEvery: RepeatEvent;
  timestamp: number;
}
