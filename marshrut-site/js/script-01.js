
window.getDetailedCareerTestUrl = (function () {
  var localUrl;
  return function () {
    if (window.location.protocol !== 'file:') {
      return new URL('detailed-test.html', window.location.href).href;
    }
    if (!localUrl) {
      var raw = atob(document.getElementById('detailed-test-source').textContent.trim());
      var bytes = Uint8Array.from(raw, function (character) { return character.charCodeAt(0); });
      localUrl = URL.createObjectURL(new Blob([bytes], { type: 'text/html;charset=utf-8' }));
    }
    return localUrl;
  };
})();
