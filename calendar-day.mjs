export class CalendarDay {
  #timestamp = 0;
  #occurrence = "";
  #name = "";

  constructor(year, month, day) {
    this.#timestamp = new Date();

    this.#timestamp.setFullYear(year);
    this.#timestamp.setMonth(month);
    this.#timestamp.setDate(day);
  }

  getYear() {
    return this.#timestamp.getFullYear();
  }

  getMonth() {
    return this.#timestamp.getMonth();
  }

  getDay() {
    return this.#timestamp.getDate();
  }

  getWeekDay() {
    return this.#timestamp.getDay();
  }

  getWeekDayString() {
    return this.#timestamp.toLocaleString("en-US", { weekday: "long" });
  }

  getOccurrence() {
    return this.#occurrence;
  }
  setOccurrence(occurrence) {
    this.#occurrence = occurrence;
  }

  getName() {
    return this.#name;
  }
  
  setName(name) {
    this.#name = name;
  }

  isSunday() {
    return this.getWeekDay() === 0;
  }

  getDateString() {
    return `${this.getYear()}-${("" + this.getMonth()).padStart(2, "0")}-${(
      "" + this.getDay()
    ).padStart(2, "0")} week day: ${this.getWeekDay()}`;
  }

  getIcalDayString() {
    return this.#timestamp.toISOString().slice(0, 10).replace(/-/g, "");
  }

  getIcalNextDayString() {
    let nextDay = new CalendarDay(
      this.getYear(),
      this.getMonth(),
      this.getDay() + 1,
    );
    return nextDay.getIcalDayString();
  }

  getIcalTimestampString() {
    return this.#timestamp.toISOString().slice(0, 19).replace(/[-:]/g, "");
  }

  getTimestampString() {
    return this.#timestamp.toISOString().replace(/[-:\.]/g, "");
  }
}