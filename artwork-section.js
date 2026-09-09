(() => {
  const stage = document.querySelector('.artwork-stage');
  const object = document.querySelector('.artwork-object');
  const image = document.querySelector('.artwork-image');
  const imageWrap = document.querySelector('.artwork-image-wrap');
  if (!stage || !object || !image || !imageWrap) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let raf = 0;
  let pointer = { x: 0, y: 0 };

  const render = () => {
    raf = 0;
    if (reducedMotion.matches) return;
    const rotateY = pointer.x * 3.4;
    const rotateX = pointer.y * -2.8;
    const lift = (Math.abs(pointer.x) + Math.abs(pointer.y)) * 1.5;
    object.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${lift}px)`;
    stage.closest('.artwork-section')?.classList.toggle('is-interacting', Boolean(pointer.x || pointer.y));
  };

  const updatePointer = (clientX, clientY, rect) => {
    pointer.x = Math.max(-1, Math.min(1, (clientX - rect.left) / rect.width * 2 - 1));
    pointer.y = Math.max(-1, Math.min(1, (clientY - rect.top) / rect.height * 2 - 1));
    if (!raf) raf = requestAnimationFrame(render);
  };

  stage.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
      updatePointer(event.clientX, event.clientY, stage.getBoundingClientRect());
    }
  });

  stage.addEventListener('pointerleave', () => {
    pointer = { x: 0, y: 0 };
    if (!raf) raf = requestAnimationFrame(render);
  });

  stage.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    updatePointer(touch.clientX, touch.clientY, stage.getBoundingClientRect());
  }, { passive: true });

  stage.addEventListener('touchend', () => {
    pointer = { x: 0, y: 0 };
    if (!raf) raf = requestAnimationFrame(render);
  }, { passive: true });

  image.addEventListener('load', () => {
    image.classList.add('is-loaded');
    imageWrap.classList.add('is-loaded');
  });

  if (image.complete && image.naturalWidth > 0) {
    image.classList.add('is-loaded');
    imageWrap.classList.add('is-loaded');
  }

  reducedMotion.addEventListener?.('change', () => {
    if (reducedMotion.matches) {
      pointer = { x: 0, y: 0 };
      object.style.transform = '';
    }
  });
})();
