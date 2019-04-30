/* global MatrixProfile, gapi */

const matrixProfile = new MatrixProfile();

function onLogout() {
  const auth2 = gapi.auth2.getAuthInstance();

  auth2.signOut().then(() => {
    matrixProfile.terminate();
    auth2.disconnect();
    window.location.href = './';
  });
}

function loadUserName() {
  document.getElementById('userName').innerText = matrixProfile.userName();
}

function setupEvents() {
  document.getElementById('btnLogout').addEventListener('click', onLogout);
}

window.addEventListener('DOMContentLoaded', () => {
  loadUserName();
  setupEvents();
});
