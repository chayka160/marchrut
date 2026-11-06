
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });
  if (document.readyState !== 'loading') {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
