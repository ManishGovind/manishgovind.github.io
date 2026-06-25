(function () {
  var WORKER_SRC =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  function showFallback(canvas, pdfUrl, message) {
    if (canvas.dataset.fallbackShown === 'true') {
      return;
    }
    canvas.dataset.fallbackShown = 'true';
    canvas.insertAdjacentHTML(
      'afterend',
      '<p class="has-text-centered" style="margin-top: 1rem;">' +
        (message || 'Unable to load figure.') +
        ' <a href="' +
        pdfUrl +
        '" target="_blank" rel="noopener">Open PDF</a></p>'
    );
  }

  function renderPdfPage(pdfjsLib, canvas, pdfUrl) {
    var container = canvas.parentElement;
    var parentWidth = container.clientWidth || 800;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    return pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {
      return pdf.getPage(1).then(function (page) {
        var baseViewport = page.getViewport({ scale: 1 });
        var scale = (parentWidth / baseViewport.width) * Math.max(2, dpr);
        var viewport = page.getViewport({ scale: scale });

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

  function initCanvas(pdfjsLib, canvas) {
    var pdfUrl = canvas.dataset.pdfSrc;
    if (!pdfUrl) {
      return;
    }

    function tryRender() {
      var width = canvas.parentElement.clientWidth;
      if (!width) {
        requestAnimationFrame(tryRender);
        return;
      }

      renderPdfPage(pdfjsLib, canvas, pdfUrl).catch(function (error) {
        console.error('REGEN PDF figure failed to render:', pdfUrl, error);
        showFallback(canvas, pdfUrl, 'Figure preview unavailable.');
      });
    }

    tryRender();
    return tryRender;
  }

  function init() {
    var canvases = document.querySelectorAll('.regen-pdf-canvas[data-pdf-src]');
    var pdfjsLib = window.pdfjsLib;
    var renderers = [];

    if (!canvases.length) {
      return;
    }

    if (!pdfjsLib) {
      canvases.forEach(function (canvas) {
        showFallback(canvas, canvas.dataset.pdfSrc, 'PDF viewer failed to load.');
      });
      return;
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_SRC;

    canvases.forEach(function (canvas) {
      renderers.push(initCanvas(pdfjsLib, canvas));
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        renderers.forEach(function (tryRender) {
          tryRender();
        });
      }, 200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
