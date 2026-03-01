import { CalendarPage } from "./calendar-page.mjs";


const calendarPage = new CalendarPage();
const yearInput = document.getElementById("year-input");
const monthSelect = document.getElementById("month-select");
const backwardButton = document.getElementById("month-backward-button");
const frowardButton = document.getElementById("month-forward-button");
const calendarDaysContainer = document.getElementById("calendar-body");


//region prepare
function setupPageElements() {
  yearInput.addEventListener("change", (event) => {
    calendarPage.updateYear(event.target.value);
    render();
  });

  for (let month = CalendarPage.MONTH_MIN; month <= CalendarPage.MONTH_MAX; month++) {
    monthSelect.add(new Option(CalendarPage.getMonthString(month), month));
  }
  monthSelect.addEventListener("change", (event) => {
    calendarPage.updateMonth(event.target.value);
    render();
  });

  backwardButton.addEventListener("click", () => {
    calendarPage.changeMonth(-1);
    render();
  });

  frowardButton.addEventListener("click", () => {
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
  yearInput.value = calendarPage.getYear();
}

function renderMonthSelect() {
  monthSelect.value = calendarPage.getMonth();
}

function renderMonthText() {
  document.getElementById("month-text").innerText =
    `${calendarPage.getMonthString()} ${calendarPage.getYear()}`;
}

function renderCalendarDays() {
  calendarDaysContainer.innerHTML = "";

  for (const day of calendarPage.getDays()) {
    renderCalendarDay(day);
  }
}

function renderCalendarDay(day) {
  const dayElement = document.getElementById("day-template").content.cloneNode(true);

  dayElement.querySelector(".day-number p").innerText = day.getDay();
  if (day.isSunday()) {
    dayElement.querySelector(".day .day-number").classList.add("day-sunday");
  }
  if (!calendarPage.isCurrentMonthDay(day)) {
    dayElement.querySelector(".day").classList.add("day-non-current-month");
  }
  if (day.getDescription()) {
    dayElement.querySelector(".day-description p").innerText = day.getDescription();
  }

  calendarDaysContainer.appendChild(dayElement);
}
//endregion


//region event listeners
function onLoadWindow() {
  setupPageElements();
  render();
}
//endregion


window.onload = onLoadWindow();
