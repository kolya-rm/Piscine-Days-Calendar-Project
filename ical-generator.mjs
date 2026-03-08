import { writeFileSync, appendFileSync, appendFile} from "node:fs";
import { CalendarPage } from "./calendar-page.mjs";


const FILE_NAME = "days.ics";

const CALENDAR_BEGIN_STRING = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Migracode BCN//Commemorable Calendar 1.0//EN\nCALSCALE:GREGORIAN\n";
const CALENDAR_END_STRING = "END:VCALENDAR\n";

const DAY_START_STRING = "BEGIN:VEVENT\n";
const DAY_END_STRING = "END:VEVENT\n";
const DAY_UID_STRING_BEGIN = "UID:";
const DAY_UID_STRING_END = "-kolya.rm@migracode.org\n";
const DAY_TRANSPARENCY_STRING = "TRANSP:TRANSPARENT\n";
const DAY_SUMMARY_STRING_BEGIN = "SUMMARY:";
const DAY_DTSTART_STRING_BEGIN = "DTSTART:";
const DAY_DTEND_STRING_BEGIN = "DTEND:";
const DAY_DTSTAMP_STRING_BEGIN = "DTSTAMP:";
const DAY_CATEGORY_STRING = "CATEGORIES: Migracode iCal commemorable calendar day\n";


export class IcalGenerator {
  #startMonth;
  #lastMonth;
  #commemorableDays = [];

  //region interface
  collect() {
    const currentMonth = new CalendarPage();
    currentMonth.updateYearMonth(
      this.#startMonth.getFullYear(),
      this.#startMonth.getMonth(),
    );

    this.#commemorableDays.length = 0;
    while (currentMonth.getTime() <= this.#lastMonth.getTime()) {
      this.#commemorableDays.push(...currentMonth.getDays().filter(day => day.getName()));
      currentMonth.changeMonth(1);
    }
  }

  print() {
    writeSync(CALENDAR_BEGIN_STRING);
    this.#printDays();
    appendFileSync(FILE_NAME, CALENDAR_END_STRING);
  }
  //endregion


  //region inner logic
  #printDays() {
    for (const day of this.#commemorableDays) {
      appendSync(DAY_START_STRING);
      appendSync(`${DAY_SUMMARY_STRING_BEGIN}${day.description}\n`);
      appendSync(
        `${DAY_UID_STRING_BEGIN}${day.getTimestampString()}${DAY_UID_STRING_END}`,
      );
      appendSync(DAY_TRANSPARENCY_STRING);
      appendSync(`${DAY_DTSTART_STRING_BEGIN}${day.getIcalDayString()}\n`);
      appendSync(`${DAY_DTEND_STRING_BEGIN}${day.getIcalNextDayString()}\n`);
      appendSync(
        `${DAY_DTSTAMP_STRING_BEGIN}${day.getIcalTimestampString()}\n`,
      );
      appendSync(DAY_CATEGORY_STRING);
      appendSync(DAY_END_STRING);
    }
  }
  //endregion


  //region getters/setters
  getStartMonth() {
    return this.#startMonth;
  }

  getLastMonth() {
    return this.#lastMonth;
  }

  getCommemorableDays() {
    return this.#commemorableDays;
  }

  setStartMonth(year, month) {
    this.#startMonth = new Date(year, month);
  }

  setLastMonth(year, month) {
    this.#lastMonth = new Date(year, ++month);
  }
  //endregion
}


function writeSync(string) {
  try {
    writeFileSync(FILE_NAME, string);
  } catch (error) {
    console.log(error);
  }
}

function appendSync(string) {
  try {
    appendFileSync(FILE_NAME, string);
  } 
  catch (error) {
    console.log(error);
  }
}
