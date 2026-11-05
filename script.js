
document.addEventListener('DOMContentLoaded', () => {
  const model = document.querySelector('#banana-model');
  const progress = document.querySelector('.progress-container');
  const progressFill = document.querySelector('.progress-fill');
  const rotateButton = document.querySelector('#rotate-toggle');

  if (!model) return;

  // Audio engine
  let audioContext = null;
  let lastSound = 0;

  function playCatSound() {
    const now = Date.now();

    // Prevent sound spam
    if (now - lastSound < 250) return;
    lastSound = now;

    try {
      if (!audioContext) {
        audioContext = new (
          window.AudioContext || window.webkitAudioContext
        )();
      }

      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const ctx = audioContext;
      const time = ctx.currentTime;

      // Main meow oscillator
      const oscillator = ctx.createOscillator();
      const volume = ctx.createGain();

      oscillator.type = 'sine';

      oscillator.frequency.setValueAtTime(620, time);
      oscillator.frequency.exponentialRampToValueAtTime(
        950, time + 0.09
      );
      oscillator.frequency.exponentialRampToValueAtTime(
        430, time + 0.25
      );
      oscillator.frequency.exponentialRampToValueAtTime(
        550, time + 0.38
      );

      // Sound envelope
      volume.gain.setValueAtTime(0.001, time);
      volume.gain.linearRampToValueAtTime(0.22, time + 0.04);
      volume.gain.exponentialRampToValueAtTime(
        0.001, time + 0.42
      );

      oscillator.connect(volume);
      volume.connect(ctx.destination);

      oscillator.start(time);
      oscillator.stop(time + 0.43);

      // Soft second harmonic
      const second = ctx.createOscillator();
      const secondVolume = ctx.createGain();

      second.type = 'triangle';
      second.frequency.setValueAtTime(1240, time);
      second.frequency.exponentialRampToValueAtTime(
        860, time + 0.3
      );

      secondVolume.gain.setValueAtTime(0.001, time);
      secondVolume.gain.linearRampToValueAtTime(
        0.035, time + 0.04
      );
      secondVolume.gain.exponentialRampToValueAtTime(
        0.001, time + 0.3
      );

      second.connect(secondVolume);
      secondVolume.connect(ctx.destination);

      second.start(time);
      second.stop(time + 0.32);

    } catch (error) {
      console.warn('Audio unavailable:', error);
    }
  }

  // Click on Banana Cat = MEOW!
  model.addEventListener('click', playCatSound);

  // Loading progress
  model.addEventListener('progress', (event) => {
    const percent = event.detail.totalProgress * 100;

    if (progressFill) {
      progressFill.style.width = `${percent}%`;
    }

    if (progress) {
      progress.classList.toggle('hide', percent >= 100);
    }
  });

  model.addEventListener('load', () => {
    if (progress) progress.classList.add('hide');
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

  console.log('BANANA CAT experience loaded 🍌');
});
