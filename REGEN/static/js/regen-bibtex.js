(function () {
  var copyBtn = document.getElementById('bibtex-copy-btn');
  var bibtexBlock = document.getElementById('bibtex-block');

  if (!copyBtn || !bibtexBlock) {
    return;
  }

  var label = copyBtn.querySelector('.regen-bibtex-copy-label');
  var icon = copyBtn.querySelector('i');
  var resetTimer;

  function getBibtexText() {
    var code = bibtexBlock.querySelector('code');
    return (code ? code.innerText : bibtexBlock.innerText).trim();
  }

  function setCopiedState() {
    copyBtn.classList.add('is-copied');
    if (label) {
      label.textContent = 'Copied';
    }
    if (icon) {
      icon.className = 'fas fa-check';
    }

    clearTimeout(resetTimer);
    resetTimer = setTimeout(function () {
      copyBtn.classList.remove('is-copied');
      if (label) {
        label.textContent = 'Copy';
      }
      if (icon) {
        icon.className = 'fas fa-copy';
      }
    }, 2000);
  }

  copyBtn.addEventListener('click', function () {
    var text = getBibtexText();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(setCopiedState).catch(function () {
        fallbackCopy(text);
      });
      return;
    }

    fallbackCopy(text);
  });

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      setCopiedState();
    } catch (error) {
      console.error('Failed to copy BibTeX:', error);
    }

    document.body.removeChild(textarea);
  }
})();
