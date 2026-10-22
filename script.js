const hero = document.querySelector(".hero");
const video = document.querySelector("#intro-video");
const fallbackImage = document.querySelector("#fallback-image");
const profileActions = document.querySelector("#profile-actions");
const startButton = document.querySelector("#start-button");
const siteHeader = document.querySelector("#site-header");
const menuButton = siteHeader.querySelector(".menu-button");
let selectedProfile = null;

function setMenuOpen(isOpen) {
  siteHeader.classList.toggle("is-menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
}

function revealProfiles() {
  hero.classList.add("is-finished");
  profileActions.hidden = false;
}

function showFallback() {
  video.hidden = true;
  fallbackImage.hidden = false;
}

function handleIlonaSelection() {
  // Connect Ilona's video transition here when that scene is available.
}

function handleTimofeySelection() {
  // Connect Timofey's video transition here when that scene is available.
}

function selectProfile(profile) {
  selectedProfile = profile;

  if (profile === "ilona") {
    handleIlonaSelection();
  } else {
    handleTimofeySelection();
  }
}

function handlePlaybackError(error) {
  if (error.name === "NotAllowedError") {
    startButton.hidden = false;
  } else if (error.name === "NotSupportedError") {
    showFallback();
  } else if (error.name !== "AbortError") {
    console.error("Не удалось запустить видео:", error);
  }
}

video.addEventListener("ended", revealProfiles);
video.addEventListener("error", showFallback);

fallbackImage.addEventListener("error", () => {
  fallbackImage.hidden = true;
});

if (fallbackImage.complete && fallbackImage.naturalWidth === 0) {
  fallbackImage.hidden = true;
}

if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
  showFallback();
}

window.setTimeout(() => {
  if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
    showFallback();
  }

  if (fallbackImage.complete && fallbackImage.naturalWidth === 0) {
    fallbackImage.hidden = true;
  }
}, 1500);

document.querySelectorAll("[data-profile]").forEach((button) => {
  button.addEventListener("click", () => {
    selectProfile(button.dataset.profile);
  });
});

function startPlayback() {
  startButton.hidden = true;
  video.play().catch(handlePlaybackError);
}

startButton.addEventListener("click", startPlayback);
menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

video.play().catch(handlePlaybackError);
