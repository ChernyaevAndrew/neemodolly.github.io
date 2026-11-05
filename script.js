
document.addEventListener('DOMContentLoaded', () => {
  const model = document.querySelector('#banana-model');
  const progress = document.querySelector('.progress-container');
  const progressFill = document.querySelector('.progress-fill');
  const rotateButton = document.querySelector('#rotate-toggle');

  if (!model) return;

  // 3D model loading progress
  model.addEventListener('progress', (event) => {
    const percent = event.detail.totalProgress * 100;

    if (progressFill) {
      progressFill.style.width = `${percent}%`;
    }

    if (progress) {
      progress.classList.toggle('hide', percent >= 100);
    }
  });

  // Hide loader when the model is ready
  model.addEventListener('load', () => {
    if (progress) progress.classList.add('hide');
  });

  // Rotation control
  if (rotateButton) {
    rotateButton.addEventListener('click', () => {
      if (model.hasAttribute('auto-rotate')) {
        model.removeAttribute('auto-rotate');
        rotateButton.innerHTML = '<span>▶</span> START ROTATION';
      } else {
        model.setAttribute('auto-rotate', '');
        rotateButton.innerHTML = '<span>Ⅱ</span> PAUSE ROTATION';
      }
    });
  }

  // Smooth entrance
  document.body.classList.add('page-loaded');

  console.log('BANANA CAT experience loaded 🍌');
});
