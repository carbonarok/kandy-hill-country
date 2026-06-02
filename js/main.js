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
  var WALK_IC = '<svg class="legic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="13" cy="4" r="2"/><path d="M13 8l-2.5 4 2.5 2.5V21M10.5 12L7 14M13 11l3.5 1.5"/></svg>';
  var CAR_IC = '<svg class="legic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11l1.6-4.2A2 2 0 0 1 8.5 5.5h7a2 2 0 0 1 1.9 1.3L19 11M4 16h16v-4.2a1 1 0 0 0-.6-.9l-.8-.3a40 40 0 0 0-13.2 0l-.8.3a1 1 0 0 0-.6.9z"/><circle cx="7.5" cy="16.5" r="1.4"/><circle cx="16.5" cy="16.5" r="1.4"/></svg>';
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
      html += '<p class="staycard__sub">' + o.capacity + '</p>';
      if (o.centre) {
        html += '<p class="staycard__centre"><span class="staycard__cl">To the centre</span>' +
          '<span class="staycard__leg">' + WALK_IC + o.centre.walk + '</span>' +
          '<span class="staycard__leg">' + CAR_IC + o.centre.drive + '</span></p>';
      }
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

  /* ---------- Cost-per-person calculator ---------- */
  function initCalc() {
    var data = window.STAYS;
    var sel = document.getElementById('calcStay');
    if (!data || !data.options || !sel) return;
    var priced = data.options.filter(function (o) { return typeof o.nightly === 'number'; });
    if (!priced.length) return;

    sel.innerHTML = priced.map(function (o, i) {
      return '<option value="' + i + '">' + o.name + ' · £' + o.nightly + '/night</option>';
    }).join('');
    // default to a sensible in-budget pick (Lakewood if present)
    var def = priced.findIndex(function (o) { return o.id === 'lakewood'; });
    sel.selectedIndex = def >= 0 ? def : 0;

    var nightsEl = document.getElementById('calcNights');
    var peopleEl = document.getElementById('calcPeople');
    var ppEl = document.getElementById('calcPP');
    var totalEl = document.getElementById('calcTotal');
    var statusEl = document.getElementById('calcStatus');
    var meterEl = document.getElementById('calcMeter');

    function money(n) { return '£' + Math.round(n).toLocaleString('en-GB'); }
    function clampField(el, lo, hi, fallback) {
      var v = parseInt(el.value, 10);
      if (isNaN(v)) v = fallback;
      v = Math.max(lo, Math.min(hi, v));
      return v;
    }
    function update() {
      var o = priced[parseInt(sel.value, 10) || 0];
      var nights = clampField(nightsEl, 1, 30, 4);
      var people = clampField(peopleEl, 1, 30, 6);
      var total = o.nightly * nights;
      var pp = total / people;
      ppEl.textContent = money(pp);
      totalEl.textContent = money(total) + ' total';

      var state, label;
      if (total <= 900) { state = 'good'; label = 'Within the £500–900 group target'; }
      else if (total <= 1300) { state = 'mid'; label = 'A stretch above the target'; }
      else { state = 'over'; label = 'A proper splurge — well over target'; }
      statusEl.textContent = label;
      statusEl.className = 'calc__status is-' + state;
      meterEl.style.width = Math.max(6, Math.min(100, (total / 1800) * 100)) + '%';
      meterEl.className = 'calc__meterfill is-' + state;
    }
    sel.addEventListener('change', update);
    nightsEl.addEventListener('input', update);
    peopleEl.addEventListener('input', update);
    update();
  }
  initCalc();

  /* ---------- Render restaurant cards (from js/eats.js) ---------- */
  function renderEats() {
    var data = window.EATS;
    if (!data) return;
    var noteEl = document.getElementById('eatNote');
    if (noteEl && data.note) noteEl.textContent = data.note;
    var wrap = document.getElementById('eatCards');
    if (!wrap || !data.options) return;
    var html = '';
    data.options.forEach(function (o, i) {
      html += '<article class="eatcard reveal' + (o.splurge ? ' eatcard--splurge' : '') +
        '" data-delay="' + Math.min(i + 1, 6) + '">';
      html += '<div class="eatcard__top">';
      html += '<span class="eatcard__vibe eatvibe--' + o.kind + '">' + o.vibe + '</span>';
      html += '<span class="eatcard__tier">' + o.tier + '</span>';
      html += '</div>';
      html += '<h3 class="eatcard__name">' + o.name + '</h3>';
      html += '<p class="eatcard__meta">' + o.cuisine + ' · ' + o.area + '</p>';
      html += '<p class="eatcard__why">' + o.why + '</p>';
      html += '<p class="eatcard__meal"><span>Good for</span>' + o.meal + '</p>';
      html += '<a class="eatcard__link" href="' + o.url.replace(/&/g, '&amp;') +
        '" target="_blank" rel="noopener">On TripAdvisor &rarr;</a>';
      html += '</article>';
    });
    wrap.innerHTML = html;
  }
  renderEats();

  /* ---------- Graceful image degradation ----------
     If a photo fails to load, mark its media container so CSS
     reveals a tasteful gradient block instead of a broken image. */
  function markMissing(img) {
    var holder = img.closest('[data-img], .hero__media, .feature__media, .closing__media') || img.parentElement;
    if (holder) holder.classList.add('img-missing');
  }
  Array.prototype.forEach.call(document.images, function (img) {
    // The lightbox image is populated on demand — don't treat its empty src as missing.
    if (img.closest('.lightbox')) return;
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
    ['eat', 'eat'],
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

    // Routes: draw a straight dashed line immediately, then ask OSRM for the
    // real road geometry + distance/time and swap it in. Falls back silently.
    var kandy = places[0].coords;
    function route(to, color, label) {
      var line = L.polyline([kandy, to], {
        color: color, weight: 3, opacity: .5, dashArray: '2 9', lineCap: 'round'
      }).addTo(map);
      var url = 'https://router.project-osrm.org/route/v1/driving/' +
        kandy[1] + ',' + kandy[0] + ';' + to[1] + ',' + to[0] + '?overview=full&geometries=geojson';
      fetch(url).then(function (r) { return r.json(); }).then(function (j) {
        if (!j.routes || !j.routes.length) return;
        var rt = j.routes[0];
        var coords = rt.geometry.coordinates.map(function (c) { return [c[1], c[0]]; });
        map.removeLayer(line);
        var poly = L.polyline(coords, { color: color, weight: 4, opacity: .85, lineCap: 'round', lineJoin: 'round' }).addTo(map);
        var km = Math.round(rt.distance / 1000);
        var mins = Math.round(rt.duration / 60);
        var hrs = Math.floor(mins / 60), rem = mins % 60;
        var t = hrs ? (hrs + 'h' + (rem ? ' ' + rem + 'm' : '')) : (mins + ' min');
        poly.bindPopup('<b>' + label + '</b>By road: ~' + km + ' km · ~' + t + ' drive');
      }).catch(function () { /* keep the straight-line fallback */ });
    }
    route(places[2].coords, COLORS.north, 'Kandy → Dambulla');
    route(places[1].coords, COLORS.north, 'Kandy → Sigiriya');
    route(places[4].coords, COLORS.loop, 'Kandy → temple loop');
    route(places[5].coords, COLORS.coast, 'Kandy → Negombo');

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

  /* ---------- Lotus loader ---------- */
  (function () {
    var loader = document.getElementById('loader');
    if (!loader) return;
    function done() {
      loader.classList.add('is-done');
      setTimeout(function () { loader.style.display = 'none'; }, 650);
    }
    if (reduceMotion) { done(); return; }
    var hidden = false;
    function go() { if (!hidden) { hidden = true; done(); } }
    window.addEventListener('load', function () { setTimeout(go, 350); });
    setTimeout(go, 2600); // safety net if load is slow
  })();

  /* ---------- Countdown to the trip ---------- */
  (function () {
    var box = document.getElementById('countdown');
    if (!box) return;
    var target = Date.parse('2026-11-02T00:00:00+05:30'); // arrival, Sri Lanka time
    var fields = {
      days: box.querySelector('[data-cd="days"]'),
      hours: box.querySelector('[data-cd="hours"]'),
      mins: box.querySelector('[data-cd="mins"]'),
      secs: box.querySelector('[data-cd="secs"]')
    };
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        box.innerHTML = '<p class="countdown__cap countdown__cap--now">We’re in Sri Lanka — enjoy! 🌴</p>';
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      fields.days.textContent = Math.floor(s / 86400);
      fields.hours.textContent = pad(Math.floor((s % 86400) / 3600));
      fields.mins.textContent = pad(Math.floor((s % 3600) / 60));
      fields.secs.textContent = pad(s % 60);
    }
    box.hidden = false;
    tick();
    var timer = setInterval(tick, 1000);
  })();

  /* ---------- Add to calendar (.ics) ---------- */
  (function () {
    var btn = document.getElementById('addCal');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var ics = [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Kandy Trip//EN', 'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        'UID:kandy-hill-country-2026@trip',
        'DTSTART;VALUE=DATE:20261102',
        'DTEND;VALUE=DATE:20261107',
        'SUMMARY:Kandy & the Hill Country — Sri Lanka',
        'LOCATION:Kandy, Sri Lanka',
        'DESCRIPTION:Five-day group trip — Sigiriya, the Temple of the Tooth, hill-country temples and the coast. ' + location.href,
        'URL:' + location.href,
        'END:VEVENT', 'END:VCALENDAR'
      ].join('\r\n');
      var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'kandy-hill-country.ics';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
  })();

  /* ---------- Share (WhatsApp + copy link) ---------- */
  (function () {
    var wa = document.getElementById('shareWhatsApp');
    var copy = document.getElementById('shareCopy');
    var msg = 'Kandy & the Hill Country — a five-day group trip, 2–6 Nov 2026. Have a look:';
    if (wa) wa.href = 'https://wa.me/?text=' + encodeURIComponent(msg + ' ' + location.href);
    if (copy) {
      copy.addEventListener('click', function () {
        var label = document.getElementById('copyLabel');
        function ok() { if (label) { var t = label.textContent; label.textContent = 'Copied!'; setTimeout(function () { label.textContent = t; }, 1600); } }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(location.href).then(ok, ok);
        } else {
          var ta = document.createElement('textarea'); ta.value = location.href; document.body.appendChild(ta);
          ta.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta); ok();
        }
      });
    }
  })();

  /* ---------- Live Kandy weather (Open-Meteo, no key) ---------- */
  (function () {
    var tempEl = document.getElementById('wxTemp');
    if (!tempEl) return;
    var descEl = document.getElementById('wxDesc');
    var iconEl = document.getElementById('wxIcon');
    function wmo(code) {
      if (code === 0) return ['☀️', 'clear & sunny'];
      if (code <= 2) return ['🌤️', 'mostly sunny'];
      if (code === 3) return ['☁️', 'cloudy'];
      if (code <= 48) return ['🌫️', 'misty'];
      if (code <= 67) return ['🌧️', 'rainy'];
      if (code <= 77) return ['❄️', 'wintry'];
      if (code <= 82) return ['🌦️', 'showers'];
      if (code <= 99) return ['⛈️', 'thundery'];
      return ['🌤️', 'fair'];
    }
    fetch('https://api.open-meteo.com/v1/forecast?latitude=7.2906&longitude=80.6337&current=temperature_2m,weather_code&timezone=auto')
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var c = j && j.current;
        if (!c) throw 0;
        var w = wmo(c.weather_code);
        tempEl.textContent = Math.round(c.temperature_2m) + '°';
        if (descEl) descEl.textContent = w[1];
        if (iconEl) iconEl.textContent = w[0];
      })
      .catch(function () {
        tempEl.textContent = '~29°';
        if (descEl) descEl.textContent = 'warm & humid';
        if (iconEl) iconEl.textContent = '🌤️';
      });
  })();

  /* ---------- GBP → LKR converter (open.er-api.com, no key) ---------- */
  (function () {
    var gbp = document.getElementById('fxGbp');
    if (!gbp) return;
    var lkr = document.getElementById('fxLkr');
    var rateEl = document.getElementById('fxRate');
    var rate = 390; // sensible fallback until the live rate lands
    function fmt(n) { return Math.round(n).toLocaleString('en-GB'); }
    function update() {
      var v = parseFloat(gbp.value);
      if (isNaN(v)) v = 0;
      lkr.value = 'Rs ' + fmt(v * rate);
    }
    fetch('https://open.er-api.com/v6/latest/GBP')
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j && j.rates && j.rates.LKR) {
          rate = j.rates.LKR;
          if (rateEl) rateEl.textContent = '£1 ≈ Rs ' + fmt(rate) + ' · live rate';
        }
        update();
      })
      .catch(function () { if (rateEl) rateEl.textContent = '£1 ≈ Rs ' + fmt(rate) + ' · approx'; });
    gbp.addEventListener('input', update);
    if (rateEl) rateEl.textContent = '£1 ≈ Rs ' + fmt(rate) + ' · approx';
    update();
  })();

  /* ---------- Packing checklist (localStorage) ---------- */
  (function () {
    var listEl = document.getElementById('packList');
    if (!listEl) return;
    var KEY = 'kandy-pack-v1';
    var items = [
      'Passport + visa (ETA approved online)',
      'Light, breathable clothes',
      'A cover-up for temples (shoulders & knees)',
      'Slip-on shoes — shoes come off at temples',
      'Sun hat & high-SPF sunscreen',
      'Refillable water bottle',
      'Cash — Sri Lankan rupees for the small sites',
      'A light rain layer for afternoon showers',
      'Travel adapter (type D / G / M)',
      'Insect repellent',
      'Daypack for the Sigiriya climb',
      'Camera / phone + charger'
    ];
    var state = {};
    try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { state = {}; }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
    listEl.innerHTML = items.map(function (txt, i) {
      var on = state[txt] ? ' checked' : '';
      return '<li><label class="pack' + (state[txt] ? ' is-done' : '') + '">' +
        '<input type="checkbox" data-i="' + i + '"' + on + '>' +
        '<span class="pack__box" aria-hidden="true"></span><span class="pack__txt">' + txt + '</span></label></li>';
    }).join('');
    listEl.addEventListener('change', function (e) {
      var cb = e.target;
      if (!cb || cb.type !== 'checkbox') return;
      var txt = items[+cb.getAttribute('data-i')];
      state[txt] = cb.checked;
      cb.closest('.pack').classList.toggle('is-done', cb.checked);
      save();
    });
    var reset = document.getElementById('packReset');
    if (reset) reset.addEventListener('click', function () {
      state = {}; save();
      listEl.querySelectorAll('input[type="checkbox"]').forEach(function (cb) { cb.checked = false; });
      listEl.querySelectorAll('.pack').forEach(function (l) { l.classList.remove('is-done'); });
    });
  })();

  /* ---------- Photo lightbox ---------- */
  (function () {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var imgEl = document.getElementById('lbImg');
    var capEl = document.getElementById('lbCap');
    var gallery = [];
    Array.prototype.forEach.call(document.querySelectorAll('[data-img] img, .feature__img'), function (img) {
      if (img.closest('.img-missing')) return;        // skip gradient fallbacks
      var idx = gallery.length;
      gallery.push(img);
      img.classList.add('is-zoomable');
      img.addEventListener('click', function () { open(idx); });
    });
    if (!gallery.length) return;
    var cur = 0;
    function show(i) {
      cur = (i + gallery.length) % gallery.length;
      var src = gallery[cur];
      imgEl.src = src.currentSrc || src.src;
      imgEl.alt = src.alt || '';
      capEl.textContent = src.alt || '';
    }
    function open(i) { show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; lb.classList.add('is-open'); }
    function close() { lb.classList.remove('is-open'); document.body.style.overflow = ''; setTimeout(function () { lb.hidden = true; }, 250); }
    document.getElementById('lbClose').addEventListener('click', close);
    document.getElementById('lbPrev').addEventListener('click', function () { show(cur - 1); });
    document.getElementById('lbNext').addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(cur - 1);
      else if (e.key === 'ArrowRight') show(cur + 1);
    });
  })();
})();
