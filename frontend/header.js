import MatrixProfile from "./profile";

import "./header.css";

function onLogout(profile) {
  const auth2 = gapi.auth2.getAuthInstance();

  auth2.signOut().then(() => {
    profile.terminate();
    auth2.disconnect();
    window.location.href = "./";
  });
}

function loadUserName(profile) {
  document.getElementById(
    "userName",
  ).innerText = `Whats'up ${profile.userName()}`;
}

function setupEvents(profile) {
  document
    .getElementById("btnLogout")
    .addEventListener("click", () => onLogout(profile));
}

export default () => {
  const profile = new MatrixProfile();

  loadUserName(profile);
  setupEvents(profile);
};
