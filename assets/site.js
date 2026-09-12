/* vv Noordwijk demo — gedeelde interactie */
(function () {
  'use strict';

  /* Nav: blur bij scroll */
  var nav = document.querySelector('.nav');
  function opScroll() {
    if (window.scrollY > 24) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', opScroll, { passive: true });
  opScroll();

  /* Hamburger */
  var burger = document.querySelector('.nav-burger');
  var mobielMenu = document.querySelector('.mobiel-menu');
  if (burger && mobielMenu) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      mobielMenu.classList.toggle('open');
      document.body.style.overflow = mobielMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobielMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('open');
        mobielMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Hero-kop woord voor woord */
  document.querySelectorAll('[data-woorden]').forEach(function (el) {
    var woorden = el.textContent.trim().split(/\s+/);
    el.innerHTML = woorden.map(function (w, i) {
      return '<span class="w" style="animation-delay:' + (0.35 + i * 0.08) + 's">' + w + '</span>';
    }).join(' ');
  });

  /* Scroll reveals */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('zichtbaar');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal, .reveal-foto').forEach(function (el) { io.observe(el); });

  /* Count-up cijfers */
  function countUp(el) {
    var doel = parseInt(el.getAttribute('data-tel'), 10);
    var duur = 1400, start = null;
    function stap(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / duur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(doel * eased).toLocaleString('nl-NL');
      if (p < 1) requestAnimationFrame(stap);
    }
    requestAnimationFrame(stap);
  }
  var ioTel = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { countUp(e.target); ioTel.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-tel]').forEach(function (el) { ioTel.observe(el); });

  /* ---------- Programma: één bron, alles rekent zelf ---------- */
  var DATA = window.NOORDWIJK;
  var MAANDEN = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  var DAGEN = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];

  function pad(n) { return String(n).padStart(2, '0'); }
  function tijdVan(w) { return new Date(w.datum).getTime(); }

  /* Een wedstrijd telt als "nu bezig" tot 2 uur na de aftrap */
  function nogTeSpelen(w) { return tijdVan(w) + 2 * 3600 * 1000 > Date.now(); }

  function komende(lijst) {
    return (lijst || []).filter(nogTeSpelen).sort(function (a, b) { return tijdVan(a) - tijdVan(b); });
  }

  function logoHtml(w, klasse) {
    if (w.logo) {
      return '<img class="' + klasse + '" src="assets/clubs/' + w.logo + '" alt="' + w.tegen + '">';
    }
    var letters = w.tegen.replace(/[^A-Za-z ]/g, '').split(/\s+/)
      .map(function (d) { return d.charAt(0); }).join('').slice(0, 3).toUpperCase();
    return '<span class="' + klasse + ' clublogo--letters">' + letters + '</span>';
  }

  /* Aftelklok naar de eerstvolgende wedstrijd */
  var affiche = document.querySelector('[data-volgende]');
  if (affiche && DATA) {
    var rij = komende(DATA.programma);
    var w = rij[0];

    if (!w) {
      affiche.innerHTML = '<p class="geen-wedstrijd">Het seizoen zit erop. Tot volgend jaar op de Duinwetering.</p>';
    } else {
      var d = new Date(w.datum);
      var thuisteam = w.thuis
        ? { naam: 'Noordwijk', logo: '<img class="clublogo" src="assets/logo-512.png" alt="vv Noordwijk">' }
        : { naam: w.tegen, logo: logoHtml(w, 'clublogo') };
      var uitteam = w.thuis
        ? { naam: w.tegen, logo: logoHtml(w, 'clublogo') }
        : { naam: 'Noordwijk', logo: '<img class="clublogo" src="assets/logo-512.png" alt="vv Noordwijk">' };

      affiche.innerHTML =
        '<div class="affiche">' +
          '<div class="team">' + thuisteam.logo + '<span>' + thuisteam.naam + '</span></div>' +
          '<div class="vs">VS</div>' +
          '<div class="team">' + uitteam.logo + '<span>' + uitteam.naam + '</span></div>' +
        '</div>' +
        '<div class="wedstrijd-meta">' +
          '<strong>' + (w.soort === 'beker' ? 'KNVB-beker' : 'Derde divisie B') +
            (w.thuis ? '' : ' · uitwedstrijd') + '</strong>' +
          DAGEN[d.getDay()] + ' ' + d.getDate() + ' ' + MAANDEN[d.getMonth()] + ' ' + d.getFullYear() +
          ' · ' + pad(d.getHours()) + '.' + pad(d.getMinutes()) + ' uur<br>' +
          (w.thuis ? 'Sportpark Duinwetering, veld 1' : 'Uit bij ' + w.tegen) +
        '</div>' +
        '<div class="countdown">' +
          '<div class="count-item"><b data-cd-d>00</b><span>Dagen</span></div>' +
          '<div class="count-item"><b data-cd-u>00</b><span>Uur</span></div>' +
          '<div class="count-item"><b data-cd-m>00</b><span>Min</span></div>' +
          '<div class="count-item"><b data-cd-s>00</b><span>Sec</span></div>' +
        '</div>';

      var doelTijd = tijdVan(w);
      var velden = {
        d: affiche.querySelector('[data-cd-d]'),
        u: affiche.querySelector('[data-cd-u]'),
        m: affiche.querySelector('[data-cd-m]'),
        s: affiche.querySelector('[data-cd-s]')
      };
      var tikker = setInterval(tik, 1000);
      function tik() {
        var rest = doelTijd - Date.now();
        if (rest <= 0) {
          velden.d.textContent = velden.u.textContent = velden.m.textContent = velden.s.textContent = '00';
          clearInterval(tikker);
          return;
        }
        var s = Math.floor(rest / 1000);
        velden.d.textContent = pad(Math.floor(s / 86400));
        velden.u.textContent = pad(Math.floor(s % 86400 / 3600));
        velden.m.textContent = pad(Math.floor(s % 3600 / 60));
        velden.s.textContent = pad(s % 60);
      }
      tik();
    }
  }

  /* Wedstrijdlijsten (agenda op de homepage, volledig programma) */
  document.querySelectorAll('[data-programma]').forEach(function (houder) {
    if (!DATA) return;
    var max = parseInt(houder.getAttribute('data-programma'), 10) || 99;
    var rijen = komende(DATA.programma).slice(0, max);

    houder.innerHTML = rijen.map(function (w) {
      var d = new Date(w.datum);
      var affiche = w.thuis ? 'vv Noordwijk – ' + w.tegen : w.tegen + ' – vv Noordwijk';
      var label = w.thuis
        ? '<span class="thuis-label">thuis</span>'
        : '<span class="uit-label">uit</span>';
      var beker = w.soort === 'beker' ? '<span class="beker-label">KNVB-beker</span>' : '';
      return '<div class="agenda-rij reveal">' +
          '<div class="agenda-datum"><b>' + pad(d.getDate()) + '</b><span>' +
            MAANDEN[d.getMonth()].toUpperCase() + '</span></div>' +
          '<h3>' + logoHtml(w, 'clubje') + affiche + ' ' + label + beker + '</h3>' +
          '<span class="tijd">' + pad(d.getHours()) + '.' + pad(d.getMinutes()) + ' uur</span>' +
        '</div>';
    }).join('');

    houder.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  });

  /* Recente uitslagen */
  var uitslagenHouder = document.querySelector('[data-uitslagen]');
  if (uitslagenHouder && DATA) {
    uitslagenHouder.innerHTML = DATA.uitslagen.map(function (u) {
      var d = new Date(u.datum);
      return '<div class="uitslag-rij">' +
          '<span class="uitslag-datum">' + pad(d.getDate()) + ' ' + MAANDEN[d.getMonth()] + '</span>' +
          '<span class="uitslag-teams">' + u.thuisteam + ' <em>–</em> ' + u.uitteam + '</span>' +
          '<b class="uitslag-score">' + u.uitslag + '</b>' +
        '</div>';
    }).join('');
  }

  /* Stand */
  var standHouder = document.querySelector('[data-stand]');
  if (standHouder && DATA) {
    standHouder.innerHTML =
      '<tr><th>#</th><th>Team</th><th>GS</th><th>W</th><th>G</th><th>V</th><th>DS</th><th>Pt</th></tr>' +
      DATA.stand.map(function (r) {
        var logo = r.logo
          ? '<img class="stand-logo" src="assets/clubs/' + r.logo + '" alt="">'
          : '<img class="stand-logo" src="assets/logo-512.png" alt="">';
        return '<tr' + (r.eigen ? ' class="eigen-club"' : '') + '>' +
            '<td>' + r.p + '</td>' +
            '<td class="stand-team">' + logo + r.team + '</td>' +
            '<td>' + r.gs + '</td><td>' + r.gw + '</td><td>' + r.gl + '</td><td>' + r.vl + '</td>' +
            '<td>' + r.v + '-' + r.t + '</td><td><b>' + r.pt + '</b></td>' +
          '</tr>';
      }).join('');
  }

  /* Clubagenda naast het voetbal */
  var clubagenda = document.querySelector('[data-clubagenda]');
  if (clubagenda && DATA) {
    var items = (DATA.agenda || []).filter(function (a) {
      return new Date(a.datum).getTime() > Date.now();
    }).slice(0, 4);
    clubagenda.innerHTML = items.map(function (a) {
      var d = new Date(a.datum);
      return '<div class="agenda-rij reveal">' +
          '<div class="agenda-datum"><b>' + pad(d.getDate()) + '</b><span>' +
            MAANDEN[d.getMonth()].toUpperCase() + '</span></div>' +
          '<h3>' + a.titel + '</h3>' +
          '<span class="tijd">' + pad(d.getHours()) + '.' + pad(d.getMinutes()) + ' uur</span>' +
        '</div>';
    }).join('');
    clubagenda.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  }

  /* ---------- Ticketwizard (demo) ---------- */
  var ticket = document.querySelector('[data-tickets]');
  if (ticket && DATA) {
    var keuzeWedstrijd = ticket.querySelector('[name=wedstrijd]');
    var keuzeSoort = ticket.querySelector('[name=soort]');
    var keuzeAantal = ticket.querySelector('[name=aantal]');
    var totaalEl = ticket.querySelector('[data-totaal]');
    var regelEl = ticket.querySelector('[data-regel]');

    komende(DATA.programma).filter(function (w) { return w.thuis; }).forEach(function (w) {
      var d = new Date(w.datum);
      var o = document.createElement('option');
      o.value = w.datum;
      o.textContent = 'vv Noordwijk – ' + w.tegen + ' · ' + d.getDate() + ' ' +
        MAANDEN[d.getMonth()] + ' · ' + pad(d.getHours()) + '.' + pad(d.getMinutes()) + ' uur';
      keuzeWedstrijd.appendChild(o);
    });

    Object.keys(DATA.prijzen).forEach(function (k) {
      var o = document.createElement('option');
      o.value = k;
      o.textContent = DATA.prijzen[k].label + ' — € ' + DATA.prijzen[k].prijs;
      keuzeSoort.appendChild(o);
    });

    function herbereken() {
      var soort = DATA.prijzen[keuzeSoort.value];
      var aantal = parseInt(keuzeAantal.value, 10) || 1;
      if (!soort) return;
      totaalEl.textContent = '€ ' + (soort.prijs * aantal).toFixed(2).replace('.', ',');
      regelEl.textContent = aantal + '× ' + soort.label + ' à € ' + soort.prijs;
    }
    ticket.addEventListener('change', herbereken);
    ticket.addEventListener('input', herbereken);
    herbereken();

    ticket.addEventListener('submit', function (e) {
      e.preventDefault();
      ticket.querySelector('[data-ticket-melding]').hidden = false;
    });
  }

  /* Parallax hero-achtergrond */
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        heroBg.style.transform = 'translateY(' + y * 0.35 + 'px) scale(1)';
      }
    }, { passive: true });
  }
})();
