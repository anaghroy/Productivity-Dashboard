function openfeatures() {
  let allElems = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElem");
  let fullElemPagebackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPagebackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}

openfeatures();

// To-do list
function todoList() {
  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.warn("Task is empty!");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elem, index) {
      sum += `<div class="task">
    <h5>${elem.task} <span class=${elem.imp}>Imp</span></h5>
    <button id=${index}>Mark as completed</button>
    </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (dets) {
    dets.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });

    renderTask();

    taskCheckbox.checked = false;
    taskInput.value = "";
    taskDetailsInput.value = "";
  });
}
todoList();

// Daily-Planner
function dailyPlanner() {
  let dayPlanner = document.querySelector(".day-planner");
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  let hours = Array.from(
    { length: 18 },
    (elem, index) => `${6 + index}:00 - ${7 + index}:00`
  );

  // Rendering into Daily Planner
  let wholeDaySum = "";
  hours.forEach(function (elem, index) {
    let savedData = dayPlanData[index] || "";
    wholeDaySum += `<div class="day-planner-time">
            <p>${elem}</p>
            <input id=${index} type="text" placeholder="...." value=${savedData}>
          </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  //Storing into LocalStorage
  let dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlanner();

// Motivational-Quote
function motivationalQuote() {
  let motivationQuoteContent = document.querySelector(".motivation-2 h1");
  let motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let respone = await fetch("http://api.quotable.io/random");
    let data = await respone.json();
    motivationQuoteContent.innerHTML = data.content;
    motivationAuthor.innerHTML = data.author;
  }

  fetchQuote();
}
motivationalQuote();

// Pomodoro-Timer
function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  let startBtn = document.querySelector(".pomo-timer .start-timer");
  let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  let resetBtn = document.querySelector(".pomo-timer .reset-timer");
  let session = document.querySelector(".pomodoro-fullpage .session");
  let isWorkSession = true;

  let timerInterval = null;
  let totalSeconds = 25 * 60;

  function updateTime() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart("2", 0)} : ${String(
      seconds
    ).padStart("2", 0)}`;
  }

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTime();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--blue)";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTime();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--green)";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 25 * 60;
    updateTime();
  }
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

/*Fontpage*/
let header1Time = document.querySelector(".header1 h1");
let header1Date = document.querySelector(".header1 h2");
let header2Temp = document.querySelector(".header2 h2");
let header2Condition = document.querySelector(".header2 h4");
let precipitation = document.querySelector(".header2 .precipitation");
let humidity = document.querySelector(".header2 .humidity");
let wind = document.querySelector(".header2 .wind");

let data = null;

async function weatherAPICall(city) {
  let APIkey = "1e928816884386acbabed2e3f63b9d69";
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
  );
  let data = await response.json();
  console.log(data);
  header2Temp.innerHTML = `${data.main.temp}°C`;
  header2Condition.innerHTML = `${data.weather[0].main}`;
  precipitation.innerHTML = `Pressure: ${Math.floor(data.main.pressure)}%`;
  wind.innerHTML = `Wind: ${data.wind.speed} km/h`;
  humidity.innerHTML = `Humidity: ${data.main.humidity}`;
}
weatherAPICall("Guwahati");

function timeDate() {
  const totaldaysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const totalMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date();
  let dayOfWeek = totaldaysOfWeek[date.getDay()];
  let hours = date.getDay();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let currentdate = date.getDate();
  let month = totalMonths[date.getMonth()];
  let year = date.getFullYear();

  header1Date.innerHTML = `${currentdate} ${month} ${year}`;

  if (hours > 12) {
    header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart(
      "2",
      "0"
    )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
      "2",
      "0"
    )} PM`;
  } else {
    header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart(
      "2",
      "0"
    )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
      "2",
      "0"
    )} AM`;
  }
}
setInterval(() => {
  timeDate();
}, 1000);
