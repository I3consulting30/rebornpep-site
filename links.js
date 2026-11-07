(function () {
  var L = window.REBORN_LINKS || {};
  function set(id, url, live, liveLabel) {
    var el = document.getElementById(id);
    if (!el) return;
    if (live && url) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener";
      el.removeAttribute("aria-disabled");
      var small = el.querySelector("small");
      if (small) small.textContent = liveLabel;
    }
  }
  set("cta-ios", L.appStore, L.appStoreLive, "Télécharger sur");
  set("cta-ios-2", L.appStore, L.appStoreLive, "Télécharger sur");
  set("cta-play", L.googlePlay, L.googlePlayLive, "Disponible sur");
  ["cta-group", "cta-optin", "cta-play-test"].forEach(function (id, i) {
    var el = document.getElementById(id);
    var url = [L.testerGroup, L.testerOptIn, L.googlePlay][i];
    if (el && url) el.href = url;
  });
})();
