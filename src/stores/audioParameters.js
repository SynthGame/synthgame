function audioParameters() {
    return {
        oscillator1: {
            frequency: '131',
            typeOsc: 'sawtooth',
            detune: 50
            // phase: 0
        },
        oscillator2: {
            frequency: '131',
            typeOsc: 'sawtooth',
            // detune: 50,
            volume: 50,
            // phase: 0
        },
        filter: {
            cutOffFreq: 70,
            type: 'lowpass',
            setQ: 0
            // gain: 50
        },
        envelope: {
            attack: 0,
            decay: 25,
            sustain: 100,
            release: 90
        },
        envelope2: {
            attack: 0,
            decay: 90,
            sustain: 0,
            release: 0,
            assign: 'filtercutoff',
            amount: 100
        },
        lfo: {
            frequency: 10,
            type: 'sine',
            amount: 0
        },
        router: {
            lfo: 'osc1Detune',
            envelope2: 'filterCutoff'
        }
    }
};

export default audioParameters;