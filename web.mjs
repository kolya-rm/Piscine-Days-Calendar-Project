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

function setupYearInput() {
  const yearInput = document.getElementById("year-input");

  yearInput.value = chosenYear;
  yearInput.addEventListener("change", onChangeYearInput);
}

function setupMonthSelect() {
  const monthSelect = document.getElementById("month-select");

  for (let month = CalendarPage.MONTH_MIN; month <= CalendarPage.MONTH_MAX; month++) {
    monthSelect.add(new Option(CalendarPage.getMonthString(month), month));
  }
  monthSelect.value = chosenMonth;
}

function setupBackwardButton() {
  document.getElementById("month-backward-button").addEventListener("click", onClickBackwardButton);
}

function setupForwardButton() {
  document.getElementById("month-forward-button").addEventListener("click", onClickForwardButton);
}
//endregion


//region render
function render() {
  renderMonthText();
  renderCalendarPage();
}

function renderMonthText() {
  document.getElementById("month-text").innerText = 
    `${CalendarPage.getMonthString(chosenMonth)} ${chosenYear}`;
}

function renderCalendarPage() {
  const calendarPage = new CalendarPage(chosenYear, chosenMonth);

  renderDays(calendarPage);
}

function renderDays(calendarPage) {
  clearCalendarDaysContainer();

  for (const day of calendarPage.getDays()) {
    renderDay(calendarPage, day);
  }
}

function renderDay(calendarPage, day) {
  const dayElement = document.getElementById("day-template").content.cloneNode(true);
  
  dayElement.querySelector(".day-number p").innerText = day.getDay();
  if (day.isSunday()) {
    dayElement.querySelector(".day .day-number").classList.add("day-sunday");
  }
  if (!calendarPage.isCurrentMonthDay(day)) {
    dayElement.querySelector(".day").classList.add("day-non-current-month");
  }

  getCalendarDaysContainer().appendChild(dayElement);
}
//endregion


//region event listeners
function onLoadWindow() {
  setupChosenDate();
  setupYearInput();
  setupMonthSelect();
  setupBackwardButton();
  setupForwardButton();
  render();
}

function onChangeYearInput(event) {
  chosenYear = event.target.value;
  verifyChosenYear();
  render();
}

function onClickBackwardButton() {
  changeMonth(-1);
  render();
}

function onClickForwardButton() {
  changeMonth(1);
  render()
}
//endregion


//region utilities
function getCalendarDaysContainer() {
  return document.getElementById("calendar-body");
}

function clearCalendarDaysContainer() {
  getCalendarDaysContainer().innerHTML = "";
}

function changeMonth(delta) {
  chosenMonth += delta;
  verifyChosenMonth();
}

function verifyChosenMonth() {
  if (chosenMonth < CalendarPage.MONTH_MIN) {
    chosenMonth = CalendarPage.MONTH_MAX;
    chosenYear--;
  }
  if (chosenMonth > CalendarPage.MONTH_MAX) {
    chosenMonth = CalendarPage.MONTH_MIN;
    chosenYear++;
  }
  verifyChosenYear();
}

function verifyChosenYear() {
  if (chosenYear < CalendarPage.YEAR_MIN) {
    chosenYear = CalendarPage.YEAR_MIN;
    chosenMonth = CalendarPage.MONTH_MIN;
  }
  if (chosenYear > CalendarPage.MONTH_MAX) {
    chosenYear = CalendarPage.YEAR_MAX;
    chosenMonth = CalendarPage.MONTH_MAX;
  }  
}
//endregion

window.onload = onLoadWindow();
