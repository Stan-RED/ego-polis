import Dexie from "dexie";

// Allows auto UUID for primary keys using `$$` prefix.
import "dexie-observable";

import { environment } from "../../environments/environment";
import { ScheduleEvent } from "../schedule/models";

class AppDatabase extends Dexie {
  scheduleEvents: Dexie.Table<ScheduleEvent, string>;

  constructor(databaseName) {
    super(databaseName);
    this.version(1).stores({

      // Value represents indexed properties.
      // Never index properties containing images, movies or HUGE strings.
      scheduleEvents: `$$id,isDaylong,message,repeatEvery,timestamp`,
    });
  }
}

export const APP_DATABASE = new AppDatabase("APP_DATABASE");

if (environment.production === false) {

  // TODO: MONITOR: https://github.com/dfahlander/Dexie.js/issues/706 and use import { DatabaseChangeType } from 'dexie-observable/api'.
  enum DatabaseChangeType {
    Create = 1,
    Update = 2,
    Delete = 3
  }

  APP_DATABASE.on("changes", function (changes) {
    changes.forEach(function (change) {
      switch (change.type) {
        case DatabaseChangeType.Create:
          console.log(`An object was created: ${JSON.stringify(change.obj)}`);
          break;
        case DatabaseChangeType.Update:
          console.log(`An object with key ${change.key} was updated with modifications: ${JSON.stringify(change.mods)}`);
          break;
        case DatabaseChangeType.Delete:
          console.log(`An object with key ${change.key} was deleted`);
          break;
      }
    });
  });
}
