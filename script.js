/* =========================================================
   Caitlyn Sherman · site behavior · "Aurora"
   Vanilla JS, no dependencies.
   ========================================================= */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Save-my-contact: generate a vCard on the fly ---------- */
  var saveBtn = document.getElementById("save-contact");
  if (saveBtn) {
    saveBtn.addEventListener("click", function () {
      var vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Sherman;Caitlyn;;;",
        "FN:Caitlyn Sherman",
        "TITLE:Early Career Software Engineer",
        "EMAIL;TYPE=INTERNET:caitlynasherman04@icloud.com",
        "URL;TYPE=LinkedIn:https://linkedin.com/in/caitlyn-sherman-swe",
        "URL;TYPE=GitHub:https://github.com/cassieeeeeeeee",
        "ADR;TYPE=HOME:;;;Tampa;FL;;USA",
        "END:VCARD"
      ].join("\r\n");

      var blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "Caitlyn-Sherman.vcf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    });
  }

  /* ---------- Expandable project cards ---------- */
  var toggles = document.querySelectorAll(".card-toggle");
  toggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".card");
      if (!card) return;
      var open = card.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      var label = btn.querySelector(".ct-label");
      if (label) label.textContent = open ? "Less" : "Details";
    });
  });

  /* ---------- Pointer-tracking 3D tilt + glare (desktop only) ---------- */
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (finePointer && !reduce) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;   // 0..1
        var py = (e.clientY - r.top) / r.height;   // 0..1
        var rx = (py - 0.5) * -8;                   // rotate around X
        var ry = (px - 0.5) * 10;                   // rotate around Y
        card.style.transform =
          "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) scale(1.02)";
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Reveal-on-scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Quick-jump nav: highlight the current section ---------- */
  var navLinks = document.querySelectorAll(".pillnav a");
  if (navLinks.length && "IntersectionObserver" in window) {
    var linkFor = {};
    navLinks.forEach(function (a) { linkFor[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove("active"); });
          var link = linkFor[entry.target.id];
          if (link) link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    ["about", "work", "experience", "skills"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ---------- Current year in footer ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
