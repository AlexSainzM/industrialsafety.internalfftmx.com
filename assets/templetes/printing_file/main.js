/** FFT México — Printing File Template | Template Version: 1.0.0 */
(() => {
  'use strict';
  // TEMPLATE CORE — no data fetching, interpolation or automatic printing.
  const button = document.getElementById('printButton');
  const status = document.getElementById('printStatus');
  const logo = document.getElementById('documentLogo');
  if (!button || !status) return;

  if (logo) {
    const hideFailedLogo = () => { logo.hidden = true; };
    logo.addEventListener('error', hideFailedLogo, { once: true });
    if (logo.complete && !logo.naturalWidth) hideFailedLogo();
  }

  // Bound the wait for stalled assets; the permanent FFT text is the fallback.
  function imageReady(image) {
    return new Promise((resolve) => {
      let timer;
      const finish = () => {
        clearTimeout(timer);
        image.removeEventListener('load', finish);
        image.removeEventListener('error', finish);
        if (!image.naturalWidth) image.hidden = true;
        resolve();
      };
      if (image.complete) { finish(); return; }
      image.addEventListener('load', finish, { once: true });
      image.addEventListener('error', finish, { once: true });
      timer = setTimeout(finish, 5000);
    });
  }

  button.hidden = false;
  button.addEventListener('click', async () => {
    button.disabled = true;
    status.textContent = 'Preparando el documento…';
    try {
      await Promise.all(Array.from(document.querySelectorAll('.document img'), imageReady));
      // Two frames let image fallback/layout changes reach the renderer.
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      status.textContent = '';
      window.print();
    } catch {
      status.textContent = 'Utiliza la opción Imprimir del navegador para continuar.';
    } finally {
      // Closing/cancelling print is not proof of successful printing.
      button.disabled = false;
    }
  });
})();

// DOCUMENT-SPECIFIC LOGIC — optional instance behavior goes below.
// Preserve source field names; insert dynamic values with textContent, never raw HTML.
// Dates and references belong to the document and must not change when printing.
