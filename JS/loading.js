setTimeout(() => {
    const loadingOverlay = document.getElementById('loading-overlay');
    const mainContent = document.getElementsByTagName('main');

    loadingOverlay.style.display = 'none';
    mainContent.style.display = 'block';
  }, 1000); 