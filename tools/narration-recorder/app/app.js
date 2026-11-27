// Narration Recorder: read the script of each guide video slide by slide,
// record one take after another, trim them and check them against the video.
(() => {
  const api = window.recorder;
  const videos = window.NARRATION.videos;
  const byId = new Map(videos.map((video) => [video.id, video]));

  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, '0');
  const seconds = (value) =>
    `${value.toLocaleString('es-AR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })} s`;
  const clock = (value) => {
    const whole = Math.max(0, Math.floor(value));
    return `${Math.floor(whole / 60)}:${pad(whole % 60)}`;
  };
  const escapeHtml = (text) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Same lead-in and gap between slides as the video generator.
  const SLIDE_LEAD = 0.5;
  const SLIDE_GAP = 0.8;

  // ---------------------------------------------------------------- state --

  let state = {
    lang: 'es',
    videoId: 'd01-es',
    slide: 0,
    pace: 1,
    showSay: true,
    mic: '',
    takes: {},
  };

  let saveTimer;
  const save = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => api.saveState(state), 300);
  };

  const video = () => byId.get(state.videoId);
  const slide = () => video().slides[state.slide];
  const slideTakes = (videoId = state.videoId, index = state.slide) => {
    state.takes[videoId] ??= {};
    state.takes[videoId][index] ??= { list: [], chosen: null };
    return state.takes[videoId][index];
  };
  const chosenTake = (videoId, index) => {
    const entry = state.takes[videoId]?.[index];
    return entry?.list.find((take) => take.id === entry.chosen) ?? null;
  };
  const doneCount = (videoId) =>
    byId.get(videoId).slides.filter((_, i) => chosenTake(videoId, i)).length;

  // Sentences of the current slide, flattened, with their paragraph.
  const sentences = () =>
    slide().paragraphs.flatMap((paragraph, p) =>
      paragraph.map((sentence) => ({ ...sentence, paragraph: p }))
    );
  let sentenceIndex = 0;

  // How long a slide stays on screen in the published video.
  const slotOf = (v, index) =>
    (v.slides[index + 1]?.start ?? v.duration) - v.slides[index].start;

  // ---------------------------------------------------------------- audio --

  const audio = new AudioContext();
  const decoded = new Map();

  const load = async (file) => {
    if (!decoded.has(file)) {
      const buffer = await audio.decodeAudioData(await api.readFile(file));
      decoded.set(file, {
        buffer,
        samples: Wav.toMono(buffer),
        sampleRate: buffer.sampleRate,
      });
    }
    return decoded.get(file);
  };

  let playing = null;
  const stopPlayback = () => {
    if (!playing) return;
    playing.stop();
    playing = null;
    drawWave();
  };

  const playSegment = (buffer, from, to, when = 0) => {
    const source = audio.createBufferSource();
    source.buffer = buffer;
    source.connect(audio.destination);
    source.start(audio.currentTime + when, from, to - from);
    return source;
  };

  // ------------------------------------------------------------ microphone --

  let stream = null;
  let analyser = null;

  const openMic = async () => {
    if (stream) return stream;
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: state.mic ? { exact: state.mic } : undefined,
        channelCount: 1,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });
    analyser = audio.createAnalyser();
    analyser.fftSize = 1024;
    audio.createMediaStreamSource(stream).connect(analyser);
    await listMics();
    return stream;
  };

  const closeMic = () => {
    stream?.getTracks().forEach((track) => track.stop());
    stream = null;
    analyser = null;
  };

  const listMics = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const mics = devices.filter((device) => device.kind === 'audioinput');
    $('mic').innerHTML = mics
      .map(
        (mic, i) =>
          `<option value="${mic.deviceId}">${escapeHtml(
            mic.label || `Micrófono ${i + 1}`
          )}</option>`
      )
      .join('');
    if (state.mic) $('mic').value = state.mic;
  };

  const meter = () => {
    if (analyser) {
      const data = new Float32Array(analyser.fftSize);
      analyser.getFloatTimeDomainData(data);
      const rms = Math.sqrt(
        data.reduce((sum, v) => sum + v * v, 0) / data.length
      );
      const level = Math.min(
        1,
        Math.max(0, (20 * Math.log10(rms + 1e-8) + 60) / 60)
      );
      $('level').style.width = `${level * 100}%`;
      $('level').classList.toggle('hot', level > 0.92);
    } else {
      $('level').style.width = '0';
    }
    if (rec) {
      $('clock').textContent = clock(elapsed());
      followPace();
    }
    requestAnimationFrame(meter);
  };

  // ------------------------------------------------------------- recording --

  let rec = null;

  const elapsed = () => {
    if (!rec) return 0;
    const now = performance.now();
    const paused = rec.pausedAt ? now - rec.pausedAt : 0;
    return (now - rec.startedAt - rec.pausedTotal - paused) / 1000;
  };

  // The highlight moves at the reference pace, scaled by the pace slider;
  // ↑ and ↓ move it by hand and the pace carries on from there.
  const followPace = () => {
    if (!rec || rec.pausedAt) return;
    const list = sentences();
    const position = rec.anchorRef + (elapsed() - rec.anchorTime) * state.pace;
    let index = list.findIndex((sentence) => sentence.end > position);
    if (index === -1) index = list.length - 1;
    if (index !== sentenceIndex) {
      sentenceIndex = index;
      highlight();
    }
  };

  const anchor = (index) => {
    const list = sentences();
    sentenceIndex = Math.max(0, Math.min(list.length - 1, index));
    if (rec) {
      rec.anchorRef = list[sentenceIndex].start;
      rec.anchorTime = elapsed();
    }
    highlight();
  };

  const startRecording = async () => {
    stopPlayback();
    stopPreview();
    await audio.resume();
    await openMic();
    const recorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus',
      audioBitsPerSecond: 256000,
    });
    const chunks = [];
    recorder.ondataavailable = (event) =>
      event.data.size && chunks.push(event.data);
    const videoId = state.videoId;
    const index = state.slide;
    const done = new Promise((resolve) => {
      recorder.onstop = () =>
        resolve(saveTake(videoId, index, new Blob(chunks)));
    });
    recorder.start(250);
    rec = {
      recorder,
      done,
      startedAt: performance.now(),
      pausedAt: 0,
      pausedTotal: 0,
      anchorRef: sentences()[0].start,
      anchorTime: 0,
    };
    sentenceIndex = 0;
    renderTransport();
    highlight();
  };

  const stopRecording = async () => {
    if (!rec) return;
    const { recorder, done } = rec;
    rec = null;
    recorder.stop();
    renderTransport();
    await done;
  };

  const togglePause = () => {
    if (!rec) return;
    if (rec.pausedAt) {
      rec.pausedTotal += performance.now() - rec.pausedAt;
      rec.pausedAt = 0;
      rec.recorder.resume();
    } else {
      rec.pausedAt = performance.now();
      rec.recorder.pause();
    }
    renderTransport();
  };

  const saveTake = async (videoId, index, blob) => {
    if (!blob.size) return;
    const buffer = await audio.decodeAudioData(await blob.arrayBuffer());
    const samples = Wav.toMono(buffer);
    const duration = samples.length / buffer.sampleRate;
    if (duration < 0.4) return toast('Toma demasiado corta: no se guardó.');
    const id = Date.now().toString(36);
    const file = `takes/${videoId}/slide-${pad(index + 1)}-${id}.wav`;
    await api.writeFile(file, Wav.encode(samples, buffer.sampleRate));
    decoded.set(file, { buffer, samples, sampleRate: buffer.sampleRate });
    const bounds = Wav.voiceBounds(samples, buffer.sampleRate);
    const entry = slideTakes(videoId, index);
    entry.list.push({
      id,
      file,
      duration,
      trimStart: bounds.start,
      trimEnd: bounds.end,
      createdAt: new Date().toISOString(),
    });
    // The latest take is the one in use; an earlier one can be picked back.
    entry.chosen = id;
    save();
    render();
  };

  const toggleRecord = () => (rec ? stopRecording() : startRecording());

  // "Next" while recording closes this slide's take and keeps recording on
  // the next slide, so a whole video can be read in one go.
  const goTo = async (index) => {
    const last = video().slides.length - 1;
    // Past the last slide, "next" just ends the recording.
    if (index > last) return stopRecording();
    const target = Math.max(0, Math.min(last, index));
    const wasRecording = Boolean(rec) && target !== state.slide;
    if (wasRecording) await stopRecording();
    state.slide = target;
    sentenceIndex = 0;
    save();
    render();
    if (wasRecording) await startRecording();
  };

  // ------------------------------------------------------------ take edits --

  const deleteTake = async () => {
    const entry = slideTakes();
    const take = chosenTake(state.videoId, state.slide);
    if (!take) return;
    if (!confirm(`¿Eliminar la toma de ${seconds(take.duration)}?`)) return;
    stopPlayback();
    entry.list = entry.list.filter((item) => item.id !== take.id);
    entry.chosen = entry.list.at(-1)?.id ?? null;
    await api.deleteFile(take.file);
    decoded.delete(take.file);
    save();
    render();
  };

  const autoTrim = async () => {
    const take = chosenTake(state.videoId, state.slide);
    if (!take) return;
    const { samples, sampleRate } = await load(take.file);
    const bounds = Wav.voiceBounds(samples, sampleRate);
    take.trimStart = bounds.start;
    take.trimEnd = bounds.end;
    save();
    render();
  };

  const playTake = async () => {
    if (playing) return stopPlayback();
    const take = chosenTake(state.videoId, state.slide);
    if (!take) return;
    await audio.resume();
    const { buffer } = await load(take.file);
    const source = playSegment(buffer, take.trimStart, take.trimEnd);
    const started = audio.currentTime;
    const current = {
      stop: () => source.stop(),
      position: () => take.trimStart + (audio.currentTime - started),
    };
    playing = current;
    source.onended = () => {
      if (playing === current) playing = null;
      drawWave();
    };
    animatePlayhead();
  };

  const animatePlayhead = () => {
    drawWave();
    if (playing) requestAnimationFrame(animatePlayhead);
  };

  // --------------------------------------------------------- video preview --

  const player = $('video');
  let preview = null;

  const stopPreview = () => {
    if (!preview) return;
    preview.cancelled = true;
    preview.timers.forEach(clearTimeout);
    preview.sources.forEach((source) => source.stop());
    player.pause();
    player.muted = true;
    preview = null;
    renderTransport();
  };

  const wait = (ms, run) =>
    new Promise((resolve) => run.timers.push(setTimeout(resolve, ms)));

  const seek = (time) =>
    new Promise((resolve) => {
      player.addEventListener('seeked', resolve, { once: true });
      player.currentTime = time;
    });

  // Plays one slide the way the exported video will: the slide's image for as
  // long as the take lasts. Without a take, the reference narration plays.
  const playSlide = async (run, index) => {
    const v = video();
    const current = v.slides[index];
    const slot = slotOf(v, index);
    const take = chosenTake(v.id, index);
    await seek(current.start);
    if (run.cancelled) return;
    if (!take) {
      player.muted = false;
      await player.play();
      await wait(slot * 1000, run);
      player.pause();
      player.muted = true;
      return;
    }
    const { buffer } = await load(take.file);
    const length = take.trimEnd - take.trimStart;
    const total = SLIDE_LEAD + length + SLIDE_GAP;
    run.sources.push(
      playSegment(buffer, take.trimStart, take.trimEnd, SLIDE_LEAD)
    );
    await player.play();
    // The video holds on the slide once the reference narration of it ends.
    run.timers.push(
      setTimeout(() => player.pause(), Math.min(slot, total) * 1000)
    );
    await wait(total * 1000, run);
    player.pause();
  };

  const startPreview = async (from, to) => {
    stopPlayback();
    stopPreview();
    await audio.resume();
    const run = { cancelled: false, timers: [], sources: [] };
    preview = run;
    renderTransport();
    for (let index = from; index <= to && !run.cancelled; index += 1) {
      if (index !== state.slide) {
        state.slide = index;
        render();
      }
      await playSlide(run, index);
    }
    if (preview === run) stopPreview();
  };

  // ---------------------------------------------------------------- export --

  const exportVideo = async () => {
    const v = video();
    const missing = v.slides
      .map((_, i) => i)
      .filter((i) => !chosenTake(v.id, i));
    if (
      missing.length &&
      !confirm(
        `Faltan ${missing.length} slides sin toma (${missing
          .map((i) => i + 1)
          .join(
            ', '
          )}). ¿Exportar igual? El video no se puede armar hasta tenerlas todas.`
      )
    ) {
      return;
    }
    const slides = [];
    for (const [index, current] of v.slides.entries()) {
      const take = chosenTake(v.id, index);
      if (!take) {
        slides.push({ index, section: current.section, file: null });
        continue;
      }
      const { samples, sampleRate } = await load(take.file);
      const part = samples.slice(
        Math.round(take.trimStart * sampleRate),
        Math.round(take.trimEnd * sampleRate)
      );
      const file = `slide-${pad(index + 1)}.wav`;
      await api.writeFile(
        `export/${v.id}/${file}`,
        Wav.encode(part, sampleRate)
      );
      slides.push({
        index,
        section: current.section,
        file,
        duration: part.length / sampleRate,
      });
    }
    const manifest = {
      id: v.id,
      day: v.day,
      lang: v.lang,
      exportedAt: new Date().toISOString(),
      complete: missing.length === 0,
      slides,
    };
    await api.writeFile(
      `export/${v.id}/voice.json`,
      new TextEncoder().encode(JSON.stringify(manifest, null, 2))
    );
    await api.openFolder(`export/${v.id}`);
    toast(
      `Exportado ${v.id}: ${slides.length - missing.length}/${
        slides.length
      } slides.`
    );
  };

  // ---------------------------------------------------------------- render --

  const sentenceHtml = (sentence) => {
    let html = '';
    let cursor = 0;
    for (const term of sentence.terms) {
      html += escapeHtml(sentence.text.slice(cursor, term.start));
      html += `<ruby class="term">${escapeHtml(
        sentence.text.slice(term.start, term.end)
      )}<rt>${escapeHtml(term.say)}</rt></ruby>`;
      cursor = term.end;
    }
    return html + escapeHtml(sentence.text.slice(cursor));
  };

  const renderSidebar = () => {
    document
      .querySelectorAll('.lang button')
      .forEach((button) =>
        button.classList.toggle('on', button.dataset.lang === state.lang)
      );
    $('videos').innerHTML = videos
      .filter((v) => v.lang === state.lang)
      .map((v) => {
        const done = doneCount(v.id);
        const total = v.slides.length;
        return `<li class="${v.id === state.videoId ? 'on' : ''} ${
          done === total ? 'complete' : ''
        }" data-id="${v.id}">
          <span class="day">${pad(v.day)}</span>
          <span class="name">${escapeHtml(v.title)}</span>
          <span class="progress"><i style="width:${
            (done / total) * 100
          }%"></i></span>
          <span class="count">${done}/${total}</span>
        </li>`;
      })
      .join('');
  };

  const renderSlides = () => {
    const v = video();
    $('video-label').textContent = `${v.lang === 'es' ? 'Día' : 'Day'} ${pad(
      v.day
    )} · ${v.id}`;
    $('video-title').textContent = v.title;
    $('slides').innerHTML = v.slides
      .map(
        (s, i) =>
          `<button class="${i === state.slide ? 'on' : ''} ${
            chosenTake(v.id, i) ? 'done' : ''
          }" data-slide="${i}" title="${escapeHtml(s.section)}">${
            i + 1
          }</button>`
      )
      .join('');
  };

  const renderPrompter = () => {
    const v = video();
    const s = slide();
    $('slide-label').textContent = `Slide ${state.slide + 1}/${
      v.slides.length
    } · ${s.section}`;
    $('slot').textContent = `Referencia ${seconds(slotOf(v, state.slide))}`;
    let index = 0;
    $('prompter').innerHTML = s.paragraphs
      .map(
        (paragraph) =>
          `<p>${paragraph
            .map(
              (sentence) =>
                `<span class="s" data-i="${index++}">${sentenceHtml(
                  sentence
                )}</span>`
            )
            .join(' ')}</p>`
      )
      .join('');
    const following = v.slides[state.slide + 1];
    $('next-up').innerHTML = following
      ? `<span>Sigue · ${escapeHtml(following.section)}</span> ${sentenceHtml(
          following.paragraphs[0][0]
        )}`
      : '<span>Última slide del video</span>';
    highlight();
  };

  const highlight = () => {
    document.querySelectorAll('#prompter .s').forEach((span) => {
      const i = Number(span.dataset.i);
      span.classList.toggle('now', i === sentenceIndex);
      span.classList.toggle('read', i < sentenceIndex);
    });
    document
      .querySelector('#prompter .s.now')
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  };

  const renderTakes = () => {
    const entry = slideTakes();
    $('takes').innerHTML = entry.list.length
      ? entry.list
          .map((take, i) => {
            const when = new Date(take.createdAt).toLocaleTimeString('es-AR', {
              hour: '2-digit',
              minute: '2-digit',
            });
            return `<li class="${
              take.id === entry.chosen ? 'on' : ''
            }" data-take="${take.id}">
              <span>${take.id === entry.chosen ? '★' : '☆'} Toma ${i + 1}</span>
              <span>${seconds(take.trimEnd - take.trimStart)}</span>
              <span class="muted">${when}</span>
            </li>`;
          })
          .reverse()
          .join('')
      : '<li class="empty">Sin tomas todavía. Apretá R y leé.</li>';
    renderSync();
    drawWave();
  };

  const renderSync = () => {
    const v = video();
    const reference = slotOf(v, state.slide);
    const take = chosenTake(v.id, state.slide);
    if (!take) {
      $(
        'sync'
      ).innerHTML = `<div class="sync-row"><span>Referencia</span><b>${seconds(
        reference
      )}</b></div>
        <p class="muted">Sin toma elegida.</p>`;
      return;
    }
    const mine = SLIDE_LEAD + (take.trimEnd - take.trimStart) + SLIDE_GAP;
    const diff = mine - reference;
    const max = Math.max(mine, reference);
    $('sync').innerHTML = `
      <div class="sync-row"><span>Referencia</span><b>${seconds(
        reference
      )}</b></div>
      <div class="bar"><i style="width:${(reference / max) * 100}%"></i></div>
      <div class="sync-row"><span>Tu toma</span><b class="${
        Math.abs(diff) > 2 ? 'warn' : ''
      }">${seconds(mine)} (${diff >= 0 ? '+' : '−'}${seconds(
      Math.abs(diff)
    )})</b></div>
      <div class="bar mine"><i style="width:${(mine / max) * 100}%"></i></div>
      <p class="muted">Al armar el video, cada slide dura lo que dura tu toma: la sincronía es automática.</p>`;
  };

  const renderTransport = () => {
    $('record').textContent = rec ? '■ Detener' : '● Grabar';
    $('record').classList.toggle('live', Boolean(rec));
    $('pause').disabled = !rec;
    $('pause').textContent = rec?.pausedAt ? '▶ Seguir' : '❚❚ Pausa';
    $('preview-all').textContent = preview
      ? '■ Detener preview'
      : '▶ Preview completo';
    $('preview-slide').textContent = preview ? '■ Detener' : '▶ Con video (V)';
    document.body.classList.toggle('recording', Boolean(rec));
    document.body.classList.toggle('paused', Boolean(rec?.pausedAt));
    if (!rec) $('clock').textContent = '0:00';
  };

  const loadVideo = () => {
    const src = video().video;
    if (player.getAttribute('src') !== src) {
      player.src = src;
      player.poster = src.replace(/\.mp4$/, '.jpg');
    }
  };

  const render = () => {
    renderSidebar();
    renderSlides();
    renderPrompter();
    renderTakes();
    renderTransport();
    loadVideo();
  };

  // ------------------------------------------------------------- waveform --

  const canvas = $('wave');
  const context = canvas.getContext('2d');
  let waveData = null;

  const drawWave = async () => {
    const take = chosenTake(state.videoId, state.slide);
    const width = (canvas.width = canvas.clientWidth * devicePixelRatio);
    const height = (canvas.height = 120 * devicePixelRatio);
    context.clearRect(0, 0, width, height);
    if (!take) {
      waveData = null;
      return;
    }
    const { samples } = await load(take.file);
    if (chosenTake(state.videoId, state.slide) !== take) return;
    const columns = Math.floor(width);
    const peaks = Wav.peaks(samples, columns);
    const x = (t) => (t / take.duration) * width;
    waveData = { take, x };
    context.fillStyle = 'rgba(15, 23, 42, 0.9)';
    context.fillRect(0, 0, width, height);
    const mid = height / 2;
    for (let c = 0; c < columns; c += 1) {
      const t = (c / columns) * take.duration;
      const inside = t >= take.trimStart && t <= take.trimEnd;
      context.fillStyle = inside ? '#38bdf8' : 'rgba(148, 163, 184, 0.35)';
      const h = Math.max(1, peaks[c] * mid * 0.95);
      context.fillRect(c, mid - h, 1, h * 2);
    }
    context.fillStyle = 'rgba(2, 6, 23, 0.55)';
    context.fillRect(0, 0, x(take.trimStart), height);
    context.fillRect(x(take.trimEnd), 0, width - x(take.trimEnd), height);
    context.fillStyle = '#fbbf24';
    [take.trimStart, take.trimEnd].forEach((t) => {
      context.fillRect(
        x(t) - 1.5 * devicePixelRatio,
        0,
        3 * devicePixelRatio,
        height
      );
    });
    if (playing?.position) {
      context.fillStyle = '#f8fafc';
      context.fillRect(x(playing.position()), 0, 2 * devicePixelRatio, height);
    }
  };

  let dragging = null;
  canvas.addEventListener('pointerdown', (event) => {
    if (!waveData) return;
    const px = event.offsetX * devicePixelRatio;
    const { take, x } = waveData;
    const near = (t) => Math.abs(x(t) - px) < 12 * devicePixelRatio;
    dragging = near(take.trimStart)
      ? 'trimStart'
      : near(take.trimEnd)
      ? 'trimEnd'
      : null;
    if (!dragging) {
      // A click elsewhere moves the closest edge there.
      const t = (px / canvas.width) * take.duration;
      dragging =
        Math.abs(t - take.trimStart) < Math.abs(t - take.trimEnd)
          ? 'trimStart'
          : 'trimEnd';
    }
    canvas.setPointerCapture(event.pointerId);
    moveEdge(event);
  });
  const moveEdge = (event) => {
    if (!dragging || !waveData) return;
    const { take } = waveData;
    const t = Math.max(
      0,
      Math.min(
        take.duration,
        (event.offsetX / canvas.clientWidth) * take.duration
      )
    );
    if (dragging === 'trimStart')
      take.trimStart = Math.min(t, take.trimEnd - 0.2);
    else take.trimEnd = Math.max(t, take.trimStart + 0.2);
    drawWave();
    renderSync();
  };
  canvas.addEventListener('pointermove', moveEdge);
  canvas.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = null;
    save();
    renderTakes();
  });

  // --------------------------------------------------------------- events --

  const toast = (message) => {
    const el = $('toast');
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => (el.hidden = true), 4000);
  };

  const selectVideo = async (id) => {
    if (rec) await stopRecording();
    stopPreview();
    stopPlayback();
    state.videoId = id;
    state.lang = byId.get(id).lang;
    state.slide = 0;
    sentenceIndex = 0;
    save();
    render();
  };

  document.querySelectorAll('.lang button').forEach((button) =>
    button.addEventListener('click', () => {
      const day = video().day;
      selectVideo(`d${pad(day)}-${button.dataset.lang}`);
    })
  );
  $('videos').addEventListener('click', (event) => {
    const item = event.target.closest('li[data-id]');
    if (item) selectVideo(item.dataset.id);
  });
  $('slides').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-slide]');
    if (button) goTo(Number(button.dataset.slide));
  });
  $('prompter').addEventListener('click', (event) => {
    const span = event.target.closest('.s');
    if (span) anchor(Number(span.dataset.i));
  });
  $('takes').addEventListener('click', (event) => {
    const item = event.target.closest('li[data-take]');
    if (!item) return;
    stopPlayback();
    slideTakes().chosen = item.dataset.take;
    save();
    render();
  });

  $('record').addEventListener('click', toggleRecord);
  $('pause').addEventListener('click', togglePause);
  $('next').addEventListener('click', () => goTo(state.slide + 1));
  $('prev').addEventListener('click', () => goTo(state.slide - 1));
  $('play-take').addEventListener('click', playTake);
  $('delete-take').addEventListener('click', deleteTake);
  $('auto-trim').addEventListener('click', autoTrim);
  $('preview-slide').addEventListener('click', () =>
    preview ? stopPreview() : startPreview(state.slide, state.slide)
  );
  $('preview-all').addEventListener('click', () =>
    preview ? stopPreview() : startPreview(0, video().slides.length - 1)
  );
  $('export').addEventListener('click', exportVideo);
  $('open-folder').addEventListener('click', () => api.openFolder('.'));

  $('pace').addEventListener('input', () => {
    state.pace = Number($('pace').value);
    $('pace-value').textContent = `${state.pace.toFixed(2).replace('.', ',')}×`;
    if (rec) {
      rec.anchorRef = sentences()[sentenceIndex].start;
      rec.anchorTime = elapsed();
    }
    save();
  });
  $('show-say').addEventListener('change', () => {
    state.showSay = $('show-say').checked;
    document.body.classList.toggle('hide-say', !state.showSay);
    save();
  });
  $('mic').addEventListener('change', async () => {
    state.mic = $('mic').value;
    save();
    if (!rec) {
      closeMic();
      await openMic();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.target.matches('input, select, textarea') || event.repeat) return;
    const keys = {
      r: toggleRecord,
      ' ': togglePause,
      ArrowRight: () => goTo(state.slide + 1),
      n: () => goTo(state.slide + 1),
      ArrowLeft: () => goTo(state.slide - 1),
      ArrowDown: () => anchor(sentenceIndex + 1),
      ArrowUp: () => anchor(sentenceIndex - 1),
      Delete: deleteTake,
      Enter: playTake,
      v: () =>
        preview ? stopPreview() : startPreview(state.slide, state.slide),
      Escape: () => {
        stopPlayback();
        stopPreview();
      },
    };
    const action = keys[event.key] ?? keys[event.key.toLowerCase()];
    if (!action) return;
    event.preventDefault();
    action();
  });

  window.addEventListener('resize', () => drawWave());

  // ----------------------------------------------------------------- start --

  (async () => {
    const saved = await api.loadState();
    if (saved && byId.has(saved.videoId)) state = { ...state, ...saved };
    $('pace').value = state.pace;
    $('pace-value').textContent = `${Number(state.pace)
      .toFixed(2)
      .replace('.', ',')}×`;
    $('show-say').checked = state.showSay;
    document.body.classList.toggle('hide-say', !state.showSay);
    render();
    requestAnimationFrame(meter);
    try {
      await openMic();
    } catch (error) {
      toast(`No pude abrir el micrófono: ${error.message}`);
    }
  })();
})();
