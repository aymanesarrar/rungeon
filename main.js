window.onload = Run_Stage_Required_Scripts();

//Global vars
const totalStages = 4;
var stage = 1;

//Stage one vars
var stageOne_ClickCount = 0;
var stageOne_Opacity = 1.0;
var stageOne_BtnDisabled = false;

//Stage two vars
var stageTwo_hasCoin = false;

// START OF GLOBAL FUNCTIONS

//Some stages require an initial setup before the stage is loaded. This script is run as soon as the page is loaded.
function Run_Stage_Required_Scripts() {
  // Fetch themes from local storage
  GetThemes();
  //Stage one
  document.getElementById("stage_1-icon").style.opacity = 1.0;
}

/*
Some stages might require resetting certain elements to their original value, or the other way around (for example, if you grab a coin, go to the next stage and then come back, you shouldn't be able to grab a coin again).
This function runs everytime the stage changes. Use it to setup any logic you need applied in case the user comes back to the stage.
*/

function Reset_Stage(stage) {
  switch (stage) {
    case 1:
      stageOne_ClickCount = 0;
      stageOne_Opacity = 1.0;
      stageOne_BtnDisabled = false;
      document.getElementById("stage_1-icon").style.opacity = 1;
      document.getElementById("stage_1-icon").style.visibility = "visible";
      Disable_Continue_Button(1);
    case 2:
      stageTwo_hasCoin = false;
      document.getElementById("stage_2-coin").style.display = "initial";
      Disable_Continue_Button(2);
    case 3:
      Disable_Continue_Button(3);
      document.getElementById(
        "stage_3-icon"
      ).style.cursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='32' height='38' viewport='0 0 100 100' style='fill:black;font-size:19px;'><text y='50%'>🟡</text></svg>") 16 0,auto`;
    default:
      break;
  }
}

/*
We really only need the stage we're in right now. Using template literals (also called "back-ticks" -> ` <-) we can directly grab the ID of the stage we're in, as well as the stage we want to change to.

This kind of setup will allow us to add as many stages as we want, as long as we have one stage called "stage_start" and another called "stage_end".
*/

function Previous_Stage(currentStage) {
  if (currentStage == "end") {
    stage = totalStages;
    document.getElementById(`stage_end`).classList.add("d-none");
    document.getElementById(`stage_${stage}`).classList.remove("d-none");
  } else if (currentStage == 1) {
    stage = 0;
    document.getElementById(`stage_${currentStage}`).classList.add("d-none");
    document.getElementById(`stage_start`).classList.remove("d-none");
  } else {
    stage--;
    document.getElementById(`stage_${currentStage}`).classList.add("d-none");
    document.getElementById(`stage_${stage}`).classList.remove("d-none");
  }
  Update_Title_Progress();
  Reset_Stage(stage);
}

function Next_Stage(currentStage) {
  if (currentStage == "start") {
    stage = 1;
    document.getElementById(`stage_start`).classList.add("d-none");
    document.getElementById(`stage_${stage}`).classList.remove("d-none");
  } else if (currentStage == totalStages) {
    stage = totalStages + 1;
    document.getElementById(`stage_${currentStage}`).classList.add("d-none");
    document.getElementById(`stage_end`).classList.remove("d-none");
  } else {
    stage++;
    document.getElementById(`stage_${currentStage}`).classList.add("d-none");
    document.getElementById(`stage_${stage}`).classList.remove("d-none");
  }
  Update_Title_Progress();
  Reset_Stage(stage);
}

// These functions allow us to enable/disable the continue button. Should be combined with other logic for a more interactive stage (grabbing a coin / giving it, etc)

function Enable_Continue_Button(currentStage) {
  document.getElementById(`stage_${currentStage}-btn`).disabled = false;
  document.getElementById(`stage_${currentStage}-btn`).innerHTML = "Continue";
}

function Disable_Continue_Button(currentStage) {
  document.getElementById(`stage_${currentStage}-btn`).disabled = true;
}

function Restart() {
  stage = 0;
  window.location.href = "index.html";
}

function StartGame() {
  stage = 0;
  window.location.href = "rungeon.html";
}

function ToggleThemePopup() {
  if (document.getElementById("themePopup").hidden) {
    document.getElementById("themePopup").hidden = false;
    document.getElementById("doors_icon").style.visibility = "hidden";
  } else {
    document.getElementById("themePopup").hidden = true;
    document.getElementById("doors_icon").style.visibility = "visible";
  }
}

function SetTheme(event) {
  document.getElementById("serika").innerHTML = "serika  ";
  document.getElementById("cobalt").innerHTML = "cobalt  ";
  document.getElementById("hedge").innerHTML = "hedge  ";
  document.getElementById("passionfruit").innerHTML = "passionfruit  ";
  document.getElementById("rgb").innerHTML = "rgb  ";
  document.getElementById("dots").innerHTML = "dots  ";
  document.getElementById(
    "themeStylesheet"
  ).href = `styles/themes/${event.target.id}.css`;
  localStorage.setItem("index_theme", `${event.target.id}`);
  localStorage.setItem("theme", `${event.target.id}`);
  document.getElementById(event.target.id).innerHTML +=
    '<i class="fa-solid fa-check"></i>';
    ToggleThemePopup();
}


function GetThemes() {
  // index.html theme check
  if (localStorage.getItem("index_theme") == null) {
    console.log("theme was null");
    document.getElementById(
      "themeStylesheet"
    ).href = `styles/themes/default.css`;
  } else {
    let index_theme = localStorage.getItem("index_theme");
    document.getElementById(
      "themeStylesheet"
    ).href = `styles/themes/${index_theme}.css`;
  }

  // rungeon.html theme check
  if (localStorage.getItem("theme") == null) {
    console.log("theme was null");
    document.getElementById(
      "themeStylesheet"
    ).href = `styles/themes/default.css`;
  } else {
    console.log("Getting rungeon themes...");
    let theme = localStorage.getItem("theme");
    document.getElementById(
      "themeStylesheet"
    ).href = `styles/themes/${theme}.css`;
    document.getElementById(theme).innerHTML +=
      '<i class="fa-solid fa-check"></i>';
  }
}

function Update_Title_Progress() {
  let val = stage / (totalStages + 2);
  switch (true) {
    case val <= 0.1:
      document.title = "██░░░░░░░░";
      break;
    case val <= 0.2:
      document.title = "███░░░░░░░";
      break;
    case val <= 0.3:
      document.title = "████░░░░░░";
      break;
    case val <= 0.4:
      document.title = "█████░░░░░";
      break;
    case val <= 0.5:
      document.title = "██████░░░░";
      break;
    case val <= 0.6:
      document.title = "███████░░░";
      break;
    case val <= 0.7:
      document.title = "████████░░";
      break;
    case val <= 0.8:
      document.title = "██████████";
      break;
  }
}

// END OF GLOBAL FUNCTIONS

// START OF STAGE SPECIFIC FUNCTIONS

/* STAGE ONE */
function Stage_One_Squish() {
  stageOne_ClickCount++;
  stageOne_Opacity -= 0.4;

  if (stageOne_BtnDisabled == false) {
    document.getElementById("stage_1-icon").style.opacity -= stageOne_Opacity;
  }

  if (stageOne_ClickCount >= 3) {
    Enable_Continue_Button(1);
    stageOne_BtnDisabled = true;
    document.getElementById("stage_1-icon").style.opacity = 0;
    document.getElementById("stage_1-icon").style.visibility = "hidden";
  }
}

/* STAGE TWO */
function Stage_Two_Coin() {
  document.getElementById("stage_2-coin").style.display = "none";
  stageTwo_hasCoin = true;
}

/* STAGE THREE */
function Stage_Three_Coin() {
  if (stageTwo_hasCoin) {
    Enable_Continue_Button(3);
    document.getElementById("stage_3-btn").disabled = false;
    document.getElementById("stage_3-icon").style.cursor = "auto";
  }
}

/* STAGE FOUR */
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}


function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  document.getElementById("stage_4-h1").textContent = "The door is unlocked";
  document.getElementById("stage_4-p").textContent =
    "I knew that was useful, good work!";
  Enable_Continue_Button(4);
}
