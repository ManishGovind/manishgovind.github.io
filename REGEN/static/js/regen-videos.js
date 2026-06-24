(function () {
  function setupSectionAutoplay(sectionId) {
    var section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    var videos = Array.from(section.querySelectorAll('video'));
    if (!videos.length) {
      return;
    }

    videos.forEach(function (video) {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
    });

    function playAll() {
      videos.forEach(function (video) {
        var playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(function () {});
        }
      });
    }

    function pauseAll() {
      videos.forEach(function (video) {
        if (!video.paused) {
          video.pause();
        }
      });
    }

    if (!('IntersectionObserver' in window)) {
      playAll();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            playAll();
          } else {
            pauseAll();
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setupSectionAutoplay('visualization');
      setupSectionAutoplay('qualitative-results');
    });
  } else {
    setupSectionAutoplay('visualization');
    setupSectionAutoplay('qualitative-results');
  }
})();
