import commemorativeDays from "./days.json" with { type: "json" };

export class Day {
  timestamp = 0;
  occurrence = "";
  description = "";

  constructor(year, month, day) {
    this.timestamp = new Date();

    this.timestamp.setFullYear(year);
    this.timestamp.setMonth(month);
    this.timestamp.setDate(day);
  }

  getYear() {
    return this.timestamp.getFullYear();
  }

  getMonth() {
    return this.timestamp.getMonth();
  }

  getDay() {
    return this.timestamp.getDate();
  }

  getWeekDay() {
    return this.timestamp.getDay();
  }

  getWeekDayString() {
    return this.timestamp.toLocaleString("en-US", { weekday: "long" });
  }

  getOccurrence() {
    return this.occurrence;
  }

  getDescription() {
    return this.description;
  }

  isSunday() {
    return this.getWeekDay() === 0;
  }

  getDateString() {
    return `${this.getYear()}-${("" + this.getMonth()).padStart(2, "0")}-${(
      "" + this.getDay()
    ).padStart(2, "0")} week day: ${this.getWeekDay()}`;
  }
}

export class CalendarPage {
  static YEAR_MIN = 1;
  static YEAR_MAX = 3000;
  static MONTH_MIN = 0;
  static MONTH_MAX = 11;
  static MONTH_STRINGS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  static WEEK_DAY_COUNT = 7;
  static OCCURRENCE_STRINGS = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "last",
  ];

  timestamp = 0;
  days = [];

  static getMonthString(month) {
    return this.MONTH_STRINGS[month];
  }

  static getDayCount(year, month) {
    return 33 - new Date(year, month, 33).getDate();
  }

  static getOccurrenceString(index) {
    return this.OCCURRENCE_STRINGS[index];
  }

  constructor(year, month) {
    this.timestamp = new Date();

    this.timestamp.setFullYear(year);
    this.timestamp.setMonth(month);

    this.createDays();
  }

  createDays() {
    this.createCurrentMonthDays();
    this.createDirectOrderOccurrences();
    this.createReverseOrderOccurrences();
    this.createCommemorativeDates();
    this.createPreviousMonthDays();
    this.createNextMonthDays();
  }

  createCurrentMonthDays() {
    for (let day = 1; day <= this.getDayCount(); day++) {
      this.days.push(new Day(this.getYear(), this.getMonth(), day));
    }
  }

  createDirectOrderOccurrences() {
    const days = this.getDays();

    for (let i = 0; i < days.length; i++) {
      const occurrenceIndex = Math.trunc(i / CalendarPage.WEEK_DAY_COUNT);

      days[i].occurrence = CalendarPage.getOccurrenceString(occurrenceIndex);
    }
  }

  createReverseOrderOccurrences() {
    const days = this.getDays();
    const occurrenceString = CalendarPage.getOccurrenceString(
      CalendarPage.OCCURRENCE_STRINGS.length - 1,
    );

    for (let i = 1; i <= CalendarPage.WEEK_DAY_COUNT; i++) {
      days[days.length - i].occurrence = occurrenceString;
    }
  }

  createCommemorativeDates() {
    for (const day of this.getDays()) {
      for (const commemorativeDay of commemorativeDays) {
        if (this.getMonthString() === commemorativeDay.monthName &&
          day.getWeekDayString() === commemorativeDay.dayName &&
          day.getOccurrence() === commemorativeDay.occurrence) {
            day.description = commemorativeDay.name;
          }
      }
    }
  }

  createPreviousMonthDays() {
    let previousMonthDay = CalendarPage.getDayCount(
      this.getYear(),
      this.getMonth() - 1,
    );
    let weekDay = this.getDays()[0].getWeekDay();

    while (--weekDay >= 0) {
      this.getDays().unshift(
        new Day(this.getYear(), this.getMonth() - 1, previousMonthDay--),
      );
    }
  }

  createNextMonthDays() {
    let nextMonthDay = 1;
    let weekday = this.getDays()[this.getDays().length - 1].getWeekDay();

    while (++weekday <= 6) {
      this.getDays().push(
        new Day(this.getYear(), this.getMonth() + 1, nextMonthDay++),
      );
    }
  }

  getYear() {
    return this.timestamp.getFullYear();
  }

  getMonth() {
    return this.timestamp.getMonth();
  }

  getMonthString() {
    return CalendarPage.getMonthString(this.getMonth());
  }

  getDays() {
    return this.days;
  }

  getDayCount() {
    return CalendarPage.getDayCount(this.getYear(), this.getMonth());
  }

  isCurrentMonthDay(day) {
    return (
      this.getYear() === day.getYear() && this.getMonth() === day.getMonth()
    );
  }
}
