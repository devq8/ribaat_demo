/* Ribaat — landing page behaviour.
   Vanilla JS, no dependencies, progressive enhancement only. Everything here
   is optional: with JS disabled the page reads correctly, the accordion works
   natively, and every CTA is a plain link. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Scroll-driven syncs below run directly in their (passive) listeners rather
     than through requestAnimationFrame: some embedded contexts expose rAF but
     never invoke its callbacks, which silently drops the work. Each sync is a
     handful of reads and one write, and the UA already coalesces scroll events. */

  /* --- Theme --------------------------------------------------------------
     The page follows the operating system until the reader overrides it from the
     header switch; the override is stored and re-applied by the inline script in
     <head>, so first paint is already correct. Nothing here runs before paint.

     Only the label and the theme-color meta are maintained in JS — which icon
     shows is a CSS decision (see landing.css), so it survives with no script. */
  var themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    var root = document.documentElement;
    var darkMQ = window.matchMedia('(prefers-color-scheme: dark)');
    var stored = null;
    try { stored = localStorage.getItem('ribaat-theme'); } catch (e) {}

    var resolved = function () {
      var attr = root.getAttribute('data-theme');
      return attr === 'dark' || attr === 'light' ? attr : (darkMQ.matches ? 'dark' : 'light');
    };
    /* The label names the state the button moves TO, not the state it is in —
       "الوضع الداكن" on a light page is an action, which is what a button is. */
    /* Named syncTheme, not sync: the header block below declares its own `var
       sync` in this same IIFE, and `var` is function-scoped — the later
       declaration overwrote this one, so every click called the header's scroll
       sync and the button's label, aria-pressed and theme-color never moved. */
    var syncTheme = function () {
      var dark = resolved() === 'dark';
      var next = dark ? 'الوضع الفاتح' : 'الوضع الداكن';
      themeBtn.setAttribute('aria-label', next);
      themeBtn.setAttribute('title', next);
      themeBtn.setAttribute('aria-pressed', String(dark));
      /* The two media-scoped <meta> tags only track the OS; once an override is
         set they are stale, so the resolved value is written to one of them. */
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', dark ? '#201E18' : '#FBF9F3');
    };
    syncTheme();

    themeBtn.addEventListener('click', function () {
      var next = resolved() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      stored = next;
      try { localStorage.setItem('ribaat-theme', next); } catch (e) {}
      syncTheme();
    });

    /* If the reader never chose, the OS still owns the page — follow it live. */
    var onSystemChange = function () { if (!stored) syncTheme(); };
    if (darkMQ.addEventListener) darkMQ.addEventListener('change', onSystemChange);
    else if (darkMQ.addListener) darkMQ.addListener(onSystemChange);
  }

  /* --- Header scroll state ----------------------------------------------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    /* Two states. .is-scrolled is the shared shell's hairline; .is-past-hero
       flips the landing bar from the hero's ink field to the page surface, and is
       measured from the hero's own edge rather than a fixed scroll offset, so it
       lands exactly when the bar leaves the footage. */
    var heroEl = document.querySelector('.hero');
    var sync = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      if (!heroEl) return;
      var past = heroEl.getBoundingClientRect().bottom <= header.offsetHeight + 1;
      header.classList.toggle('is-past-hero', past);
    };
    sync();
    /* Scroll events are suppressed in some embedded contexts (README §12), so the
       flip is also driven by an observer on the hero's own boundary. */
    if (heroEl && 'IntersectionObserver' in window) {
      var watch = function () {
        return new IntersectionObserver(sync, {
          rootMargin: '-' + (header.offsetHeight + 1) + 'px 0px 0px 0px',
          threshold: [0, 0.001, 1]
        });
      };
      var obs = watch();
      obs.observe(heroEl);
      window.addEventListener('resize', function () { obs.disconnect(); obs = watch(); obs.observe(heroEl); });
    }
    ['wheel', 'touchmove', 'keyup', 'resize'].forEach(function (ev) {
      window.addEventListener(ev, sync, { passive: true });
    });
    window.addEventListener('scroll', sync, { passive: true });
  }

  /* --- Mobile navigation -------------------------------------------------- */
  var navToggle = document.querySelector('[data-nav-toggle]');
  var navPanel = document.querySelector('[data-nav-panel]');

  function setNav(open) {
    if (!navToggle || !navPanel) return;
    navToggle.setAttribute('aria-expanded', String(open));
    navPanel.hidden = !open;
  }

  if (navToggle && navPanel) {
    navToggle.addEventListener('click', function () {
      setNav(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    navPanel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        navToggle.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setNav(false);
    });
  }


  /* --- Faculty rail ------------------------------------------------------
     Progress rule + optional arrow controls. The rail is a native
     scroll-snap track: without JS it still scrolls, snaps and is keyboard
     reachable (tabindex on the track). */
  var railShell = document.querySelector('[data-rail]');
  if (railShell) {
    var track = railShell.querySelector('[data-rail-track]');
    var prev = railShell.querySelector('[data-rail-prev]');
    var next = railShell.querySelector('[data-rail-next]');
    var foot = railShell.querySelector('.rail__foot');
    var rtl = window.getComputedStyle(track).direction === 'rtl';

    /* Engines disagree on RTL scrollLeft (0..-max, max..0, or 0..max). Rather
       than probe with a write — which some engines clamp, reporting the wrong
       model — anchor on the resting value and measure distance from it. Works
       under every convention and touches nothing. */
    var origin = track.scrollLeft;
    var extent = function () { return track.scrollWidth - track.clientWidth; };
    var pos = function () {
      var max = extent();
      if (max <= 0) return 0;
      return Math.min(1, Math.max(0, Math.abs(track.scrollLeft - origin) / max));
    };

    var syncRail = function () {
      var p = pos();
      var visible = Math.min(1, track.clientWidth / track.scrollWidth);
      railShell.style.setProperty('--rail-fill', (visible + (1 - visible) * p).toFixed(4));
      if (prev) prev.disabled = p <= 0.01;
      if (next) next.disabled = p >= 0.99 || extent() <= 0;
      /* Two shaykhs today, more later: the controls are meaningless until the
         rail actually overflows, so they take themselves out. */
      if (foot) foot.hidden = extent() <= 1;
    };

    /* Explicit clamped target, so the sign is derived once from the resting
       value instead of guessed from scrollBy's physical axis. */
    var goTo = function (p) {
      var max = extent();
      if (max <= 0) return;
      p = Math.min(1, Math.max(0, p));
      /* Assigned directly, and the track keeps scroll-behavior: auto. Under
         scroll-snap: inline mandatory, animated scrolls (scrollTo smooth or CSS
         smooth) are dropped and re-snapped to the origin by some engines, which
         leaves the controls dead. The snap itself supplies the movement. */
      track.scrollLeft = origin + (rtl ? -1 : 1) * p * max;
      syncRail();
    };

    var step = function (dir) {
      var max = extent();
      if (max <= 0) return;
      var card = track.firstElementChild;
      var w = card ? card.getBoundingClientRect().width + 24 : track.clientWidth * 0.8;
      goTo(pos() + dir * (w / max));
    };

    if (next) next.addEventListener('click', function () { step(1); });
    if (prev) prev.addEventListener('click', function () { step(-1); });
    /* 'scroll' is the correct signal and does the work in a real browser, but
       some embedded contexts suppress it on inner scrollers, which would freeze
       the rule and the disabled states during a swipe. The interaction events
       cover that; all of them are passive and syncRail is three reads and one
       write. */
    ['scroll', 'wheel', 'touchmove', 'touchend', 'pointerup', 'keyup'].forEach(function (ev) {
      track.addEventListener(ev, syncRail, { passive: true });
    });
    window.addEventListener('resize', syncRail);
    syncRail();
  }

  /* --- كيف تسير الدراسة: pinned numeral ---------------------------------
     The figure is pinned by position: sticky in CSS; this only marks which step
     is in view. With JS off the first numeral shows, which is a correct static
     appearance. */
  var split = document.querySelector('[data-split]');
  if (split) {
    var steps = Array.prototype.slice.call(split.querySelectorAll('[data-step]'));
    var markStep = function () {
      var mid = (window.innerHeight || 800) * 0.45;
      var active = 1;
      steps.forEach(function (el, i) {
        if (el.getBoundingClientRect().top <= mid) active = i + 1;
      });
      split.setAttribute('data-active', String(active));
    };
    markStep();
    window.addEventListener('scroll', markStep, { passive: true });
    window.addEventListener('resize', markStep);
  }

  /* The lecture facade's click-to-load player is gone: من دروس المنصة now links
     out to the school's YouTube channel, so no player is ever built here and
     nothing is fetched from youtube.com at all. See README §18. */

  /* --- Registration handoff: warm the React bundle -----------------------
     Registration lives in a separate SPA, so the CTA is a cold cross-app
     navigation. Prefetch its entry chunk on first hover/focus — one request,
     idle priority, fired once. */
  var ctas = document.querySelectorAll('[data-preload-app]');
  var warmed = false;
  var warm = function (href) {
    if (warmed) return;
    warmed = true;
    var l = document.createElement('link');
    l.rel = 'prefetch';
    l.as = 'script';
    l.href = href;
    document.head.appendChild(l);
  };
  Array.prototype.forEach.call(ctas, function (cta) {
    var href = cta.getAttribute('data-preload-app');
    ['pointerenter', 'focus', 'touchstart'].forEach(function (ev) {
      cta.addEventListener(ev, function () { warm(href); }, { passive: true, once: true });
    });
  });

  /* --- Accordions: one open at a time, per group --------------------------
     querySelectorAll, not querySelector: there are two groups on the page now
     (the tracks index and the FAQ) and each closes only its own siblings. */
  Array.prototype.forEach.call(document.querySelectorAll('[data-accordion]'), function (group) {
    var items = Array.prototype.slice.call(group.querySelectorAll('details'));
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) { if (other !== item) other.open = false; });
      });
    });
  });

  /* --- Scroll reveal ------------------------------------------------------ */
  var revealables = document.querySelectorAll('[data-reveal]');

  function revealAll() {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-revealed'); });
  }

  var waiting = Array.prototype.slice.call(revealables);

  function revealInView() {
    var h = window.innerHeight || document.documentElement.clientHeight;
    waiting = waiting.filter(function (el) {
      if (el.getBoundingClientRect().top >= h * 0.92) return true;
      el.classList.add('is-revealed');
      return false;
    });
  }

  if (reduced.matches) {
    revealAll();
  } else {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
      Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
    }

    /* Geometry fallback. Some embedded contexts deliver the initial
       IntersectionObserver callback and then stop; this keeps reveal correct
       there at negligible cost (passive listener, rAF-throttled). */
    revealInView();
    window.addEventListener('scroll', revealInView, { passive: true });
    window.addEventListener('resize', revealInView);

    /* Safety net: a short self-terminating poll. Covers programmatic scrolls,
       anchor jumps and embedded viewers that do not emit scroll events. */
    var poll = window.setInterval(function () {
      revealInView();
      if (!waiting.length) window.clearInterval(poll);
    }, 400);
  }
  if (reduced.addEventListener) reduced.addEventListener('change', function (e) { if (e.matches) revealAll(); });
})();

/* --- Hero video ------------------------------------------------------------
   The poster still is the design; the footage is an upgrade, and it must never
   compete with first paint. So nothing is fetched until the window has LOADED,
   then only when the browser is idle, and only if the hero is actually in view.
   preload="none" alone is not enough — assigning .src starts the fetch, and doing
   that at DOMContentLoaded keeps the load event pending behind the video.

   The asset is the school's full recording, because it is the only properly muxed
   encode available: the 7-second WebM cut from it with MediaRecorder had no duration
   or cues in the container and stalled at HAVE_NOTHING in engines other than the one
   that made it. LOOP_SECONDS keeps the request to the opening seconds through a media
   fragment, so the browser streams a fraction of the file rather than the lecture.
   This is a stopgap for a real ffmpeg trim — see README §34. */
/* --- Hero carousel --------------------------------------------------------
   One slide is current; the rest are faded out, hidden from assistive tech, and
   made inert so nothing inside them can be tabbed to. The first slide carries
   .is-current in the markup, so with this script absent the hero is simply that
   slide — no flash, no empty box.

   Auto-advance is off unless the view sets data-interval, and even then it stops
   for good the moment the visitor touches the index: this is a school, and a
   panel that keeps moving under a reader's eye is exactly the urgency the brief
   rules out. It also never runs under prefers-reduced-motion or on a hidden tab.

   Videos are paused when their slide leaves and told to start when it arrives
   ('hero:activate'), so only the visible footage decodes. */
(function () {
  var hero = document.querySelector('[data-hero-carousel]');
  if (!hero) return;

  var slides = Array.prototype.slice.call(hero.querySelectorAll('.hero__slide'));
  var steps = Array.prototype.slice.call(hero.querySelectorAll('[data-hero-step]'));
  if (slides.length < 2) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var timer = null;
  var stopped = false;
  var i = 0;
  slides.forEach(function (s, k) { if (s.classList.contains('is-current')) i = k; });

  /* Read live, not once: the preview panel rewrites data-interval to demonstrate
     the two settings, and in Django a template change should not need a reload
     of this file's assumptions. */
  function interval() { return parseInt(hero.getAttribute('data-interval'), 10) || 0; }

  function show(n) {
    i = ((n % slides.length) + slides.length) % slides.length;
    slides.forEach(function (s, k) {
      var on = k === i;
      s.classList.toggle('is-current', on);
      s.setAttribute('aria-hidden', String(!on));
      if (on) s.removeAttribute('inert');
      else s.setAttribute('inert', '');
      var v = s.querySelector('video');
      if (!v) return;
      if (on) s.dispatchEvent(new CustomEvent('hero:activate'));
      else v.pause();
    });
    steps.forEach(function (b, k) { b.setAttribute('aria-current', String(k === i)); });
  }

  function pause() { if (timer) { window.clearInterval(timer); timer = null; } }

  function play() {
    pause();
    var ms = interval();
    if (stopped || !ms || reduce.matches) return;
    timer = window.setInterval(function () { show(i + 1); }, ms);
  }

  /* Preview panel hook: turning auto-advance on again clears the surrender. */
  hero.addEventListener('hero:autochange', function () { stopped = false; play(); });

  /* Once the reader has chosen a slide, the page stops choosing for them. */
  function surrender() { stopped = true; pause(); }

  steps.forEach(function (b, k) {
    b.addEventListener('click', function () { surrender(); show(k); });
  });

  var prev = hero.querySelector('[data-hero-prev]');
  var next = hero.querySelector('[data-hero-next]');
  if (prev) prev.addEventListener('click', function () { surrender(); show(i - 1); });
  if (next) next.addEventListener('click', function () { surrender(); show(i + 1); });

  hero.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (!e.target || !e.target.closest || !e.target.closest('[data-hero-step]')) return;
    e.preventDefault();
    surrender();
    /* RTL: the next slide lies to the LEFT. */
    show(i + (e.key === 'ArrowLeft' ? 1 : -1));
    if (steps[i]) steps[i].focus();
  });

  ['pointerenter', 'focusin'].forEach(function (ev) { hero.addEventListener(ev, pause); });
  ['pointerleave', 'focusout'].forEach(function (ev) { hero.addEventListener(ev, play); });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) pause(); else play();
  });

  show(i);
  play();
})();

(function () {
  var vids = document.querySelectorAll('[data-hero-video]');
  if (!vids.length) return;
  Array.prototype.forEach.call(vids, initHeroVideo);

  /* One instance per slide. Everything below was written for a single hero video
     and is unchanged apart from being closed over `v`. */
  function initHeroVideo(v) {
  var LOOP_SECONDS = 8;
  /* Cap on what the range-less fallback below is allowed to pull into memory. */
  var MAX_BLOB_BYTES = 4 * 1024 * 1024;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var conn = navigator.connection || {};
  var src = v.getAttribute('data-src');
  if (!src) return;

  /* A slide that is not on screen must not decode. The carousel announces an
     arrival; until then this video stays cold. */
  var slide = v.closest('.hero__slide');
  if (slide) slide.addEventListener('hero:activate', function () { start(); });

  /* The footage is 11.9MB and 173 seconds until the ffmpeg trim lands (§34), and
     the range-less-server fallback below can fetch it a SECOND time — so on a
     phone or a tablet this is a 12–24MB hero background. It is gated to the band
     where the hero is a full-bleed desktop composition; everywhere else the
     poster still is the design and stands alone. Remove the width clause once the
     asset is a 1–2MB cut. */
  function wanted() {
    return !reduce.matches && !conn.saveData && !/(^|-)2g$/.test(conn.effectiveType || '') &&
      window.matchMedia('(min-width: 900px)').matches;
  }

  /* Reveal listeners are bound through a function because the fallback below
     REPLACES the element, and listeners bound to the old node do not follow. */
  function bind(el) {
    function reveal() {
      if (el.readyState >= 2 || (el.poster && el.videoWidth > 0)) {
        el.setAttribute('data-ready', '');
      }
    }
    ['playing', 'canplay', 'loadeddata', 'loadedmetadata', 'timeupdate'].forEach(function (ev) {
      el.addEventListener(ev, reveal);
    });
    el.addEventListener('timeupdate', function () {
      if (el.currentTime >= LOOP_SECONDS) el.currentTime = 0;
    });
    /* Some hosts decode without emitting any of the above, and materialising an
       11MB asset can take twenty seconds on a slow link, so the poll outlives it. */
    var tries = 0;
    var poll = window.setInterval(function () {
      reveal();
      if (++tries > 240 || el.hasAttribute('data-ready')) window.clearInterval(poll);
    }, 250);

    /* A decode that stalls and recovers can leave the element paused mid-clip.
       Capped, so a refused autoplay settles on the poster instead of looping. */
    var resumes = 0;
    el.addEventListener('pause', function () {
      if (reduce.matches || resumes >= 5) return;
      resumes++;
      var p = el.play();
      if (p && p.catch) p.catch(function () {});
    });
  }

  function start() {
    if (!wanted() || v.currentSrc) return;
    if (slide && !slide.classList.contains('is-current')) return;

    bind(v);

    /* No media fragment on the src: '#t=0,8' forces an initial seek that this
       serving layer answers in a way the decoder never recovers from — the element
       sits at HAVE_NOTHING with a null duration. The loop is done in the
       timeupdate handler above instead, which needs no seek to start. */
    v.src = src;
    var played = v.play();
    if (played && played.catch) played.catch(function () { /* autoplay refused — poster stands */ });

    /* Fallback for servers that do not honour Range requests. A <video src> needs
       ranged, length-known responses to build a playable buffer; served as a plain
       200 with no Accept-Ranges and no Content-Length, the element sits at
       HAVE_NOTHING forever with no error to catch. The same bytes decode fine when
       handed over whole, so if nothing has decoded after a few seconds, fetch once
       and swap in a blob. Metered connections opted out long before this point.
       On a correctly configured server (WhiteNoise, nginx) this never fires.

       The blob must go to a NEW element. An element that stalled on the URL load
       stays wedged at HAVE_METADATA even after src reassignment plus load() — the
       same bytes in the same engine reach HAVE_ENOUGH_DATA instantly in a freshly
       created <video>. So the fallback clones the node, feeds the clone, and swaps
       it in; nothing about the stalled load survives. */
    setTimeout(function () {
      if (v.readyState >= 2) return;
      fetch(src).then(function (r) {
        if (!r.ok) return;
        /* Never materialise a large file in memory. The fallback exists for a
           range-less server, not to turn a stalled stream into a second full
           download — with the untrimmed 11.9MB asset (§34) that is what it did,
           and the page's load event stayed pending behind it. Above the cap the
           body is cancelled and the poster stands, which is the design anyway. */
        var len = parseInt(r.headers.get('content-length') || '0', 10);
        if (len > MAX_BLOB_BYTES) {
          if (r.body && r.body.cancel) r.body.cancel();
          return;
        }
        /* arrayBuffer, not blob(): the Blob this serving layer hands back is backed
           by the same range-less response, so reading it through a blob: URL stalls
           exactly as the direct load did. Copying the bytes into a Blob built here
           gives the decoder a real, length-known resource — measured HAVE_NOTHING
           vs HAVE_ENOUGH_DATA on identical bytes. */
        return r.arrayBuffer().then(function (buf) {
          return new Blob([buf], { type: r.headers.get('content-type') || 'video/mp4' });
        });
      }).then(function (blob) {
        if (!blob || v.readyState >= 2) return;
        var fresh = v.cloneNode(false);
        fresh.removeAttribute('data-ready');
        /* preload="none" is right for the URL load — it is what keeps the footage
           out of first paint. It is wrong here: the bytes are already in memory,
           so the clone must be told to decode them. */
        fresh.setAttribute('preload', 'auto');
        fresh.muted = true;
        fresh.src = URL.createObjectURL(blob);
        bind(fresh);
        if (v.parentNode) v.parentNode.replaceChild(fresh, v);
        v.pause();
        v.removeAttribute('src');
        v.load();
        v = fresh;
        var again = v.play();
        if (again && again.catch) again.catch(function () {});
      }).catch(function () { /* poster stands */ });
    }, 3000);
  }

  /* Everything below RACES its mechanisms rather than feature-detecting them.
     requestIdleCallback and IntersectionObserver both EXIST in some embedded hosts
     and never invoke their callbacks (README §12 — the same trap took rAF and
     scroll events before it), so an `if (window.requestIdleCallback)` fallback is
     dead code in exactly the host that needs it. start() guards on v.currentSrc,
     so being called two or three times is harmless. */
  function whenIdle(fn) {
    if (window.requestIdleCallback) window.requestIdleCallback(fn, { timeout: 2000 });
    setTimeout(fn, 800);
  }

  function afterLoad() {
    var hero = v.closest('.hero') || v;

    whenIdle(function () {
      /* If the hero is already in view — it is, on first load — there is nothing
         to wait for. */
      var box = hero.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) start();
    });

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          obs.disconnect();
          start();
        });
      }, { threshold: 0.15 });
      obs.observe(hero);
    }

    /* Last backstop: neither callback fired and the hero never reported itself. */
    setTimeout(start, 1500);
  }

  /* The load event may already have fired before this deferred script attached. */
  if (document.readyState === 'complete') afterLoad();
  else {
    window.addEventListener('load', afterLoad, { once: true });
    /* …and if it never fires in this host either, go anyway. */
    setTimeout(afterLoad, 2500);
  }

  var onChange = function (e) {
    if (!e.matches) return;
    v.pause();
    v.removeAttribute('data-ready');
  };
  if (reduce.addEventListener) reduce.addEventListener('change', onChange);
  else if (reduce.addListener) reduce.addListener(onChange);
  }
})();
