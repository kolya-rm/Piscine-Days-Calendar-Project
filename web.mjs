import { CalendarPage } from "./calendar-page.mjs";


const calendarPage = new CalendarPage();

const yearInput = document.getElementById("year-input");
const monthSelect = document.getElementById("month-select");
const backwardButton = document.getElementById("month-backward-button");
const monthText = document.getElementById("month-text");
const frowardButton = document.getElementById("month-forward-button");
const calendarDaysContainer = document.getElementById("calendar-body");

const dayElementTemplate = document.getElementById("day-template");


//region prepare
function setupPageElements() {
  yearInput.addEventListener("change", () => {
    calendarPage.updateYear(yearInput.value);
    render();
  });
  yearInput.addEventListener("input", () => {
    if(yearInput.value.length > CalendarPage.YEAR_MAX_LENGTH) {
      yearInput.value = yearInput.value.slice(0, CalendarPage.YEAR_MAX_LENGTH);
    }
  });

  for (let month = 0; month < CalendarPage.MONTH_STRINGS.length; month++) {
    monthSelect.add(new Option(CalendarPage.getMonthString(month), month));
  }
  monthSelect.addEventListener("change", () => {
    calendarPage.updateMonth(monthSelect.value);
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
  monthText.innerText = `${calendarPage.getMonthString()} ${calendarPage.getYear()}`;
}

function renderCalendarDays() {
  calendarDaysContainer.innerHTML = "";

  for (const day of calendarPage.getDays()) {
    renderCalendarDay(day);
  }
}

function renderCalendarDay(day) {
  const dayElement = dayElementTemplate.content.cloneNode(true);

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
