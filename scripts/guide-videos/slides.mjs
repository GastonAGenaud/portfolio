// Renders the slides of one video as a single HTML page: one 1920x1080
// <section> per slide, in the visual language of the series covers.
import { SERIES_TOTAL, labels } from './plan.mjs';

export const WIDTH = 1920;
export const HEIGHT = 1080;

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Same inline markup as the article: `code`, **bold** and [text](url).
const inline = (text) =>
  escapeHtml(text)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

const pad = (n) => String(n).padStart(2, '0');

// A diagram much taller or wider than the frame is cut into pieces laid side
// by side (tall) or stacked (wide), so its labels stay readable. Pieces
// overlap, so a box sliced by one cut shows whole in the next piece.
const diagramPieces = ({ width, height }, area) => {
  const overlap = 0.08;
  const gap = 56;
  const layout = (count, tall) => {
    const length = tall ? height : width;
    const slice = count === 1 ? length : (length / count) * (1 + overlap);
    const room = (total) => (total - gap * (count - 1)) / count;
    const scale = tall
      ? Math.min(area.height / slice, room(area.width) / width)
      : Math.min(area.width / slice, room(area.height) / height);
    // Diagrams are exported at 2x, so a mild upscale still looks sharp.
    return { count, tall, slice, length, scale: Math.min(scale, 1.5) };
  };
  // Every cut costs legibility: take one only for a clearly bigger diagram.
  const best = [2, 3]
    .flatMap((count) => [layout(count, true), layout(count, false)])
    .sort((a, b) => a.count - b.count)
    .reduce((a, b) => (b.scale > a.scale * 1.25 ? b : a), layout(1, true));

  const px = (value) => Math.round(value * best.scale);
  const pieces = Array.from({ length: best.count }, (_, i) => {
    const offset =
      best.count === 1
        ? 0
        : (i * (best.length - best.slice)) / (best.count - 1);
    return {
      fade: [i > 0 && 'start', i < best.count - 1 && 'end'].filter(Boolean),
      width: px(best.tall ? width : best.slice),
      height: px(best.tall ? best.slice : height),
      x: best.tall ? 0 : px(offset),
      y: best.tall ? px(offset) : 0,
    };
  });
  return {
    direction: best.tall ? 'row' : 'column',
    size: `${px(width)}px ${px(height)}px`,
    pieces,
  };
};

const body = (slide, { guide, lang, publicDir }) => {
  const l = labels[lang];
  switch (slide.kind) {
    case 'title':
      return `
        <div class="title-number">${pad(guide.day)}</div>
        <div class="title-block">
          <h1>${inline(slide.title)}</h1>
          <p class="summary">${inline(slide.summary)}</p>
          <div class="tags">${slide.tags
            .map((tag) => `<span>${escapeHtml(tag)}</span>`)
            .join('')}</div>
        </div>`;
    case 'text':
      return `
        <h2>${inline(slide.heading)}</h2>
        ${slide.paragraphs
          .map((p) => `<p class="prose">${inline(p)}</p>`)
          .join('')}`;
    case 'diagram': {
      const diagram = diagramPieces(slide.image, { width: 1640, height: 640 });
      const src = `file://${publicDir}${slide.image.dark}`;
      return `
        <h2>${inline(slide.heading)}</h2>
        <div class="diagram ${diagram.direction}">${diagram.pieces
        .map(
          (piece) =>
            `<div class="${piece.fade
              .map((edge) => `fade-${edge}`)
              .join(' ')}" style="width:${piece.width}px;height:${
              piece.height
            }px;background-image:url('${src}');background-size:${
              diagram.size
            };background-position:-${piece.x}px -${piece.y}px"></div>`
        )
        .join('')}</div>`;
    }
    case 'list':
      return `
        <h2>${inline(slide.heading)}</h2>
        <ul class="list ${slide.marker ?? 'dot'}">${slide.items
        .map((item) => `<li>${inline(item)}</li>`)
        .join('')}</ul>`;
    case 'code':
      return `
        <h2 class="mono">${inline(slide.heading)}</h2>
        <pre><code>${escapeHtml(slide.code)}</code></pre>`;
    case 'step':
      return `
        <div class="step-number">${pad(slide.number)}</div>
        <h2>${inline(slide.heading)}</h2>
        <p class="lead">${inline(slide.lead)}</p>
        ${slide.paragraphs
          .map((p) => `<p class="prose small">${inline(p)}</p>`)
          .join('')}`;
    case 'quote':
      return `
        <h2>${inline(slide.heading)}</h2>
        <blockquote>${inline(slide.text)}</blockquote>`;
    case 'outro':
      return `
        <h2>${inline(slide.heading)}</h2>
        <p class="url">${escapeHtml(slide.url)}</p>
        ${
          slide.next
            ? `<div class="next"><span>${escapeHtml(
                slide.next.label
              )}</span><strong>${inline(slide.next.title)}</strong></div>`
            : ''
        }
        <p class="signature">Gastón Genaud</p>`;
    default:
      throw new Error(`Unknown slide kind: ${slide.kind} (${l.series})`);
  }
};

const css = (publicDir) => `
  @font-face { font-family: 'agustina'; src: url('file://${publicDir}/fonts/Agustina-Signature.otf'); }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0b1120; }
  .slide {
    --s: 1;
    position: relative; width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden;
    display: flex; flex-direction: column; padding: 84px 140px 72px;
    font-family: 'Inter', sans-serif; color: #f1f5f9;
    background:
      radial-gradient(900px 700px at 100% 0%, rgba(56,189,248,.16), transparent 70%),
      radial-gradient(700px 500px at 0% 100%, rgba(37,99,235,.20), transparent 70%),
      #0b1120;
  }
  header { display: flex; justify-content: space-between; font: 500 26px 'Roboto Mono', monospace; letter-spacing: .12em; text-transform: uppercase; color: #94a3b8; }
  header b { color: #38bdf8; font-weight: 500; }
  main { flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: center; padding: 36px 0; position: relative; }
  footer { display: flex; align-items: center; gap: 40px; font: 400 24px 'Roboto Mono', monospace; color: #64748b; }
  .bar { flex: 1; display: flex; gap: 8px; }
  .bar i { flex: 1; height: 8px; border-radius: 4px; background: rgba(148,163,184,.18); }
  .bar i.on { background: #38bdf8; }
  h1 { font-size: calc(92px * var(--s)); line-height: 1.08; font-weight: 600; letter-spacing: -.02em; }
  h2 { font-size: calc(64px * var(--s)); line-height: 1.12; font-weight: 600; letter-spacing: -.02em; margin-bottom: calc(40px * var(--s)); }
  h2.mono { font: 500 calc(40px * var(--s)) 'Roboto Mono', monospace; color: #38bdf8; letter-spacing: 0; }
  code { font-family: 'Roboto Mono', monospace; font-size: .88em; color: #7dd3fc; background: rgba(56,189,248,.12); padding: .08em .3em; border-radius: 8px; }
  strong { font-weight: 600; color: #fff; }
  .summary { font-size: calc(40px * var(--s)); line-height: 1.4; color: #cbd5e1; margin-top: 36px; }
  .title-block { max-width: 980px; position: relative; }
  .title-number { position: absolute; right: -40px; top: 50%; transform: translateY(-50%); font-size: 500px; font-weight: 700; line-height: 1; color: transparent; -webkit-text-stroke: 3px rgba(56,189,248,.45); }
  .tags { display: flex; gap: 16px; margin-top: 44px; }
  .tags span { font: 500 28px 'Roboto Mono', monospace; color: #7dd3fc; padding: 10px 24px; border-radius: 999px; background: rgba(56,189,248,.12); border: 1.5px solid rgba(56,189,248,.3); }
  .prose { font-size: calc(40px * var(--s)); line-height: 1.5; color: #cbd5e1; }
  .prose + .prose { margin-top: calc(28px * var(--s)); }
  .prose.small { font-size: calc(33px * var(--s)); color: #94a3b8; }
  .lead { font-size: calc(40px * var(--s)); line-height: 1.42; color: #f1f5f9; padding: calc(24px * var(--s)) calc(36px * var(--s)); margin-bottom: calc(32px * var(--s)); border-left: 6px solid #38bdf8; background: rgba(56,189,248,.08); border-radius: 0 16px 16px 0; }
  .step-number { position: absolute; right: -20px; top: -10px; font-size: 180px; font-weight: 700; line-height: 1; color: transparent; -webkit-text-stroke: 2px rgba(56,189,248,.28); }
  .kind-step h2 { max-width: 1320px; }
  .list { list-style: none; display: flex; flex-direction: column; gap: calc(30px * var(--s)); }
  .list li { position: relative; padding-left: calc(72px * var(--s)); font-size: calc(40px * var(--s)); line-height: 1.4; color: #e2e8f0; }
  .list li::before { position: absolute; left: 0; top: .08em; width: 1.15em; height: 1.15em; display: grid; place-items: center; border-radius: 10px; font-size: .82em; font-weight: 700; }
  .list.dot li::before { content: ''; width: .42em; height: .42em; top: .52em; left: .3em; border-radius: 50%; background: #38bdf8; }
  .list.cross li::before { content: '✕'; color: #fda4af; background: rgba(244,63,94,.16); border: 1.5px solid rgba(244,63,94,.4); }
  .list.check li::before { content: '✓'; color: #6ee7b7; background: rgba(16,185,129,.16); border: 1.5px solid rgba(16,185,129,.4); }
  pre { font: 400 calc(34px * var(--s)) / 1.5 'Roboto Mono', monospace; color: #e2e8f0; background: rgba(15,23,42,.85); border: 1.5px solid rgba(56,189,248,.25); border-radius: 20px; padding: calc(36px * var(--s)) calc(44px * var(--s)); white-space: pre; align-self: flex-start; max-width: 100%; }
  pre code { all: unset; }
  .diagram { display: flex; justify-content: center; align-items: center; gap: 56px; }
  .diagram.column { flex-direction: column; --to: right; }
  .diagram.row { --to: bottom; }
  .diagram div { background-repeat: no-repeat; flex: none; --start: #000; --end: #000; -webkit-mask-image: linear-gradient(to var(--to), var(--start), #000 9%, #000 91%, var(--end)); }
  .diagram .fade-start { --start: transparent; }
  .diagram .fade-end { --end: transparent; }
  blockquote { font-size: calc(58px * var(--s)); line-height: 1.34; font-weight: 500; padding-left: 48px; border-left: 8px solid #38bdf8; max-width: 1500px; }
  .url { font: 500 36px 'Roboto Mono', monospace; color: #38bdf8; white-space: nowrap; }
  .next { margin-top: 64px; display: flex; flex-direction: column; gap: 16px; max-width: 1400px; }
  .next span { font: 500 26px 'Roboto Mono', monospace; letter-spacing: .12em; text-transform: uppercase; color: #94a3b8; }
  .next strong { font-size: calc(52px * var(--s)); line-height: 1.2; }
  .signature { font: 400 76px 'agustina', cursive; color: #e2e8f0; margin-top: 64px; }
`;

// Shrinks the content of any slide that overflows its frame.
const fitScript = `
  for (const main of document.querySelectorAll('main')) {
    const slide = main.parentElement;
    const overflows = () =>
      main.scrollHeight > main.clientHeight + 1 ||
      [...main.querySelectorAll('pre')].some((pre) => pre.scrollWidth > main.clientWidth + 1 || pre.offsetWidth > main.clientWidth + 1);
    for (let s = 1; overflows() && s > 0.4; s -= 0.02) slide.style.setProperty('--s', s.toFixed(2));
  }
`;

export const renderSlides = (slides, context) => {
  const { guide, lang, publicDir } = context;
  const l = labels[lang];
  const sections = slides.map(
    (slide, index) => `
    <section class="slide kind-${slide.kind}">
      <header>
        <span><b>${l.series}</b> · ${l.day} ${pad(
      guide.day
    )}/${SERIES_TOTAL}</span>
        <span>${escapeHtml(slide.section)}</span>
      </header>
      <main>${body(slide, context)}</main>
      <footer>
        <div class="bar">${slides
          .map((_, i) => `<i class="${i <= index ? 'on' : ''}"></i>`)
          .join('')}</div>
        <span>gastongenaud.com</span>
      </footer>
    </section>`
  );
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;500&display=block" rel="stylesheet">
<style>${css(publicDir)}</style>
</head>
<body>${sections.join(
    ''
  )}<script>document.fonts.ready.then(() => { ${fitScript} document.body.dataset.ready = '1'; });</script></body>
</html>`;
};
