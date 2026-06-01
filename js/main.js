/* ============================================================
   Kandy & the Hill Country — interactions
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Render the itinerary (from js/itinerary.js) ----------
     Fills each <div class="day__schedule" data-day="N"> with a timed
     schedule. Runs before the reveal observer so new nodes are caught.
     If TRIP is missing, the static bullet fallback already in the HTML
     simply stays. */
  var LOTUS = '<svg viewBox="0 0 48 48" width="15" height="15" aria-hidden="true"><use href="#lotus-mark"/></svg>';
  function chipHTML(c) {
    return '<span class="chip chip--' + c.type + '">' + c.label + '</span>';
  }
  function renderItinerary() {
    if (!window.TRIP || !window.TRIP.days) return;
    var blocks = document.querySelectorAll('.day__schedule[data-day]');
    Array.prototype.forEach.call(blocks, function (block) {
      var d = window.TRIP.days[block.getAttribute('data-day')];
      if (!d || !d.items) return;
      var html = '';

      if (d.summary && d.summary.length) {
        html += '<ul class="dsum reveal" data-delay="2">';
        d.summary.forEach(function (s) {
          html += '<li><span class="dsum__k">' + s.k + '</span><span class="dsum__v">' + s.v + '</span></li>';
        });
        html += '</ul>';
      }

      html += '<ol class="sched reveal" data-delay="2">';
      d.items.forEach(function (it) {
        if (it.note) {
          html += '<li class="sched__note' + (it.img ? ' sched__note--img' : '') + '">';
          if (it.img) {
            html += '<figure class="sched__thumb" data-img><img src="' + it.img + '" alt="' +
              (it.alt || '') + '" loading="lazy"></figure>';
          }
          html += '<div class="sched__noterow"><span class="sched__noteicon">' + LOTUS +
            '</span><p>' + it.note + '</p></div>';
          html += '</li>';
          return;
        }
        html += '<li class="sched__item' + (it.optional ? ' is-optional' : '') +
          (it.img ? ' sched__item--img' : '') + '">';
        html += '<span class="sched__time">' + it.time + '</span>';
        html += '<div class="sched__main">';
        html += '<div class="sched__text">';
        html += '<h4 class="sched__title">' + it.title + '</h4>';
        html += '<p class="sched__desc">' + it.desc + '</p>';
        var chips = (it.chips || []).slice();
        if (it.optional) chips.unshift({ type: 'opt', label: 'Optional' });
        if (chips.length) {
          html += '<div class="sched__chips">';
          chips.forEach(function (c) { html += chipHTML(c); });
          html += '</div>';
        }
        if (it.opt) html += '<p class="sched__optnote">' + it.opt + '</p>';
        html += '</div>'; // .sched__text
        if (it.img) {
          html += '<figure class="sched__thumb" data-img><img src="' + it.img + '" alt="' +
            (it.alt || '') + '" loading="lazy"></figure>';
        }
        html += '</div></li>';
      });
      html += '</ol>';

      block.innerHTML = html;
    });
  }
  renderItinerary();

  /* ---------- Render accommodation cards (from js/stays.js) ----------
     Done before the reveal observer is set up so the cards animate in. */
  function renderStayCards() {
    var data = window.STAYS;
    if (!data) return;
    var budgetEl = document.getElementById('stayBudget');
    if (budgetEl && data.budgetNote) budgetEl.textContent = data.budgetNote;

    var wrap = document.getElementById('stayCards');
    if (!wrap || !data.options) return;
    var html = '';
    data.options.forEach(function (o, i) {
      var tagClass = o.kind === 'central' ? 'is-central' : 'is-quiet';
      html += '<article class="staycard reveal' + (o.within ? '' : ' staycard--splurge') +
        '" data-delay="' + Math.min(i + 1, 6) + '" id="staycard-' + o.id + '">';
      html += '<div class="staycard__top">';
      html += '<span class="staycard__tag ' + tagClass + '">' +
        (o.kind === 'central' ? 'Central' : 'Quieter') + '</span>';
      html += '<span class="staycard__tier" title="' +
        (o.within ? 'Within budget' : 'Above the £500–900 target') + '">' + o.tier + '</span>';
      html += '</div>';
      html += '<h3 class="staycard__name">' + o.name + '</h3>';
      html += '<p class="staycard__type">' + o.type + '</p>';
      html += '<div class="staycard__meta">';
      html += '<span class="staycard__pricewrap"><span class="staycard__price' + (o.within ? '' : ' is-over') +
        '">' + o.price + '</span>' +
        (o.perPerson ? '<span class="staycard__pp">' + o.perPerson + '</span>' : '') + '</span>';
      html += '<span class="staycard__lean">' + o.lean + '</span>';
      html += '</div>';
      html += '<p class="staycard__sub">' + o.capacity + ' · ' + o.drive + '</p>';
      html += '<ul class="staycard__pros">';
      o.pros.forEach(function (p) { html += '<li class="is-pro">' + p + '</li>'; });
      o.cons.forEach(function (c) { html += '<li class="is-con">' + c + '</li>'; });
      html += '</ul>';
      html += '<a class="staycard__link" href="' + o.url.replace(/&/g, '&amp;') +
        '" target="_blank" rel="noopener">View on ' + o.host + ' for our dates &rarr;</a>';
      html += '</article>';
    });
    wrap.innerHTML = html;
  }
  renderStayCards();

  /* ---------- Graceful image degradation ----------
     If a photo fails to load, mark its media container so CSS
     reveals a tasteful gradient block instead of a broken image. */
  function markMissing(img) {
    var holder = img.closest('[data-img], .hero__media, .feature__media, .closing__media') || img.parentElement;
    if (holder) holder.classList.add('img-missing');
  }
  Array.prototype.forEach.call(document.images, function (img) {
    // Empty src -> intentional fallback (e.g. the closing image isn't supplied)
    if (!img.getAttribute('src')) { markMissing(img); return; }
    // The 'error' event is the reliable signal for a genuine load failure.
    img.addEventListener('error', function () { markMissing(img); });
    // Only treat a finished, zero-size load as missing. Skip lazy images that
    // haven't started loading yet — they can report complete with 0 width and
    // would be wrongly flagged before they ever fetch.
    if (img.loading !== 'lazy' && img.complete && img.naturalWidth === 0) markMissing(img);
  });

  /* ---------- Nav: scrolled state + mobile drawer ---------- */
  var nav = document.getElementById('nav');
  var navMenu = document.getElementById('navMenu');

  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (navMenu) {
    navMenu.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close drawer after picking a link
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active-section highlighting ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var linkMap = {};
  navLinks.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    linkMap[id] = a;
  });
  // Map content sections to their nav entry (several days -> "Days")
  var watch = [
    ['overview', 'overview'],
    ['getting', 'overview'],
    ['stay', 'stay'],
    ['days', 'days'],
    ['day1', 'days'], ['day2', 'days'], ['day3', 'days'], ['day4', 'days'], ['day5', 'days'],
    ['sigiriya', 'sigiriya'],
    ['map', 'map'],
    ['know', 'know']
  ];
  var sectionToLink = {};
  watch.forEach(function (pair) {
    var el = document.getElementById(pair[0]);
    if (el && linkMap[pair[1]]) sectionToLink[pair[0]] = linkMap[pair[1]];
  });

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var link = sectionToLink[e.target.id];
      if (!link) return;
      navLinks.forEach(function (a) { a.classList.remove('is-active'); });
      link.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  Object.keys(sectionToLink).forEach(function (id) {
    spy.observe(document.getElementById(id));
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduceMotion) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          revealObs.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---------- Parallax (hero / feature / closing media) ---------- */
  var parallax = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (!reduceMotion && parallax.length) {
    var ticking = false;
    function applyParallax() {
      var vh = window.innerHeight;
      parallax.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;       // off-screen
        var progress = (rect.top + rect.height / 2 - vh / 2) / vh; // -1..1ish
        var shift = progress * -42;                          // px
        el.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(applyParallax); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', applyParallax);
    applyParallax();
  }

  /* ---------- Count-up stats ---------- */
  var statNums = Array.prototype.slice.call(document.querySelectorAll('.stat__num'));
  function formatNum(n) { return Math.round(n).toLocaleString('en-US'); }
  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = prefix + formatNum(target) + suffix; return; }
    var dur = 1500, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);            // easeOutCubic
      el.textContent = prefix + formatNum(target * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
      else el.textContent = prefix + formatNum(target) + suffix;
    }
    window.requestAnimationFrame(step);
  }
  if (statNums.length) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { runCount(e.target); countObs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    statNums.forEach(function (el) { countObs.observe(el); });
  }

  /* ---------- "At a glance" panel ---------- */
  var glance = document.getElementById('glance');
  var glanceToggle = document.getElementById('glanceToggle');
  var glanceBody = document.getElementById('glanceBody');
  if (glance && glanceToggle && glanceBody) {
    // show it once the hero is scrolled past
    var hero = document.getElementById('hero');
    var glanceObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) glance.classList.remove('is-visible'); // hero in view -> hide
        else glance.classList.add('is-visible');                    // hero gone -> show
      });
    }, { threshold: 0 });
    if (hero) glanceObs.observe(hero);

    function setBodyHeight(open) {
      glanceBody.style.height = open ? glanceBody.scrollHeight + 'px' : '0px';
    }
    setBodyHeight(true);
    window.addEventListener('resize', function () {
      if (glance.getAttribute('data-collapsed') !== 'true') setBodyHeight(true);
    });
    glanceToggle.addEventListener('click', function () {
      var collapsed = glance.getAttribute('data-collapsed') === 'true';
      glance.setAttribute('data-collapsed', collapsed ? 'false' : 'true');
      glanceToggle.setAttribute('aria-expanded', collapsed ? 'true' : 'false');
      setBodyHeight(collapsed);
    });
  }

  /* ---------- Leaflet map ---------- */
  var mapEl = document.getElementById('leafmap');
  if (mapEl && window.L) {
    var COLORS = {
      base: '#C75B39', north: '#E8A33D', loop: '#1A5C4A', coast: '#2f7fae'
    };
    var places = [
      { name: 'Kandy', coords: [7.2906, 80.6337], tag: 'Base · all five nights', kind: 'base',
        note: 'Home for the whole trip — everything radiates out from here.' },
      { name: 'Sigiriya Lion Rock', coords: [7.9571, 80.7603], tag: 'Day 3 · the showpiece', kind: 'north',
        note: 'Dawn climb up the 5th-century sky fortress.' },
      { name: 'Dambulla Cave Temple', coords: [7.8549, 80.6506], tag: 'Day 3', kind: 'north',
        note: 'Five caves of Buddha statues & ceiling murals, on the way home.' },
      { name: 'Royal Botanic Gardens, Peradeniya', coords: [7.2682, 80.5966], tag: 'Day 4', kind: 'loop',
        note: 'Palm avenue, orchid house and the giant fig.' },
      { name: 'Village temple loop', coords: [7.2500, 80.5600], tag: 'Day 4 · Gadaladeniya · Lankatilaka · Embekka', kind: 'loop',
        note: 'Three 14th-century temples and superb wood carvings.' },
      { name: 'Negombo', coords: [7.2081, 79.8358], tag: 'Day 5 · departure', kind: 'coast',
        note: 'Beach, Dutch canal and fish market — then the airport.' }
    ];

    var map = L.map('leafmap', { scrollWheelZoom: false, zoomControl: true });
    L.control.scale({ imperial: false }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19, subdomains: 'abcd'
    }).addTo(map);

    function pin(color) {
      return L.divIcon({
        className: '',
        html: '<div class="marker-pin" style="background:' + color + '"></div>',
        iconSize: [26, 26], iconAnchor: [13, 24], popupAnchor: [0, -22]
      });
    }

    var bounds = [];
    places.forEach(function (p) {
      bounds.push(p.coords);
      L.marker(p.coords, { icon: pin(COLORS[p.kind]), title: p.name })
        .addTo(map)
        .bindPopup('<b>' + p.name + '</b>' + p.note + '<span class="pop-tag">' + p.tag + '</span>');
    });

    // Route hints: Kandy -> Sigiriya/Dambulla (north), Kandy -> temple loop, Kandy -> Negombo
    var kandy = places[0].coords;
    function route(to, color) {
      L.polyline([kandy, to], {
        color: color, weight: 3, opacity: .75, dashArray: '2 9', lineCap: 'round'
      }).addTo(map);
    }
    route(places[2].coords, COLORS.north);  // Dambulla
    route(places[1].coords, COLORS.north);  // Sigiriya
    route(places[4].coords, COLORS.loop);   // temple loop
    route(places[5].coords, COLORS.coast);  // Negombo

    map.fitBounds(bounds, { padding: [55, 55] });

    // Re-enable wheel-zoom only after a click (keeps page scroll smooth)
    map.on('click', function () { map.scrollWheelZoom.enable(); });
    map.on('mouseout', function () { map.scrollWheelZoom.disable(); });
  }

  /* ---------- Accommodation map (cards are rendered earlier) ---------- */
  (function () {
    var data = window.STAYS;
    if (!data) return;

    var STAY_COLORS = { central: '#C75B39', quieter: '#1A5C4A', landmark: '#9a8a6a' };

    // map
    var mapEl = document.getElementById('staymap');
    if (mapEl && window.L) {
      var smap = L.map('staymap', { scrollWheelZoom: false, zoomControl: true });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19, subdomains: 'abcd'
      }).addTo(smap);

      function staypin(color, ring) {
        return L.divIcon({
          className: '',
          html: '<div class="marker-pin' + (ring ? ' marker-pin--ring' : '') + '" style="background:' + color + '"></div>',
          iconSize: [26, 26], iconAnchor: [13, 24], popupAnchor: [0, -22]
        });
      }
      function dot(color) {
        return L.divIcon({ className: '', html: '<span class="map-refdot" style="background:' + color + '"></span>',
          iconSize: [12, 12], iconAnchor: [6, 6], popupAnchor: [0, -6] });
      }

      var b = [];
      (data.refs || []).forEach(function (r) {
        b.push(r.coords);
        L.marker(r.coords, { icon: dot(STAY_COLORS.landmark), title: r.name })
          .addTo(smap).bindPopup('<b>' + r.name + '</b><span class="pop-tag">Reference point</span>');
      });
      (data.options || []).forEach(function (o) {
        b.push(o.coords);
        var m = L.marker(o.coords, { icon: staypin(STAY_COLORS[o.kind], !o.within), title: o.name }).addTo(smap);
        m.bindPopup('<b>' + o.name + '</b>' + o.type + '<br>' + o.price +
          '<span class="pop-tag">' + (o.kind === 'central' ? 'Central' : 'Quieter') + ' · ' + o.drive + '</span>');
        // hover a card -> open its popup
        var card = document.getElementById('staycard-' + o.id);
        if (card) {
          card.addEventListener('mouseenter', function () { m.openPopup(); });
        }
      });

      smap.fitBounds(b, { padding: [50, 50] });
      smap.on('click', function () { smap.scrollWheelZoom.enable(); });
      smap.on('mouseout', function () { smap.scrollWheelZoom.disable(); });
    }
  })();
})();
