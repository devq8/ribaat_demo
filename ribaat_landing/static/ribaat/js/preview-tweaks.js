/* PREVIEW ONLY — tweaks panel behaviour. Not part of the Django page.
   Writes three attributes on <html> and remembers the choice. */
(function () {
  'use strict';

  var STORE = 'ribaat-tweaks';
  var root = document.documentElement;

  var GROUPS = [
    {
      key: 'tone',
      attr: 'data-tone',
      label: 'البناء اللوني',
      hint: 'أين ينتهي الحبر ويبدأ الورق.',
      options: [
        { v: 'ink-hero', t: 'حبرٌ ثم ورق' },
        { v: 'paper', t: 'ورقٌ كامل' },
        { v: 'ink-full', t: 'حبرٌ كامل' }
      ],
      def: 'ink-hero'
    },
    {
      key: 'material',
      attr: 'data-material',
      label: 'حضور المادة',
      hint: 'نصيب الصور والخطِّ الكبير من الصفحة.',
      options: [
        { v: 'restrained', t: 'مقتصد' },
        { v: 'balanced', t: 'متوازن' },
        { v: 'dominant', t: 'طاغٍ' }
      ],
      def: 'balanced'
    },
    {
      key: 'geometry',
      attr: 'data-geometry',
      label: 'البنية الهندسية',
      hint: 'مقدار ما تُفصِّل به الهندسةُ الأقسام.',
      options: [
        { v: 'none', t: 'بلا' },
        { v: 'rules', t: 'خطوط' },
        { v: 'fields', t: 'حقول' }
      ],
      def: 'rules'
    },
    {
      key: 'heromedia',
      attr: 'data-hero-media',
      label: 'خلفية الشريحة',
      hint: 'يُطبَّق على الشريحة المعروضة الآن، وفي الموقع يُضبط لكلّ شريحة على حدة.',
      options: [
        { v: 'video', t: 'فيديو' },
        { v: 'image', t: 'صورة' },
        { v: 'none', t: 'بلا خلفية' }
      ],
      def: 'video'
    },
    {
      key: 'herotext',
      attr: 'data-hero-text',
      label: 'نصّ الشريحة',
      hint: 'شريحةٌ بلا نصّ تترك المادة وحدها، ويبقى سطر النسبة.',
      options: [
        { v: 'on', t: 'نصّ كامل' },
        { v: 'off', t: 'بلا نصّ' }
      ],
      def: 'on'
    },
    {
      key: 'heroauto',
      attr: 'data-hero-auto',
      label: 'تقليب الشرائح',
      hint: 'التقليب التلقائي يتوقّف نهائيًا عند أول لمسة من القارئ.',
      options: [
        { v: 'auto', t: 'تلقائي' },
        { v: 'manual', t: 'يدوي' }
      ],
      def: 'auto'
    },
    {
      key: 'enrolment',
      attr: 'data-enrolment',
      label: 'زمن الفصل الدراسي',
      hint: 'الصفحة في أطوار السنة الثلاثة: قبل بداية الفصل، وأثناءه، وبعد انتهائه.',
      options: [
        { v: 'open', t: 'قبل البداية' },
        { v: 'running', t: 'أثناء الفصل' },
        { v: 'upcoming', t: 'بعد الانتهاء' }
      ],
      def: 'open'
    }
  ];

  /* The three phases of the school year. Slot copy is the brief's, verbatim; the
     review strip at the foot of the preview keeps showing all three at once, while
     this switches the hero in place so a phase can be judged in its real setting.

     'enrol' is the state slot. 'register' is whether the primary action still leads
     to registration in that phase: enrolment is only open before the term starts, so
     in the other two the emphasis moves to تصفّح المسارات and ابدأ التسجيل steps back.
     No new copy — only which of the two existing actions carries the weight. That
     emphasis swap is a proposal, not received: see README §21. */
  var PHASES = {
    open: {
      enrol: { label: 'التسجيل مفتوح', detail: 'يبدأ الفصل الدراسي في سبتمبر ٢٠٢٦' },
      register: true
    },
    running: {
      enrol: { label: 'الفصل الدراسي جارٍ', detail: 'يُعلَن عن التسجيل للفصل القادم في حينه' },
      register: false
    },
    upcoming: {
      enrol: { label: 'الفصل القادم', detail: 'يبدأ التسجيل للفصل القادم في ١ يوليو ٢٠٢٧' },
      register: false
    }
  };

  var state = {};
  try { state = JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) { state = {}; }

  /* The hero controls are the one PER-SLIDE pair in this panel, so they must not
     live in the global, persisted state: a single value stamped onto whichever
     slide is on screen overwrites what the template authored, and persisting it
     carries that overwrite into the next load. They are session-only overrides
     keyed by slide, and an earlier build's keys are discarded on sight. */
  delete state.heromedia;
  delete state.herotext;
  persist();

  var authored = {};
  var overrides = {};
  var slideEls = Array.prototype.slice.call(document.querySelectorAll('.hero__slide'));
  slideEls.forEach(function (s) {
    authored[s.id] = {
      heromedia: s.getAttribute('data-media') || 'none',
      herotext: s.getAttribute('data-text') || 'on'
    };
  });

  function currentSlide() { return document.querySelector('.hero__slide.is-current'); }

  /* Authored value unless this session changed that slide. */
  function effective(slide, key) {
    if (!slide) return null;
    var o = overrides[slide.id];
    if (o && o[key]) return o[key];
    return (authored[slide.id] || {})[key];
  }

  /* The two hero controls describe the slide on screen, so they follow it. */
  function syncHeroRadios() {
    if (!panel) return;
    var current = currentSlide();
    if (!current) return;
    ['heromedia', 'herotext'].forEach(function (k) {
      var v = effective(current, k);
      var r = panel.querySelector('input[name="tw-' + k + '"][value="' + v + '"]');
      if (r) r.checked = true;
    });
  }

  function apply() {
    GROUPS.forEach(function (g) {
      root.setAttribute(g.attr, state[g.key] || g.def);
    });

    /* Hero slide options. Each slide keeps its own authored background and text
       setting; only a slide the reader has actually changed this session is
       restamped, so a fresh load always shows what Django rendered. */
    var hero = document.querySelector('[data-hero-carousel]');
    slideEls.forEach(function (s) {
      var o = overrides[s.id];
      if (!o) return;
      if (o.heromedia) s.setAttribute('data-media', o.heromedia);
      if (o.herotext) s.setAttribute('data-text', o.herotext);
    });
    syncHeroRadios();
    if (hero) {
      hero.setAttribute('data-interval', state.heroauto === 'manual' ? '0' : '8000');
      hero.dispatchEvent(new CustomEvent('hero:autochange'));
    }

    var key = state.enrolment || 'open';
    var phase = PHASES[key] || PHASES.open;

    var slot = document.querySelector('.hero .enrol');
    if (slot) {
      slot.setAttribute('data-state', key);
      var label = slot.querySelector('.enrol__label');
      var detail = slot.querySelector('.enrol__detail');
      if (label) label.textContent = phase.enrol.label;
      if (detail) detail.textContent = phase.enrol.detail;
    }

    var radio = document.querySelector('.tweaks__panel input[name="tw-enrolment"][value="' + key + '"]');
    if (radio) radio.checked = true;
    var actions = document.querySelector('.hero__actions');
    if (!actions) return;
    var reg = actions.querySelector('[data-preload-app]');
    var browse = actions.querySelector('a[href="#tracks"]');
    if (!reg || !browse) return;
    reg.classList.toggle('btn--primary', phase.register);
    reg.classList.toggle('btn--onink', !phase.register);
    browse.classList.toggle('btn--primary', !phase.register);
    browse.classList.toggle('btn--onink', phase.register);
  }

  function persist() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {}
  }

  apply();

  var wrap = document.createElement('div');
  wrap.className = 'tweaks';

  var panel = document.createElement('div');
  panel.className = 'tweaks__panel';
  panel.id = 'tweaks-panel';
  panel.hidden = true;

  var html = '<p class="tweaks__title">ضبط الطابع</p>';
  GROUPS.forEach(function (g) {
    html += '<fieldset class="tweaks__group" style="border:0;padding:0;margin:0">';
    html += '<legend class="tweaks__legend">' + g.label + '</legend>';
    html += '<p class="tweaks__hint">' + g.hint + '</p>';
    html += '<div class="tweaks__seg">';
    g.options.forEach(function (o) {
      var on = (state[g.key] || g.def) === o.v;
      html += '<label><input type="radio" name="tw-' + g.key + '" value="' + o.v + '"' +
        (on ? ' checked' : '') + '><span>' + o.t + '</span></label>';
    });
    html += '</div></fieldset>';
  });
  panel.innerHTML = html;
  syncHeroRadios();

  var chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'tweaks__chip';
  chip.setAttribute('aria-expanded', 'false');
  chip.setAttribute('aria-controls', 'tweaks-panel');
  chip.textContent = 'ضبط الطابع';

  chip.addEventListener('click', function () {
    var open = panel.hidden;
    panel.hidden = !open;
    chip.setAttribute('aria-expanded', String(open));
  });

  panel.addEventListener('change', function (e) {
    var input = e.target;
    if (!input || input.type !== 'radio') return;
    var key = input.name.replace('tw-', '');
    if (key === 'heromedia' || key === 'herotext') {
      var current = currentSlide();
      if (!current) return;
      overrides[current.id] = overrides[current.id] || {};
      overrides[current.id][key] = input.value;
      apply();
      return;
    }
    state[key] = input.value;
    apply();
    persist();
  });

  wrap.appendChild(panel);
  wrap.appendChild(chip);

  /* Moving to another slide re-reads that slide's own settings into the panel,
     so the controls always describe what is on screen. Nothing is written back:
     a slide the reader has not touched keeps exactly what Django authored. */
  var heroNav = document.querySelector('.hero__nav');
  if (heroNav) {
    heroNav.addEventListener('click', function () {
      window.setTimeout(syncHeroRadios, 0);
    });
  }

  /* Stand down while the hero is on screen — nothing may sit over the plate.
     Driven by IntersectionObserver, not scroll: some embedded contexts suppress
     scroll events on the document (README §12), which would leave the chip
     stranded in the wrong state. The initial value is set BEFORE the element is
     appended, so it never paints in the visible state and no transition runs
     from it. */
  var hero = document.querySelector('.hero');

  function setOverHero(over) {
    wrap.setAttribute('data-over-hero', String(over));
    if (over && !panel.hidden) {
      panel.hidden = true;
      chip.setAttribute('aria-expanded', 'false');
    }
  }

  setOverHero(hero ? hero.getBoundingClientRect().bottom > 40 : false);
  document.body.appendChild(wrap);

  if (hero) {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { setOverHero(e.isIntersecting); });
      }, { rootMargin: '-40px 0px 0px 0px', threshold: 0 }).observe(hero);
    }
    var resync = function () { setOverHero(hero.getBoundingClientRect().bottom > 40); };
    ['scroll', 'wheel', 'touchmove', 'keyup', 'resize'].forEach(function (ev) {
      window.addEventListener(ev, resync, { passive: true });
    });
  }
})();
