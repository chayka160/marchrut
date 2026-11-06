
(function(){
  var KEY='utm_params_2748';
  var p=new URLSearchParams(window.location.search);
  var keys=['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
  var has=keys.some(function(k){return p.has(k);});
  if(has){var o={};keys.forEach(function(k){if(p.get(k))o[k]=p.get(k);});try{localStorage.setItem(KEY,JSON.stringify(o));}catch(e){}}
  window.__getUtmParams=function(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch(e){return {};}};
})();
