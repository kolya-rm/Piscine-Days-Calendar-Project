import commemorativeDays from "./days.json" with { type: "json" };
import { CalendarDay } from "./calendar-day.mjs";
import { getDescription, setDescription } from "./storage.mjs";


export class CalendarPage {
  static DATE_MIN = new Date("0001-02-01");
  static DATE_MAX = new Date("3000-12-31");
  static YEAR_MAX_LENGTH = this.DATE_MAX.getFullYear().toString().length;
  static MONTH_IN_YEAR = 12;
  static DAY_IN_WEEK = 7;
  static OCCURRENCE_STRINGS = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "last",
  ];


  #timestamp = 0;
  #days = [];


  //regin static
  static getDayCount(year, month) {
    return new Date(year, ++month, 0).getDate();
  }
  //endregion


  //region constructor
  constructor() {
    this.#timestamp = new Date();
    this.#createDays();
  }
  //endregion


  //region interface
  async updateMonth(month) {
    this.#timestamp.setMonth(month);
    this.#validateDate();
    await this.#createDays();
  }

  async updateYear(year) {
    this.#timestamp.setFullYear(year);
    this.#validateDate();
    await this.#createDays();
  }

  async updateYearMonth(year, month) {
    this.#timestamp.setFullYear(year);
    this.#timestamp.setMonth(month);
    this.#validateDate();
    await this.#createDays();
  }

  async changeMonth(delta) {
    this.#timestamp.setMonth(this.#timestamp.getMonth() + delta);
    this.#validateDate();
    await this.#createDays();
  }
  //endregion


  //region inner logic
  async #createDays() {
    this.#days.length = 0;
    this.#createCurrentMonthDays();
    this.#createDirectOrderOccurrences();
    this.#createReverseOrderOccurrences();
    await this.#createCommemorativeDates();
    this.#createPreviousMonthDays();
    this.#createNextMonthDays();
  }

  #createCurrentMonthDays() {
    for (let day = 1; day <= this.getDayCount(); day++) {
      this.#days.push(new CalendarDay(this.getYear(), this.getMonth(), day));
    }
  }

  #createDirectOrderOccurrences() {
    const days = this.getDays();
    for (let i = 0; i < days.length; i++) {
      let occurrenceIndex = Math.trunc(i / CalendarPage.DAY_IN_WEEK);
      days[i].setOccurrence(CalendarPage.OCCURRENCE_STRINGS[occurrenceIndex]);
    }
  }

  #createReverseOrderOccurrences() {
    const days = this.getDays();
    const occurrence = CalendarPage.OCCURRENCE_STRINGS[CalendarPage.OCCURRENCE_STRINGS.length - 1];
    for (let i = 1; i <= CalendarPage.DAY_IN_WEEK; i++) {
      days[days.length - i].setOccurrence(occurrence);
    }
  }

  async #createCommemorativeDates() {
    for (const day of this.getDays()) {
      for (const commemorativeDay of commemorativeDays) {
        if (
          this.getMonthString() === commemorativeDay.monthName &&
          day.getWeekDayString() === commemorativeDay.dayName &&
          day.getOccurrence() === commemorativeDay.occurrence
        ) {
            day.setName(commemorativeDay.name);
            day.setDescription(await this.#getDescription(commemorativeDay));
          }
      }
    }
  }

  #createPreviousMonthDays() {
    let previousMonthDay = CalendarPage.getDayCount(this.getYear(), this.getMonth() - 1);
    let weekDay = this.getDays()[0].getWeekDay();

    while (--weekDay >= 0) {
      this.getDays().unshift(new CalendarDay(this.getYear(), this.getMonth() - 1, previousMonthDay--));
    }
  }

  #createNextMonthDays() {
    let nextMonthDay = 1;
    let weekday = this.getDays()[this.getDays().length - 1].getWeekDay();

    while (++weekday < CalendarPage.DAY_IN_WEEK) {
      this.getDays().push(
        new CalendarDay(this.getYear(), this.getMonth() + 1, nextMonthDay++),
      );
    }
  }

  #validateDate() {
    if (this.#timestamp.getTime() < CalendarPage.DATE_MIN.getTime()) {
      this.#timestamp.setTime(CalendarPage.DATE_MIN);
    }
    if (this.#timestamp.getTime() > CalendarPage.DATE_MAX.getTime()) {
      this.#timestamp.setTime(CalendarPage.DATE_MAX);
    }
  }

  async #getDescription(day) {
    const id = day.name.replace(/\s/g, "-");
    let description = getDescription(id);
    if (description) {
      console.log("Description get from local storage:", description);
      return description;
    }
    try {
      const response = await fetch(day.descriptionURL);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      description = await response.text();
      setDescription(id, description);
      console.log("Description fetched from url:", description);
      return description;
    }
    catch (error) {
      console.error("Error fetching description data:", error)
    }
    finally {
      return "Bulk description: couldn't fetch data";
    }
  }
  //endregion


  //region getters
  getTime() {
    return this.#timestamp.getTime();
  }
  
  getYear() {
    return this.#timestamp.getFullYear();
  }

  getMonth() {
    return this.#timestamp.getMonth();
  }

  getMonthString() {
    return this.#timestamp.toLocaleString("en-US", { month: "long" });
  }

  getDays() {
    return this.#days;
  }

  getDayCount() {
    return CalendarPage.getDayCount(this.getYear(), this.getMonth());
  }

  isCurrentMonthDay(day) {
    return (
      this.getYear() === day.getYear() && this.getMonth() === day.getMonth()
    );
  }
  //endregion
}
