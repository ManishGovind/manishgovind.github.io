(function () {
  const PDF_URL = './assets/img/corl26_method_diag.pdf';
  const CANVAS_ID = 'method-figure';

  function showFallback(canvas, message) {
    if (canvas.dataset.fallbackShown === 'true') {
      return;
    }
    canvas.dataset.fallbackShown = 'true';
    canvas.insertAdjacentHTML(
      'afterend',
      '<p class="has-text-centered" style="margin-top: 1rem;">' +
        (message || 'Unable to load figure.') +
        ' <a href="' +
        PDF_URL +
        '" target="_blank" rel="noopener">Open PDF</a></p>'
    );
  }

  function renderPdfPage(pdfjsLib, canvas) {
    const container = canvas.parentElement;
    const parentWidth = container.clientWidth || 800;

    return pdfjsLib.getDocument(PDF_URL).promise.then(function (pdf) {
      return pdf.getPage(1).then(function (page) {
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = (parentWidth / baseViewport.width) * 2;
        const viewport = page.getViewport({ scale: scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = '100%';
        canvas.style.height = 'auto';

        return page.render({
          canvasContext: canvas.getContext('2d'),
          viewport: viewport,
        }).promise;
      });
    });
  }

  function init() {
    const canvas = document.getElementById(CANVAS_ID);
    const pdfjsLib = window.pdfjsLib;

    if (!canvas) {
      return;
    }

    if (!pdfjsLib) {
      showFallback(canvas, 'PDF viewer failed to load.');
      return;
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    function tryRender() {
      const width = canvas.parentElement.clientWidth;
      if (!width) {
        requestAnimationFrame(tryRender);
        return;
      }

      renderPdfPage(pdfjsLib, canvas).catch(function (error) {
        console.error('REGEN method figure failed to render:', error);
        showFallback(canvas, 'Figure preview unavailable.');
      });
    }

    tryRender();

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(tryRender, 200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
