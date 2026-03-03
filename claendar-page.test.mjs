import { CalendarDay } from "./calendar-day.mjs";
import { CalendarPage } from "./calendar-page.mjs";


describe("CalendarPage static functions", () =>{

  test("Should return correct month name string", () => {
    expect(CalendarPage.getMonthString(2)).toEqual("March");
  });

  test("Should return correct month day count", () => {
    expect(CalendarPage.getDayCount(2028, 1)).toEqual(29);
  });

  test("Should return correct occurrence string", () => {
    expect(CalendarPage.getOccurrenceString(0)).toEqual("first");
  });
});

describe("CalendarPage class instance getter functions", () =>{

  let calendarPage = new CalendarPage(2026, 2);
  
  test("Should return correct year", () => {
    expect(calendarPage.getYear()).toEqual(2026);
  });

  test("Should return correct month", () => {
    expect(calendarPage.getMonth()).toEqual(2);
  });

  test("Should return correct month name string", () => {
    expect(calendarPage.getMonthString()).toEqual("March");
  });

  test("Should return correct month day count", () => {
    expect(calendarPage.getDayCount()).toEqual(31);
  });

  test("Should return true for correct day", () => {
    expect(calendarPage.isCurrentMonthDay(new CalendarDay(2026, 2, 19))).toEqual(true);
  });

  test("Should return false for correct day", () => {
    expect(
      calendarPage.isCurrentMonthDay(new CalendarDay(2026, 5, 19)),
    ).toEqual(false);
  });
});