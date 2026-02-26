// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
import { Day, CalendarPage } from "./calendar.mjs";

let chosenYear;
let chosenMonth;

//region prepare
function setupChosenDate() {
  const now = new Date();

  chosenYear = now.getFullYear();
  chosenMonth = now.getMonth();
}

function setupCalendarPage() {
  renderCalendarPage();
}
//endregion


//region render
function renderCalendarPage() {
  const calendarPage = new CalendarPage(chosenYear, chosenMonth);

  renderDays(calendarPage.getDays());
}

function renderDays(dayList) {
  clearCalendarDaysContainer();

  for (const day of dayList) {
    renderDay(day);
  }
}

function renderDay(day) {
  const dayElement = document.getElementById("day-template").content.cloneNode(true);
  
  dayElement.querySelector(".day-number p").innerText = day.getDay();

  getCalendarDaysContainer().appendChild(dayElement);
}
//endregion


//region event listeners
function onLoadWindow() {
  setupChosenDate();
  setupCalendarPage();
}
//endregion


//region utilities
function getCalendarDaysContainer() {
  return document.getElementById("calendar-body");
}
function clearCalendarDaysContainer() {
  getCalendarDaysContainer().innerHTML = "";
}

window.onload = onLoadWindow();
