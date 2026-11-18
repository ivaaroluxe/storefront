/**
 * The interactive behaviour of the IVAARO static pages, ported from their
 * inline scripts. Each function runs on a page's root element and returns a
 * cleanup function.
 */
import {SITE} from './site';

type Cleanup = () => void;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function listen<K extends keyof HTMLElementEventMap>(
  el: EventTarget,
  type: K | string,
  fn: (e: Event) => void,
  cleanups: Cleanup[],
  options?: AddEventListenerOptions,
) {
  el.addEventListener(type, fn, options);
  cleanups.push(() => el.removeEventListener(type, fn, options));
}

function run(cleanups: Cleanup[]) {
  return () => cleanups.splice(0).forEach((fn) => fn());
}

/** "Read more" under a page hero */
export function readMore(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [];
  const btn = root.querySelector<HTMLButtonElement>('.readmore');
  const more = root.querySelector<HTMLElement>('#heroMore');
  if (btn && more) {
    listen(
      btn,
      'click',
      () => {
        const opening = more.hidden;
        more.hidden = !opening;
        btn.setAttribute('aria-expanded', String(opening));
        btn.textContent = opening ? 'Read less' : 'Read more';
      },
      cleanups,
    );
  }
  return run(cleanups);
}

/** Background films with a pause button; play only while on screen */
export function videoBanners(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [];
  const reduce = prefersReducedMotion();
  root.querySelectorAll<HTMLElement>('.banner').forEach((sec) => {
    const v = sec.querySelector<HTMLVideoElement>('video[data-bg-video]');
    const t = sec.querySelector<HTMLButtonElement>('[data-video-toggle]');
    if (!v || !t) return;
    v.muted = true;
    let userPaused = reduce;
    const sync = () => {
      const p = v.paused;
      const pause = t.querySelector<SVGElement>('.i-pause');
      const play = t.querySelector<SVGElement>('.i-play');
      if (pause) pause.style.display = p ? 'none' : '';
      if (play) play.style.display = p ? '' : 'none';
      t.setAttribute('aria-label', p ? 'Play video' : 'Pause video');
    };
    listen(
      t,
      'click',
      () => {
        if (v.paused) {
          userPaused = false;
          v.play().catch(() => {});
        } else {
          userPaused = true;
          v.pause();
        }
      },
      cleanups,
    );
    listen(v, 'play', sync, cleanups);
    listen(v, 'pause', sync, cleanups);
    if (reduce) {
      v.removeAttribute('autoplay');
      v.pause();
    } else if (v.hasAttribute('autoplay')) {
      v.play().catch(() => {});
    }
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && !userPaused) v.play().catch(() => {});
            else if (!e.isIntersecting) v.pause();
          });
        },
        {threshold: 0.25},
      );
      io.observe(sec);
      cleanups.push(() => io.disconnect());
    }
    sync();
  });
  return run(cleanups);
}

/** Homepage: the crossfading hero film reel */
function heroReel(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [];
  const sec = root.querySelector<HTMLElement>('.hero-reel');
  if (!sec) return run(cleanups);
  const vids = Array.from(sec.querySelectorAll<HTMLVideoElement>('.reel-v'));
  const btn = sec.querySelector<HTMLButtonElement>('[data-reel-toggle]');
  const ticks = sec.querySelector<HTMLElement>('.reel-ticks');
  if (!btn || !ticks || vids.length < 2) return run(cleanups);
  const bars = Array.from(ticks.querySelectorAll<HTMLElement>('i'));
  const reduce = prefersReducedMotion();
  const conn = (navigator as Navigator & {connection?: {saveData?: boolean}})
    .connection;
  const small =
    window.matchMedia('(max-width:900px)').matches || Boolean(conn?.saveData);
  const base = '/assets/videos/';
  const clips = [
    {f: 'reel-ink', t: 0, d: 5},
    {f: 'reel-candle', t: 2, d: 5},
    {f: 'reel-writer', t: 6, d: 5.5},
    {f: 'hero-pen', t: 1, d: 6.5, big: 'hero-pen'},
  ];
  type Clip = (typeof clips)[number];
  const url = (c: Clip) =>
    base + (small ? `${c.f}-720` : c.big || `${c.f}-1080`) + '.mp4';
  const FADE = 1.4;
  let i = 0;
  let cur = 0;
  let userPaused = reduce;
  let started = false;
  const timers: number[] = [];
  cleanups.push(() => timers.forEach((t) => window.clearTimeout(t)));

  vids.forEach((v) => (v.muted = true));

  const load = (v: HTMLVideoElement, c: Clip) => {
    if (v.dataset.f !== c.f) {
      v.dataset.f = c.f;
      v.preload = 'auto';
      v.src = url(c);
    }
    const go = () => {
      try {
        v.currentTime = c.t;
      } catch {
        /* not seekable yet */
      }
    };
    if (v.readyState >= 1) go();
    else v.addEventListener('loadedmetadata', go, {once: true});
  };
  const setTicks = () => {
    bars.forEach((b, k) => {
      b.classList.remove('run');
      b.classList.toggle('done', k < i);
    });
    void ticks.offsetWidth;
    bars[i].style.setProperty('--d', `${clips[i].d}s`);
    bars[i].classList.add('run');
  };
  const show = (n: number) => {
    i = n;
    const c = clips[i];
    const v = vids[cur];
    const o = vids[1 - cur];
    load(v, c);
    setTicks();
    v.classList.remove('push');
    void v.offsetWidth;
    v.play().catch(() => {});
    v.classList.add('is-on', 'push');
    o.classList.remove('is-on');
    timers.push(
      window.setTimeout(
        () => {
          if (!o.classList.contains('is-on')) {
            o.pause();
            o.classList.remove('push');
          }
          load(o, clips[(i + 1) % clips.length]);
        },
        FADE * 1000 + 100,
      ),
    );
  };
  const advance = () => {
    cur = 1 - cur;
    show((i + 1) % clips.length);
  };
  vids.forEach((v, k) => {
    listen(
      v,
      'timeupdate',
      () => {
        if (k !== cur || userPaused) return;
        const c = clips[i];
        if (v.currentTime >= c.t + c.d - FADE) advance();
      },
      cleanups,
    );
    listen(v, 'error', () => k === cur && advance(), cleanups);
    listen(v, 'ended', () => k === cur && advance(), cleanups);
  });
  const sync = () => {
    const p = userPaused || !started;
    const pause = btn.querySelector<SVGElement>('.i-pause');
    const play = btn.querySelector<SVGElement>('.i-play');
    if (pause) pause.style.display = p ? 'none' : '';
    if (play) play.style.display = p ? '' : 'none';
    btn.setAttribute('aria-label', p ? 'Play video' : 'Pause video');
    ticks.classList.toggle('paused', p);
  };
  const play = () => {
    if (!started) {
      started = true;
      show(0);
    } else {
      vids[cur].play().catch(() => {});
    }
    sync();
  };
  const pause = () => {
    vids.forEach((v) => v.pause());
    ticks.classList.add('paused');
  };
  listen(
    btn,
    'click',
    () => {
      userPaused = !userPaused;
      if (userPaused) pause();
      else play();
      sync();
    },
    cleanups,
  );
  if (reduce) {
    load(vids[0], clips[0]);
    vids[0].classList.add('is-on');
  } else {
    play();
  }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) pause();
          else if (!userPaused && started) play();
        });
      },
      {threshold: 0.2},
    );
    io.observe(sec);
    cleanups.push(() => io.disconnect());
  }
  sync();
  cleanups.push(() => vids.forEach((v) => v.pause()));
  return run(cleanups);
}

/** Homepage: "Selected for You" carousel */
function carousel(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [];
  const track = root.querySelector<HTMLElement>('#track');
  const prev = root.querySelector<HTMLButtonElement>('#prev');
  const next = root.querySelector<HTMLButtonElement>('#next');
  const bar = root.querySelector<HTMLElement>('#bar');
  if (!track || !prev || !next || !bar) return run(cleanups);
  const step = () => {
    const c = track.querySelector('.card');
    return c ? c.getBoundingClientRect().width + 24 : 300;
  };
  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;
    const w = (track.clientWidth / track.scrollWidth) * 100;
    bar.style.width = `${w}%`;
    bar.style.left = `${max > 0 ? (track.scrollLeft / max) * (100 - w) : 0}%`;
  };
  listen(prev, 'click', () => track.scrollBy({left: -step()}), cleanups);
  listen(next, 'click', () => track.scrollBy({left: step()}), cleanups);
  listen(track, 'scroll', update, cleanups, {passive: true});
  listen(window, 'resize', update, cleanups);
  listen(
    track,
    'keydown',
    (e) => {
      const k = (e as KeyboardEvent).key;
      if (k === 'ArrowRight') {
        track.scrollBy({left: step()});
        e.preventDefault();
      }
      if (k === 'ArrowLeft') {
        track.scrollBy({left: -step()});
        e.preventDefault();
      }
    },
    cleanups,
  );
  update();
  return run(cleanups);
}

export function initHome(root: HTMLElement): Cleanup {
  const fns = [heroReel(root), carousel(root), videoBanners(root)];
  return () => fns.forEach((fn) => fn());
}

export function initDiscover(root: HTMLElement): Cleanup {
  const fns = [videoBanners(root), readMore(root)];
  return () => fns.forEach((fn) => fn());
}

/** FAQ: search box, section highlighting and opening a linked question */
export function initFaq(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [readMore(root)];
  const q = root.querySelector<HTMLInputElement>('#faqQ');
  const none = root.querySelector<HTMLElement>('#faqNone');
  const groups = Array.from(root.querySelectorAll<HTMLElement>('.faq-group'));
  if (q && none) {
    listen(
      q,
      'input',
      () => {
        const t = q.value.trim().toLowerCase();
        let any = false;
        groups.forEach((g) => {
          let shown = 0;
          g.querySelectorAll<HTMLDetailsElement>('.qa').forEach((d) => {
            const m = !t || (d.textContent || '').toLowerCase().includes(t);
            d.hidden = !m;
            if (m) shown++;
            if (t && m) d.open = true;
          });
          g.hidden = shown === 0;
          if (shown) any = true;
        });
        none.hidden = any;
      },
      cleanups,
    );
  }
  if (location.hash) {
    const d = root.querySelector(location.hash);
    if (d instanceof HTMLDetailsElement) d.open = true;
  }
  const links = Array.from(
    root.querySelectorAll<HTMLAnchorElement>('.faq-nav a'),
  );
  if ('IntersectionObserver' in window && links.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach((a) =>
              a.classList.toggle(
                'on',
                a.getAttribute('href') === `#${e.target.id}`,
              ),
            );
          }
        });
      },
      {rootMargin: '-40% 0px -55% 0px'},
    );
    groups.forEach((g) => io.observe(g));
    cleanups.push(() => io.disconnect());
  }
  return run(cleanups);
}

/** Contact: validate the form and open the visitor's email app */
export function initContact(root: HTMLElement): Cleanup {
  const cleanups: Cleanup[] = [readMore(root)];
  const TO = SITE.email;
  const f = root.querySelector<HTMLFormElement>('#contactForm');
  const status = root.querySelector<HTMLElement>('#cStatus');
  const topic = root.querySelector<HTMLSelectElement>('#cTopic');
  if (!f || !status || !topic) return run(cleanups);
  const byId = <T extends HTMLElement>(id: string) =>
    root.querySelector<T>(`#${id}`) as T;

  root.querySelectorAll<HTMLElement>('[data-topic]').forEach((b) => {
    listen(
      b,
      'click',
      () => {
        topic.value = b.getAttribute('data-topic') || '';
        byId('message')?.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        });
        const t = window.setTimeout(
          () => byId<HTMLInputElement>('cName')?.focus({preventScroll: true}),
          500,
        );
        cleanups.push(() => window.clearTimeout(t));
      },
      cleanups,
    );
  });

  const setErr = (
    el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    msg: string,
  ) => {
    const e = el.parentElement?.querySelector('.err');
    if (e) e.textContent = msg || '';
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };

  listen(
    f,
    'submit',
    (e) => {
      e.preventDefault();
      let ok = true;
      let first: HTMLElement | null = null;
      (
        [
          ['cName', 'Please enter your name.'],
          ['cEmail', 'Please enter a valid email address.'],
          ['cTopic', 'Please choose a topic.'],
          ['cMsg', 'Please write your message.'],
        ] as const
      ).forEach(([id, msg]) => {
        const el = byId<HTMLInputElement>(id);
        const bad =
          !el.value.trim() || (el.type === 'email' && !el.checkValidity());
        setErr(el, bad ? msg : '');
        if (bad) {
          ok = false;
          first = first || el;
        }
      });
      const c = byId<HTMLInputElement>('cConsent');
      if (!c.checked) {
        ok = false;
        status.textContent =
          'Please agree to the privacy notice so we can reply.';
        first = first || c;
      }
      if (!ok) {
        (first as HTMLElement | null)?.focus();
        return;
      }
      const v = (id: string) => byId<HTMLInputElement>(id).value.trim();
      const subject = `[IVAARO] ${v('cTopic')} – ${v('cName')}`;
      const body = `Name: ${v('cName')}\nEmail: ${v('cEmail')}\nPhone: ${v('cPhone')}\nTopic: ${v('cTopic')}\nOrder number: ${v('cOrder')}\n\n${v('cMsg')}`;
      window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = `Your email app should now open with your message ready to send. If it does not, please write to ${TO}.`;
    },
    cleanups,
  );
  return run(cleanups);
}
