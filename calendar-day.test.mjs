import { CalendarDay } from "./calendar-day.mjs";

describe("CalendarDay class functions", () =>{
  const calendarDay = new CalendarDay(2024, 1, 29);
  calendarDay.description = "There is should be some description string";
  calendarDay.occurrence = "last";

  test("Returns correct year", () => {
    expect(calendarDay.getYear()).toEqual(2024);
  })

  test("Returns correct month", () => {
    expect(calendarDay.getMonth()).toEqual(1);
  });

  test("Returns correct day", () => {
    expect(calendarDay.getDay()).toEqual(29);
  });

  test("Returns correct week day", () => {
    expect(calendarDay.getWeekDay()).toEqual(4);
  });

  test("Returns correct week day string", () => {
    expect(calendarDay.getWeekDayString()).toEqual("Thursday");
  });

  test("Returns correct occurrence", () => {
    expect(calendarDay.getOccurrence()).toEqual("last");
  });

  test("Returns correct description", () => {
    expect(calendarDay.getDescription()).toEqual(
      "There is should be some description string",
    );
  });

  test("Returns false", () => {
    expect(calendarDay.isSunday()).toEqual(false);
  });
});