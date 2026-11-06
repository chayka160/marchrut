
  (function() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    window.__observeAnimations = function(root) {
      var scope = root || document;
      if (scope !== document && scope.hasAttribute && scope.hasAttribute('data-animate')) {
        observer.observe(scope);
      }
      scope.querySelectorAll('[data-animate]').forEach(function(el) {
        observer.observe(el);
      });
    };

    window.__observeAnimations(document);
  })();
