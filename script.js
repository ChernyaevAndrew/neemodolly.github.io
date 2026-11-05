
document.addEventListener('DOMContentLoaded', () => {
  const model = document.querySelector('#banana-model');
  const progress = document.querySelector('.progress-container');
  const progressFill = document.querySelector('.progress-fill');
  const rotateButton = document.querySelector('#rotate-toggle');
  const catAudio = document.querySelector('#cat-audio');

  if (!model) return;

  // CUSTOM CAT SOUND
  let lastSound = 0;

  function playCatSound() {
    if (!catAudio) return;

    const now = Date.now();

    // Small delay between sounds
    if (now - lastSound < 400) return;

    lastSound = now;

    catAudio.pause();
    catAudio.currentTime = 0;

    catAudio.play().catch(error => {
      console.warn('Could not play cat sound:', error);
    });
  }

  // Play sound when touching the 3D model
  model.addEventListener('click', playCatSound);

  // Loading progress
  model.addEventListener('progress', event => {
    const percent = event.detail.totalProgress * 100;

    if (progressFill) {
      progressFill.style.width = `${percent}%`;
    }

    if (progress) {
      progress.classList.toggle('hide', percent >= 100);
    }
  });

  model.addEventListener('load', () => {
    if (progress) {
      progress.classList.add('hide');
    }
  });

  // Rotation control
  if (rotateButton) {
    rotateButton.addEventListener('click', () => {
      if (model.hasAttribute('auto-rotate')) {
        model.removeAttribute('auto-rotate');
        rotateButton.innerHTML =
          '<span>▶</span> START ROTATION';
      } else {
        model.setAttribute('auto-rotate', '');
        rotateButton.innerHTML =
          '<span>Ⅱ</span> PAUSE ROTATION';
      }
    });
  }

  document.body.classList.add('page-loaded');

  console.log('BANANA CAT loaded 🍌');
});

