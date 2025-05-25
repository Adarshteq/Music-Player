const SONG_LIST = [
  {
    songName: "Shape of You",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1740240410/Shape_of_You_chfqak.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1740241407/Shape_of_U_lrisr7.png",
  },
  {
    songName: "Die with a Smile",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1740240418/Die_With_A_Smile_xyjmxf.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1747041850/Die_with_a_smile_szfjlw.png",
  },
  {
    songName: "Hanging Tree",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1747039812/Hunger_Games_-_The_Hanging_Tree_orriin.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1747039110/Hanging_Tree_kshzab.png",
  },
  {
    songName: "Dandelions",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1747039708/Ruth_B._-_Dandelions_zq91aw.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1747039104/Dandelions_rzm0ss.png",
  },
  {
    songName: "Let me down slowly",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1747039779/Justin_-_Let_me_love_you_ezetac.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1747039102/Let_me_down_slowly_xgx29w.png",
  },
  {
    songName: "Believer",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1747039799/Imagine_Dragons_-_Believer_cxtoky.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1747039095/Believer_waxxma.png",
  },
  {
    songName: "Attention",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1747039781/Charlie_Puth_-_Attention_xohql5.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1747039107/Attention_ephgpj.png",
  },
  {
    songName: "Let me love you",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1747039779/Justin_-_Let_me_love_you_ezetac.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1747039106/Let_me_love_you_fv0jd9.png",
  },
    {
    songName: "Bye Bye",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1747039765/NSYNC_-_Bye_Bye_Bye_lbznyy.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1747039094/Bye_Bye_Bye_b4n4xi.png",
  },  {
    songName: "Mission Impossible Theme",
    music: "https://res.cloudinary.com/dbzvr3l7j/video/upload/v1747039733/Mission_Impossible_Theme_nvtcta.mp3",
    album: "https://res.cloudinary.com/dbzvr3l7j/image/upload/v1747039093/Mission_Impossible_aasqkk.png",
  }
  
];
let updateTrack;
let isMixBtnClick = false;
let isRepeatBtnClick = false;
let isAddBtnClick = false;
let mixModeTxt = "Mix all";
let repeatModeTxt = "Repeat";
let arrayCount = 0;
let changeWarningText = document.getElementById("change-warning");
const music = document.getElementById("music");
let currentMusic = document.getElementById("currentMusic");
let volumeSlider = document.getElementById("volume-slider");
let trackSlider = document.getElementById("track-slider");
const albumImg = document.getElementById("album-img");
const currentSongName = document.getElementById("current-song-name");
const backgroundImg = document.getElementById("container");
const play = document.getElementById("play");
const rightBtn = document.getElementById("right");
const leftBtn = document.getElementById("left");
const mixBtn = document.getElementById("mix");
const repeatBtn = document.getElementById("repeat");
const menuIcon = document.getElementById("menu-icon");
const menuCancelIcon = document.getElementById("cancel-icon")
const menu = document.querySelector("nav");
const addBtn = document.getElementById("add-icon");
const newSongContainer = document.getElementById("new-song-container");

// EVENT LISTENER

rightBtn.addEventListener("click", changeSong);
leftBtn.addEventListener("click", changeSong);
play.addEventListener("click", audioPlay);
volumeSlider.addEventListener("change", changeVolume);
trackSlider.addEventListener("change", changeTrack);
trackSlider.addEventListener("change", seekUpdate);
music.addEventListener("ended", autoSongChange);
mixBtn.addEventListener("click", mixModeActive);
repeatBtn.addEventListener("click", repeatModeActive);
menuIcon.addEventListener("click", openMenu);
menuCancelIcon.addEventListener("click", cancelMenu)
addBtn.addEventListener("click", newSongPage);

// FUNCTION

function changeSong(e) {
  let way = e.target;
  mixSongs();
  swapBtn(way);
  changeSwapStyle();
  if(play.textContent === "❚ ❚"){
    music.play()
  }
}

function mixSongs() {
  if (isMixBtnClick) {
    arrayCount = Math.floor(Math.random() * SONG_LIST.length);
  }
}

function swapBtn(way) {
  if (way === rightBtn) {
    arrayCount++;
  } else if (way === leftBtn) {
    arrayCount--;
  }
  disableSwap();
}

function disableSwap() {
  if (arrayCount >= SONG_LIST.length) {
    return (arrayCount = 0);
  } else if (arrayCount < 0) {
    return (arrayCount = Number(`${SONG_LIST.length - 1}`));
  }
}

function changeSwapStyle() {
  albumImg.style.background = `url(${SONG_LIST[arrayCount].album}) no-repeat  center center`;
  albumImg.style.backgroundSize = "cover";
  backgroundImg.style.background = `url(${SONG_LIST[arrayCount].background}) no-repeat  center center`;
  backgroundImg.style.backgroundSize = "cover";
  currentSongName.innerHTML = `${SONG_LIST[arrayCount].songName}`;
  music.src = `${SONG_LIST[arrayCount].music}`;
}

function audioPlay() {
  const icon = music.paused ? "❚ ❚" : "►";
  play.textContent = icon;
  music.paused ? music.play() : music.pause();
  updateTrack = setInterval(seekUpdate, 1000);
}

function changeVolume() {
  music.volume = volumeSlider.value / 100;
}
function changeTrack() {
  time = music.duration * (trackSlider.value / 100);
  music.currentTime = time;
}

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(music.duration)) {
    seekPosition = music.currentTime * (100 / music.duration);
    trackSlider.value = seekPosition;
  }
}

function autoSongChange() {
  mixModeSongChange();
  repeatModeSongChange();
  resetAutoChangeIfEnd();
  updateTrack = setInterval(seekUpdate, 1000);
  if(play.textContent === "❚ ❚"){
    music.play()
  }
}

function mixModeSongChange() {
  if (isMixBtnClick) {
    mixSongs();
  } else if (isRepeatBtnClick) {
    return;
  } else {
    arrayCount++;
  }
}

function repeatModeSongChange() {
  isRepeatBtnClick ? clearInterval(updateTrack) : changeSwapStyle();
}

function resetAutoChangeIfEnd() {
  if (arrayCount >= SONG_LIST.length - 1) {
    arrayCount = 0;
  }
}

function mixModeActive() {
  if (isRepeatBtnClick) {
    return;
  } else if (!isMixBtnClick) {
    ifModeActive(mixBtn, mixModeTxt);
    isMixBtnClick = true;
  } else if (isMixBtnClick) {
    mixBtn.style.transform = "scale(1)";
    isMixBtnClick = false;
    changeWarning("");
  }
}

function repeatModeActive() {
  if (isMixBtnClick) {
    return;
  } else if (!isRepeatBtnClick) {
    isRepeatBtnClick = true;
    ifModeActive(repeatBtn, repeatModeTxt);
  } else if (isRepeatBtnClick) {
    isRepeatBtnClick = false;
    repeatBtn.style.transform = "scale(1)";
    changeWarning("");
  }
}

function ifModeActive(button, text) {
  button.style.transform = "scale(1.3)";
  changeWarning(text);
}

function changeWarning(text) {
  return (changeWarningText.innerText = text);
}

function openMenu() {
  menu.style.left = "0";
}

function cancelMenu(){
  menu.style.left = "-20rem"
}

function newSongPage() {
  addSongCondition();
  isAddBtnClick
    ? (newSongContainer.style.display = "flex")
    : (newSongContainer.style.display = "none");
}

function addSongCondition() {
  
  !isAddBtnClick ? (isAddBtnClick = true) : (isAddBtnClick = false);
}
