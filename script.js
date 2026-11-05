
document.addEventListener('DOMContentLoaded', () => {

  // =====================================
  // ELEMENTS
  // =====================================

  const model = document.querySelector('#banana-model');

  const progress = document.querySelector('.progress-container');
  const progressFill = document.querySelector('.progress-fill');

  const rotateButton = document.querySelector('#rotate-toggle');

  const catAudio = document.querySelector('#cat-audio');

  const touchHint = document.querySelector('#touch-hint');


  if (!model) {
    console.error('Banana Cat model was not found.');
    return;
  }


  // =====================================
  // ROTATION
  // =====================================

  let isRotating = model.hasAttribute('auto-rotate');

  function updateRotationButton() {

    if (!rotateButton) return;

    if (isRotating) {

      rotateButton.innerHTML =
        '<span>Ⅱ</span> PAUSE ROTATION';

      rotateButton.setAttribute('aria-pressed', 'false');

    } else {

      rotateButton.innerHTML =
        '<span>▶</span> START ROTATION';

      rotateButton.setAttribute('aria-pressed', 'true');

    }

  }


  if (rotateButton) {

    updateRotationButton();

    rotateButton.addEventListener('click', () => {

      isRotating = !isRotating;

      if (isRotating) {

        model.setAttribute('auto-rotate', '');

      } else {

        model.removeAttribute('auto-rotate');

      }

      updateRotationButton();

    });

  }


  // =====================================
  // CAT SOUND
  // =====================================

  let lastSound = 0;

  function playCatSound() {

    if (!catAudio) return;

    const now = Date.now();

    // Prevent repeated sounds
    if (now - lastSound < 400) return;

    lastSound = now;

    catAudio.pause();
    catAudio.currentTime = 0;

    catAudio.play().catch(error => {

      console.warn(
        'Could not play cat sound:',
        error
      );

    });

  }


  // Play when user interacts with the model
  model.addEventListener('click', playCatSound);


  // =====================================
  // TOUCH INTERACTION
  // =====================================

  model.addEventListener('pointerdown', () => {

    if (touchHint) {

      touchHint.classList.add('hint-active');

    }

  });

  model.addEventListener('pointerup', () => {

    if (touchHint) {

      touchHint.classList.remove('hint-active');

    }

  });


  // =====================================
  // LOADING PROGRESS
  // =====================================

  model.addEventListener('progress', event => {

    const percent = event.detail.totalProgress * 100;

    if (progressFill) {

      progressFill.style.width = `${percent}%`;

    }

    if (progress) {

      progress.classList.toggle(
        'hide',
        percent >= 100
      );

    }

  });


  // =====================================
  // MODEL LOADED
  // =====================================

  model.addEventListener('load', () => {

    console.log('Banana Cat model loaded successfully.');

    if (progress) {

      progress.classList.add('hide');

    }

  });


  // =====================================
  // MODEL ERROR
  // =====================================

  model.addEventListener('error', event => {

    console.error(
      'Could not load Banana Cat model:',
      event
    );

    if (progress) {

      progress.classList.add('hide');

    }

  });


  // =====================================
  // AUDIO ERROR
  // =====================================

  if (catAudio) {

    catAudio.addEventListener('error', () => {

      console.warn(
        'Cat sound file is missing or unavailable.'
      );

    });

  }


  // =====================================
  // PAGE LOADED
  // =====================================

  document.body.classList.add('page-loaded');

  console.log('BANANA CAT loaded 🍌');

});
