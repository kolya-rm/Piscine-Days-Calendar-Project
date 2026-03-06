import { CalendarPage } from "./calendar-page.mjs";


class IcalGEnerator {
  startMonth;
  lastMonth;
  commemorableDays = [];


  //region getters/setters
  setStartMonth(year, month) {
    this.startMonth = new Date(year, month);
  }

  setLastMonth(year, month) {
    this.lastMonth = new (year, ++month);
  }
  //endregion
}