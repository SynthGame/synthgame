import Tone from "tone";
import { DEBUG_ENABLED } from "@/constants";

// define logging mechanism
const log = log => (false ? console.info(log) : log);

export default {
  state: {
    Tone: Tone,
    loop: undefined,
    toneLength: "2n"
  },
  init() {
    log("initializing all submodules before using");
    this.player.init();
    this.hatPlayer.init();
    this.clapPlayer.init();
    this.clap2Player.init();
    this.cymbalPlayer.init();
    this.labmycPlayer.init();
    this.noisePlayer.init();
    this.snarePlayer.init();
    this.gameOverPlayer.init();
    this.sweepPlayer.init();
    this.oscillator1.init();
    this.oscillator2.init();
    this.envelope.init();
    this.envelope2.init();
    this.lfo.init();
    this.filter.init();
    this.compressor.init();
    this.volume.init();

    const player = this.player.state.device;
    const hatPlayer = this.hatPlayer.state.device;
    const clapPlayer = this.clapPlayer.state.device;
    const clap2Player = this.clap2Player.state.device;
    const cymbalPlayer = this.cymbalPlayer.state.device;
    const labmycPlayer = this.labmycPlayer.state.device;
    const noisePlayer = this.noisePlayer.state.device;
    const snarePlayer = this.snarePlayer.state.device;
    const gameOverPlayer = this.gameOverPlayer.state.device;
    const sweepPlayer = this.sweepPlayer.state.device;
    const oscillator1 = this.oscillator1.state.device;
    const oscillator2 = this.oscillator2.state.device;
    const pitchShift = this.oscillator1.state.pitchShift;
    const envelope = this.envelope.state.device;
    const envelope2 = this.envelope2.state.device;
    const lfo = this.lfo.state.device;
    const filter = this.filter.state.device;
    const volume = this.volume.state.device;
    const compressor = this.compressor.state.device;

    log(`Created new general output for audio device`);
    const output = new Tone.Volume(6);
    log(`Connecting LFO to filter frequency`);
    lfo.connect(oscillator1.detune).start();
    log(`Connecting player to compressor`);
    player.connect(compressor);
    log(`Connecting hatPlayer to compressor`);
    hatPlayer.connect(compressor);
    log(`Connecting hatPlayer to compressor`);
    clapPlayer.connect(compressor);
    log(`Connecting hatPlayer to compressor`);
    clap2Player.connect(compressor);
    log(`Connecting hatPlayer to compressor`);
    cymbalPlayer.connect(compressor);
    log(`Connecting hatPlayer to compressor`);
    labmycPlayer.connect(compressor);
    log(`Connecting hatPlayer to compressor`);
    noisePlayer.connect(compressor);
    log(`Connecting hatPlayer to compressor`);
    snarePlayer.connect(compressor);
    log(`Connecting sweepPlayer to compressor`);
    sweepPlayer.connect(compressor);
    log(`Connecting gameOverPlayer to compressor`);
    gameOverPlayer.connect(compressor);
    log(`Adjusting volume to make an ok mix`);
    player.volume.value = 0;
    sweepPlayer.volume.value = 3;
    gameOverPlayer.volume.value = 0;
    oscillator1.volume.value = -24;
    oscillator2.volume.value = -24;
    lfo.connect(oscillator1.detune).start();
    this.connectEnvelope2("filterCutoff");
    log(
      `Chaining oscillator1 => pitch shift => envelope => filter => delay => reverb`
    );
    oscillator1.chain(pitchShift, filter, envelope, compressor, volume, output);
    oscillator2.connect(pitchShift);

    log(`Starting oscillator1`);
    oscillator1.start();

    return output;
  },
  setBpm(bpm) {
    log(`setting BPM length to: ${bpm}`);
    this.state.Tone.Transport.bpm.value = bpm;
    return this.state.Tone.Transport.bpm.value;
  },
  setMainLoop({ noteArray, subdivision }, callback) {
    log(`Setting new main loop`);
    try {
      this.state.loop.cancel();
      this.state.loop.dispose();
    } catch (e) {
      // console.log('setmainloop failed', e);
    }
    this.state.loop = new Tone.Sequence(callback, noteArray, subdivision);
    return this.state.loop;
  },
  stopMainLoop() {
    this.state.loop.stop();
    this.oscillator1.state.device.stop();
    this.oscillator2.state.device.stop();
  },
  startMainLoop() {
    this.state.loop.start();
    this.oscillator1.state.device.start();
    this.oscillator2.state.device.start();
  },
  start() {
    log(`starting Tone.js Transport`);
    return this.state.Tone.Transport.start();
  },
  connectChanelToMaster(channel) {
    log(`Connecting channel: ${channel} to master`);
    // disconnect outputs?
    return channel.toMaster();
  },
  connectLfo(destination) {
    log(`Connecting lfo to ${destination}`);
    // disconnect outputs?
    // console.log('destination in connectlfo audio.js', destination);
    if (destination === "oscsDetune") {
      this.lfo.state.device.disconnect();
      this.lfo.state.device.connect(this.oscillator1.state.device.detune);
      this.lfo.state.device.connect(this.oscillator2.state.device.detune);
      //   this.lfo.state.device.max = 1000
      // this.lfo.state.device.min = 0
    } else if (destination === "osc1Detune") {
      this.lfo.state.device.disconnect();
      this.lfo.state.device.connect(this.oscillator1.state.device.detune);
      //   this.lfo.state.device.max = 1000
      // this.lfo.state.device.min = 0
    } else if (destination === "filterCutoff") {
      this.lfo.state.device.disconnect();
      this.lfo.state.device.connect(this.filter.state.device.frequency);
      // this.lfo.state.device.max = 20000
      this.filter.state.device.disconnect();
      this.filter.state.device.connect(this.envelope.state.device);
      // this.lfo.state.device.min = 0
    } else if (destination === "env1decay") {
      this.lfo.state.device.disconnect();
      // console.log(this.filter.state.device.frequency);
      var decay = new Tone.Signal(this.envelope.state.device.decay, "time");
      // console.log(decay);
      this.lfo.state.device.connect(decay);
      // this.lfo.state.device.max = 1000
      // this.lfo.state.device.min = 0
    }
  },
  connectEnvelope2(destination) {
    log(`Connecting Envelope2 to ${destination}`);
    // disconnect outputs?
    // console.log('destination in connectenvelope2 audio.js', destination);
    if (destination === "oscsDetune") {
      this.envelope2.state.device.disconnect();
      this.envelope2.state.device.connect(this.oscillator1.state.device.detune);
      this.envelope2.state.device.connect(this.oscillator2.state.device.detune);
      // this.envelope2.state.device.max = 1000
    } else if (destination === "osc1Detune") {
      this.envelope2.state.device.disconnect();
      this.envelope2.state.device.connect(this.oscillator1.state.device.detune);
      // this.envelope2.state.device.max = 1000
    } else if (destination === "filterCutoff") {
      // console.log('destination === filterCutoff for envelope2');
      this.envelope2.state.device.disconnect();
      this.envelope2.state.device.connect(this.filter.state.device.frequency);
      // this.envelope2.state.device.max = 1000
      // this.envelope2.state.device.max = 20000
      // this.envelope2.state.device.exponent = 2
      // this.filter.state.device.connect(this.envelope.state.device);
    } else if (destination === "lfoFrequency") {
      this.envelope2.state.device.disconnect();
      this.envelope2.state.device.connect(this.lfo.state.device.frequency);
      // this.envelope2.state.device.max = 10
      // this.envelope2.state.device.max = 100
    }
  },
  playNote(shift, { noteLength, volume, time, glide, octaveOsc1, octaveOsc2 }) {
    log(`Playing shifted note: ${shift}`);
    if (Number.isInteger(shift)) {
      let scale = [
        "c",
        "c#",
        "d",
        "d#",
        "e",
        "f",
        "f#",
        "g",
        "g#",
        "a",
        "a#",
        "c",
        "c#"
      ];
      let freqArray = ["65", "131", "262", "523"];
      let startTime = this.oscillator1.state.device.now();
      let currentOctaveOsc1 = freqArray.findIndex(el => el == octaveOsc1);
      let currentOctaveOsc2 = freqArray.findIndex(el => el == octaveOsc2);
      this.oscillator1.state.device.frequency.setRampPoint(startTime);
      this.oscillator1.state.device.frequency.exponentialRampToValueAtTime(
        scale[shift] + (currentOctaveOsc1 + 2),
        startTime + (glide ? 0.2 : 0)
      );
      this.oscillator2.state.device.frequency.exponentialRampToValueAtTime(
        scale[shift] + (currentOctaveOsc2 + 2),
        startTime + (glide ? 0.2 : 0)
      );
      // if (volume !== undefined) this.volume.state.device.volume.setValueAtTime((volume ? 5 : 0), startTime + 0.03) // TODO: should only set volume for this note
      if (volume !== undefined)
        this.volume.state.device.volume.exponentialRampToValueAtTime(
          volume ? 5 : 0,
          startTime + 0.02
        ); // TODO: should only set volume for this note
      // this.oscillator1.state.pitchShift.pitch = shift
      // this.oscillator2.state.pitchShift.pitch = shift
    }

    // this.envelope.state.device.triggerRelease();
    this.envelope2.state.device.triggerAttackRelease(
      noteLength || this.state.toneLength
    );
    this.envelope.state.device.triggerAttackRelease(
      noteLength || this.state.toneLength
    ); // TODO: Error: timeConstant must be greater than 0
  },
  playKick() {
    log(`Playing kick`);
    return this.player.state.device.start();
  },
  playHat() {
    log(`Playing hat`);
    return this.hatPlayer.state.device.start();
  },
  playClap() {
    log(`Playing clap`);
    return this.clapPlayer.state.device.start();
  },
  playClap2() {
    log(`Playing clap2`);
    return this.clap2Player.state.device.start();
  },
  playCymbal() {
    log(`Playing cymbal`);
    return this.cymbalPlayer.state.device.start();
  },
  playLabmyc() {
    log(`Playing labmyc`);
    return this.labmycPlayer.state.device.start();
  },
  playNoise() {
    log(`Playing noise`);
    return this.noisePlayer.state.device.start();
  },
  playSnare() {
    log(`Playing snare`);
    return this.snarePlayer.state.device.start();
  },
  stopKick() {
    log(`Playing kick`);
    return this.player.state.device.stop();
  },
  playGameOver() {
    log(`Playing Game Over`);
    return this.gameOverPlayer.state.device.start();
  },
  playSweep() {
    log(`Playing sweep`);
    return this.sweepPlayer.state.device.start();
  },
  stopSweep() {
    log(`Stopping sweep`);
    return this.sweepPlayer.state.device.stop();
  },
  setSecondOscillatorPlayingTo(state) {
    if (state) this.oscillator2.state.device.start();
    else this.oscillator2.state.device.stop();
  },
  setToneLength(length) {
    log(`setting envelope tone length to: ${length}`);
    this.state.toneLength = length;
    return this.state.toneLength;
  },
  player: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing player with options: ${options}`);
      this.state.device = new Tone.Player({
        url: require("./assets/kick.wav")
      });
    }
  },
  hatPlayer: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing player with options: ${options}`);
      this.state.device = new Tone.Player({
        url: require("./assets/hat.mp3")
      });
    }
  },
  clapPlayer: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing player with options: ${options}`);
      this.state.device = new Tone.Player({
        url: require("./assets/clap.mp3")
      });
    }
  },
  clap2Player: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing player with options: ${options}`);
      this.state.device = new Tone.Player({
        url: require("./assets/clap2.mp3")
      });
    }
  },
  cymbalPlayer: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing player with options: ${options}`);
      this.state.device = new Tone.Player({
        url: require("./assets/cymbal.mp3")
      });
    }
  },
  labmycPlayer: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing player with options: ${options}`);
      this.state.device = new Tone.Player({
        url: require("./assets/labmyc.mp3")
      });
    }
  },
  noisePlayer: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing player with options: ${options}`);
      this.state.device = new Tone.Player({
        url: require("./assets/noise.mp3")
      });
    }
  },
  snarePlayer: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing player with options: ${options}`);
      this.state.device = new Tone.Player({
        url: require("./assets/snare.mp3")
      });
    }
  },
  gameOverPlayer: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing player with options: ${options}`);
      this.state.device = new Tone.Player({
        url: require("./assets/gameover.mp3")
      });
    }
  },
  sweepPlayer: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing player with options: ${options}`);
      this.state.device = new Tone.Player({
        url: require("./assets/sweeptats.wav")
      });
    }
  },
  oscillator1: {
    state: {
      device: undefined,
      pitchShift: undefined
    },
    init(options) {
      log(`Initializing oscillator1 with options: ${options}`);
      this.state.device = new Tone.Oscillator({
        type: "sawtooth",
        frequency: 131,
        detune: 0,
        phase: 0,
        ...options
      });
      log(`Initializing pitch shift effect on oscillator1`);
      this.state.pitchShift = new Tone.PitchShift({
        pitch: 0,
        windowSize: 0.03,
        delayTime: 0,
        feedback: 0
      });
    }
  },
  oscillator2: {
    state: {
      device: undefined,
      pitchShift: undefined
    },
    init(options) {
      log(`Initializing oscillator2 with options: ${options}`);
      this.state.device = new Tone.Oscillator({
        type: "sawtooth",
        frequency: 131,
        detune: 0,
        phase: 0,
        ...options
      });
      log(`Initializing pitch shift effect on oscillator2`);
      this.state.pitchShift = new Tone.PitchShift({
        pitch: 0,
        windowSize: 0.03,
        delayTime: 0,
        feedback: 0
      });
    }
  },
  envelope: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing envelope with options: ${options}`);
      this.state.device = new Tone.AmplitudeEnvelope({
        attack: 0.11,
        decay: 0.21,
        sustain: 0.09,
        release: 1.2,
        attackCurve: "linear",
        releaseCurve: "exponential",
        ...options
      });
    }
  },
  envelope2: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing envelope2 with options: ${options}`);
      this.state.device = new Tone.ScaledEnvelope({
        attack: 0.11,
        decay: 0.21,
        sustain: 0.09,
        release: 1.2,
        min: 0,
        max: 20000,
        attackCurve: "linear",
        releaseCurve: "exponential",
        ...options
      });
    }
  },
  lfo: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing LFO with options: ${options}`);
      this.state.device = new Tone.LFO(
        {
          // type: 'sine',
          min: 0,
          max: 0,
          // phase: 0,
          // frequency: 1,
          // amplitude: 0,
          ...options
        }
        // '4n', 0, 8000
      );
    }
  },
  compressor: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing Compressor with options: ${options}`);
      this.state.device = new Tone.Compressor({
        // ratio: 5,
        // threshold: -18,
        // release: 0.11,
        // attack: 0.003,
        // knee: 0
        ratio: 1.5,
        threshold: -18,
        release: 0.11,
        attack: 0.003,
        knee: 0
      });
    }
  },
  filter: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing filter with options: ${options}`);
      this.state.device = new Tone.Filter({
        type: "lowpass",
        frequency: 8000,
        rolloff: -12,
        Q: 1,
        gain: 1,
        ...options
      });
    }
  },
  volume: {
    state: {
      device: undefined
    },
    init(options) {
      log(`Initializing volume with options: ${options}`);
      this.state.device = new Tone.Volume();
    }
  }
};
