import { CalendarPage } from "./calendar-page.mjs";


const calendarPage = new CalendarPage();

const YEAR_INPUT = document.getElementById("year-input");
const MONTH_SELECT = document.getElementById("month-select");
const BACKWARD_BUTTON = document.getElementById("month-backward-button");
const MONTH_TEXT = document.getElementById("month-text");
const FORWARD_BUTTON = document.getElementById("month-forward-button");
const CALENDAR_DAY_CONTAINER = document.getElementById("calendar-body");

const DAY_TEMPLATE = document.getElementById("day-template");


//region prepare
function setupPageElements() {
  YEAR_INPUT.addEventListener("change", () => {
    calendarPage.updateYear(YEAR_INPUT.value);
    render();
  });
  YEAR_INPUT.addEventListener("input", () => {
    if(YEAR_INPUT.value.length > CalendarPage.YEAR_MAX_LENGTH) {
      YEAR_INPUT.value = YEAR_INPUT.value.slice(0, CalendarPage.YEAR_MAX_LENGTH);
    }
  });

  for (let month = 0; month < CalendarPage.MONTH_IN_YEAR; month++) {
    const date = new Date();
    date.setMonth(month);
    MONTH_SELECT.add(new Option(date.toLocaleString("en-US", { month: "long" }), month));
  }
  MONTH_SELECT.addEventListener("change", () => {
    calendarPage.updateMonth(MONTH_SELECT.value);
    render();
  });

  BACKWARD_BUTTON.addEventListener("click", () => {
    calendarPage.changeMonth(-1);
    render();
  });

  FORWARD_BUTTON.addEventListener("click", () => {
    calendarPage.changeMonth(1);
    render();
  });
}
//endregion


//region render
function render() {
  renderYearInput();
  renderMonthSelect();
  renderMonthText();
  renderCalendarDays();
}

function renderYearInput() {
  YEAR_INPUT.value = calendarPage.getYear();
}

function renderMonthSelect() {
  MONTH_SELECT.value = calendarPage.getMonth();
}

function renderMonthText() {
  MONTH_TEXT.innerText = `${calendarPage.getMonthString()} ${calendarPage.getYear()}`;
}

function renderCalendarDays() {
  CALENDAR_DAY_CONTAINER.innerHTML = "";

  for (const day of calendarPage.getDays()) {
    renderCalendarDay(day);
  }
}

function renderCalendarDay(day) {
  const dayElement = DAY_TEMPLATE.content.cloneNode(true);

  dayElement.querySelector(".day-number p").innerText = day.getDay();
  if (day.isSunday()) {
    dayElement.querySelector(".day .day-number").classList.add("day-sunday");
  }
  if (!calendarPage.isCurrentMonthDay(day)) {
    dayElement.querySelector(".day").classList.add("day-non-current-month");
  }
  if (day.getName()) {
    dayElement.querySelector(".day-description p").innerText = day.getName();
  }

  CALENDAR_DAY_CONTAINER.appendChild(dayElement);
}
//endregion


//region event listeners
function onLoadWindow() {
  setupPageElements();
  render();
}
//endregion


window.onload = onLoadWindow();
