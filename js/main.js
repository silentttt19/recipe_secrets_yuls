/* ==========================================================================
   Recipe Secrets Restaurant - shared script (vanilla JS, no dependencies)
   ========================================================================== */
(function () {
  "use strict";

  // Enables the fade-in CSS only when JS is running (content stays visible otherwise)
  document.documentElement.classList.add("js");

  /* --- Footer year ------------------------------------------------------ */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --- Sticky header: changes style on scroll --------------------------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Mobile hamburger menu -------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); toggle.focus(); }
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  }

  /* --- Fade-in on scroll ------------------------------------------------ */
  var fades = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    fades.forEach(function (el) { io.observe(el); });
  } else {
    fades.forEach(function (el) { el.classList.add("visible"); });
  }

  /* --- Specials filter buttons ------------------------------------------ */
  var filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.dataset.filter;
      filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      document.querySelectorAll("[data-category]").forEach(function (card) {
        card.hidden = !(f === "all" || card.dataset.category === f);
      });
    });
  });

  /* --- Gallery lightbox ------------------------------------------------- */
  var thumbs = Array.prototype.slice.call(document.querySelectorAll(".gallery button"));
  if (thumbs.length) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Image gallery");
    lb.innerHTML =
      '<button class="lightbox__btn lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__btn lightbox__prev" aria-label="Previous image">&#8249;</button>' +
      '<img alt="">' +
      '<button class="lightbox__btn lightbox__next" aria-label="Next image">&#8250;</button>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector("img"), idx = 0, opener = null;

    function show(i) {
      idx = (i + thumbs.length) % thumbs.length;
      var img = thumbs[idx].querySelector("img");
      lbImg.src = img.dataset.full || img.src;
      lbImg.alt = img.alt;
    }
    function openLb(i) { opener = document.activeElement; show(i); lb.classList.add("open"); lb.querySelector(".lightbox__close").focus(); }
    function closeLb() { lb.classList.remove("open"); if (opener) opener.focus(); }

    thumbs.forEach(function (b, i) { b.addEventListener("click", function () { openLb(i); }); });
    lb.querySelector(".lightbox__close").addEventListener("click", closeLb);
    lb.querySelector(".lightbox__prev").addEventListener("click", function () { show(idx - 1); });
    lb.querySelector(".lightbox__next").addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* --- Forms: validation + Web3Forms submit ----------------------------- */
  // Reservation date can't be in the past
  var dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    var t = new Date();
    dateInput.min = t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0");
  }

  function fieldError(field, msg) {
    var wrap = field.closest(".field");
    wrap.classList.toggle("invalid", !!msg);
    wrap.querySelector(".error-msg").textContent = msg || "";
    if (msg) field.setAttribute("aria-invalid", "true"); else field.removeAttribute("aria-invalid");
    return !msg;
  }

  function validateField(f) {
    var v = f.value.trim(), label = f.dataset.label || "This field";
    if (f.required && !v) return fieldError(f, label + " is required.");
    if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return fieldError(f, "Please enter a valid email address.");
    if (f.type === "tel" && v && !/^[+()\-.\s\d]{7,20}$/.test(v)) return fieldError(f, "Please enter a valid phone number.");
    if (f.type === "date" && v) {
      if (f.min && v < f.min) return fieldError(f, "Please choose today or a future date.");
    }
    if (f.type === "number" && v && (+v < +f.min || +v > +f.max)) return fieldError(f, "Please enter " + f.min + " to " + f.max + " guests.");
    if (f.tagName === "TEXTAREA" && f.minLength > 0 && v && v.length < f.minLength) return fieldError(f, "Please write at least " + f.minLength + " characters.");
    return fieldError(f, "");
  }

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    var fields = form.querySelectorAll("input:not([type=hidden]):not(.hp), select, textarea");
    var status = form.querySelector(".form-status");
    var btn = form.querySelector('button[type="submit"]');

    fields.forEach(function (f) {
      f.addEventListener("blur", function () { validateField(f); });
      f.addEventListener("input", function () { if (f.closest(".field").classList.contains("invalid")) validateField(f); });
    });

    function showStatus(kind, title, text) {
      status.className = "form-status show " + kind;
      status.innerHTML = "<h3></h3><p></p>";
      status.querySelector("h3").textContent = title;
      status.querySelector("p").textContent = text;
      status.focus();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      fields.forEach(function (f) { if (!validateField(f) && !firstBad) firstBad = f; });
      if (firstBad) { firstBad.focus(); return; }

      var data = new FormData(form);
      if (data.get("botcheck")) return;                       // honeypot filled = bot
      var name = (data.get("name") || "").toString().split(" ")[0];
      var okTitle = form.dataset.okTitle.replace("{name}", name);

      // TODO: Until a real Web3Forms access key is set, run in demo mode (no network call).
      var key = (data.get("access_key") || "").toString();
      if (!key || key.indexOf("YOUR_ACCESS_KEY") !== -1) {
        console.warn("Demo mode: add your Web3Forms access key to send real emails (see README).");
        showStatus("success", okTitle, form.dataset.okText);
        form.reset();
        return;
      }

      btn.disabled = true;
      var original = btn.textContent;
      btn.textContent = "Sending…";
      fetch(form.action, { method: "POST", headers: { Accept: "application/json" }, body: data })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (!json.success) throw new Error(json.message || "Submission failed");
          showStatus("success", okTitle, form.dataset.okText);
          form.reset();
        })
        .catch(function () {
          showStatus("fail", "Sorry, something went wrong", "Your message was not sent. Please try again or call us directly.");
        })
        .then(function () { btn.disabled = false; btn.textContent = original; });
    });
  });
})();
