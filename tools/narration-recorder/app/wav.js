// Audio helpers: mono 16-bit WAV encoding, decoding and silence detection.
(() => {
  const toMono = (buffer) => {
    if (buffer.numberOfChannels === 1) return buffer.getChannelData(0).slice();
    const mono = new Float32Array(buffer.length);
    for (let c = 0; c < buffer.numberOfChannels; c += 1) {
      const data = buffer.getChannelData(c);
      for (let i = 0; i < data.length; i += 1) {
        mono[i] += data[i] / buffer.numberOfChannels;
      }
    }
    return mono;
  };

  const encode = (samples, sampleRate) => {
    const view = new DataView(new ArrayBuffer(44 + samples.length * 2));
    const text = (offset, value) =>
      [...value].forEach((ch, i) =>
        view.setUint8(offset + i, ch.charCodeAt(0))
      );
    text(0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    text(8, 'WAVEfmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    text(36, 'data');
    view.setUint32(40, samples.length * 2, true);
    for (let i = 0; i < samples.length; i += 1) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return view.buffer;
  };

  // Start and end, in seconds, of what is louder than the room noise, with a
  // little air on both sides.
  const voiceBounds = (samples, sampleRate) => {
    const windowSize = Math.round(sampleRate * 0.02);
    const levels = [];
    for (let i = 0; i < samples.length; i += windowSize) {
      let sum = 0;
      const end = Math.min(i + windowSize, samples.length);
      for (let j = i; j < end; j += 1) sum += samples[j] * samples[j];
      levels.push(Math.sqrt(sum / (end - i)));
    }
    const sorted = [...levels].sort((a, b) => a - b);
    const floor = sorted[Math.floor(sorted.length * 0.1)] ?? 0;
    const peak = sorted[sorted.length - 1] ?? 0;
    const threshold = Math.max(floor * 3, peak * 0.06, 0.004);
    const first = levels.findIndex((level) => level > threshold);
    const last =
      levels.length -
      1 -
      [...levels].reverse().findIndex((level) => level > threshold);
    const duration = samples.length / sampleRate;
    if (first === -1) return { start: 0, end: duration };
    const step = windowSize / sampleRate;
    return {
      start: Math.max(0, first * step - 0.15),
      end: Math.min(duration, (last + 1) * step + 0.25),
    };
  };

  // Peak per pixel column, for drawing.
  const peaks = (samples, columns) => {
    const out = new Float32Array(columns);
    const size = Math.max(1, Math.floor(samples.length / columns));
    for (let c = 0; c < columns; c += 1) {
      let max = 0;
      const start = c * size;
      for (let i = start; i < start + size && i < samples.length; i += 1) {
        const v = Math.abs(samples[i]);
        if (v > max) max = v;
      }
      out[c] = max;
    }
    return out;
  };

  window.Wav = { toMono, encode, voiceBounds, peaks };
})();
