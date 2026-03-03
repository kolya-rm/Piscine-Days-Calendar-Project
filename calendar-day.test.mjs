import { CalendarDay } from "./calendar-day.mjs";

test("Returns correct year", () => {
  const calendarDay = new CalendarDay(2024, 1, 29);

  expect(calendarDay.getYear()).toEqual(2024);
})