const audio = document.getElementById('musicAudio');
const toggle = document.getElementById('musicToggle');
const vinyl = document.getElementById('vinyl');
const status = document.getElementById('audioStatus');
const video = document.getElementById('welcomeVideo');
const photo = document.querySelector('.photo-frame img');
const photoFrame = document.querySelector('.photo-frame');

function setPlayingState(isPlaying) {
  toggle.classList.toggle('is-playing', isPlaying);
  toggle.setAttribute('aria-pressed', String(isPlaying));
  toggle.setAttribute('aria-label', isPlaying ? 'Pause Project X music' : 'Play Project X music');
  vinyl.classList.toggle('is-spinning', isPlaying);
  status.textContent = isPlaying ? 'Music playing' : 'Music off';
}

async function toggleMusic() {
  try {
    if (audio.paused) {
      await audio.play();
      setPlayingState(true);
    } else {
      audio.pause();
      setPlayingState(false);
    }
  } catch (error) {
    setPlayingState(false);
    status.textContent = 'Add a valid music file in /assets/music.mp3';
    console.warn('Project X audio could not be played:', error);
  }
}

toggle.addEventListener('click', toggleMusic);
audio.addEventListener('play', () => setPlayingState(true));
audio.addEventListener('pause', () => setPlayingState(false));
audio.addEventListener('ended', () => setPlayingState(false));
audio.addEventListener('error', () => {
  setPlayingState(false);
  status.textContent = 'Add a valid music file in /assets/music.mp3';
});
toggle.addEventListener('pointerdown', () => toggle.classList.add('is-pressed'));
toggle.addEventListener('pointerup', () => toggle.classList.remove('is-pressed'));
toggle.addEventListener('pointercancel', () => toggle.classList.remove('is-pressed'));
video.addEventListener('loadeddata', () => {
  video.classList.add('is-ready');
  const fallback = document.querySelector('.video-fallback');
  if (fallback) fallback.style.display = 'none';
});
photo.addEventListener('load', () => {
  photo.classList.add('is-ready');
  photoFrame.classList.add('has-image');
});
photo.addEventListener('error', () => {
  photo.classList.remove('is-ready');
  photoFrame.classList.remove('has-image');
});
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('is-loaded'));
});
