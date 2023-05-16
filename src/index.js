import Comfey from "comfey";
import "./styles.css";

import {
  BATTERY_LIFE,
  GAME_STATUS,
  STARTING_VALUES,
  GIFT_COOLDOWN
} from "./config";

const DEBUG = true;
const app = new Comfey(document.getElementById("app"), DEBUG);

// Select buttons
const btnFeed = document.getElementById("feed");
const btnHeal = document.getElementById("heal");
const btnBattle = document.getElementById("battle");
const btnGift = document.getElementById("gift");
const btnRestart = document.getElementById("restart");

// Initialize states
const [getBooting, setBooting] = app.useState("booting", 1);
const [getGameStatus, setGameStatus] = app.useState(
  "gameStatus",
  GAME_STATUS.BOOTING,
  gameStatusWatcher
);
const [getCp, setCp] = app.useState("cp", STARTING_VALUES.CP);
const [getRasp, setRasp] = app.useState("rasp", STARTING_VALUES.RASP);
const [getPotion, setPotion] = app.useState("potion", STARTING_VALUES.POTION);
const [getClock, setClock] = app.useState("clock", GIFT_COOLDOWN);
const [getBattery, setBattery] = app.useState("battery", BATTERY_LIFE);
const [getHp, setHp] = app.useState("hp", 50);
const [getHighScore, setHighscore] = app.useState("highScore", 0);

const [getMotivation, setMotivation] = app.useState(
  "motivation",
  STARTING_VALUES.MOTIVATION
);

function gameStatusWatcher(newVal) {
  if (newVal === GAME_STATUS.BOOTING) {
    setCp(STARTING_VALUES.CP);
    setHp(STARTING_VALUES.HP);
    setRasp(STARTING_VALUES.RASP);
    setPotion(STARTING_VALUES.POTION);
    setMotivation(STARTING_VALUES.MOTIVATION);
    setBattery(BATTERY_LIFE);
    setClock(GIFT_COOLDOWN);
  }
}

// Button behaviours
btnFeed.addEventListener("click", () => {
  setMotivation(Math.min(getMotivation() + 10, 100));
  setRasp(Math.max(getRasp() - 1, 0));
});

btnHeal.addEventListener("click", () => {
  setHp(Math.min(getHp() + 8, 100));
  setPotion(Math.max(getPotion() - 1, 0));
});

btnBattle.addEventListener("click", () => {
  setCp(getCp() + getMotivation());
  setMotivation(Math.max(getMotivation() - random(5, 10), 0));
  setHp(Math.max(getHp() - random(5, 10), 0));
});

btnGift.addEventListener("click", () => {
  setRasp(getRasp() + random(0, 4));
  setPotion(getPotion() + random(0, 5));
  setClock(GIFT_COOLDOWN);
});

btnRestart.addEventListener("click", () => {
  setGameStatus(GAME_STATUS.BOOTING);
});

// Timed behaviours
setInterval(() => {
  switch (getGameStatus()) {
    case GAME_STATUS.BOOTING:
      const booting = getBooting();
      if (booting < 100) {
        setBooting(Math.min(booting + random(5, 55), 100));
      } else {
        setBooting(0);
        setGameStatus(GAME_STATUS.ACTIVE);
      }
      break;

    case GAME_STATUS.ACTIVE:
      const battery = getBattery();
      if (battery) {
        setBattery(battery - 1);
      } else {
        setGameStatus(GAME_STATUS.OVER);
      }
      const current = getClock();
      if (current) {
        setClock(current - 1);
      }
      break;

    case GAME_STATUS.OVER:
      setHighscore(Math.max(getHighScore(), getCp()));
      break;

    default:
      break;
  }
}, 1000);

// Utility functions
function random(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}
