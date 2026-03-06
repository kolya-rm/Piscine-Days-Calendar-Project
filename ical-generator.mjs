import { writeFileSync, appendFileSync} from "node:fs";
import { CalendarPage } from "./calendar-page.mjs";

const FILE_NAME = "days.ics";

const CALENDAR_BEGIN_STRING = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Migracode BCN//Commemorable Calendar 1.0//EN\nCALSCALE:GREGORIAN\n";
const CALENDAR_END_STRING = "END:VCALENDAR\n";
const DAY_START_STRING = "BEGIN:VEVENT\n";
const DAY_END_STRING = "END:VEVENT\n";

export class IcalGenerator {

  startMonth;
  lastMonth;
  commemorableDays = [];

  //region interface
  collect() {
    let currentMonth = new CalendarPage();
    currentMonth.updateYearMonth(
      this.startMonth.getFullYear(),
      this.startMonth.getMonth(),
    );

    this.commemorableDays.length = 0;
    while (currentMonth.getTime() <= this.lastMonth.getTime()) {
      this.commemorableDays.push(
        ...currentMonth.getDays().filter((day) => day.description),
      );
      currentMonth.changeMonth(1);
    }

    console.log(this.commemorableDays);
  }

  print() {
    try {
      writeFileSync(FILE_NAME, CALENDAR_BEGIN_STRING);
      this.printDays();
      appendFileSync(FILE_NAME, CALENDAR_END_STRING);
    } catch (error) {
      console.error(error);
    }
  }

  printDays() {
    try {
      appendFileSync(FILE_NAME, DAY_START_STRING);
      appendFileSync(FILE_NAME, DAY_END_STRING);
    } catch (error) {
      console.error(error);
    }
  }
  //endregion

  //region getters/setters
  setStartMonth(year, month) {
    this.startMonth = new Date(year, month);
    console.log(this.startMonth.toDateString());
  }

  setLastMonth(year, month) {
    this.lastMonth = new Date(year, ++month);
    console.log(this.lastMonth.toDateString());
  }
  //endregion
}
