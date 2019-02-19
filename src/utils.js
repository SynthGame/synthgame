import round from 'lodash/round'
import store from '@/store'
import audio from '@/audio'

export const vuexSyncGen = (device, parameter, setCallback) => {
  return {
    [parameter]: {
      get: () => store.state.audioParameters[device][parameter],
      set: (value) => {
        parameter = parameter === 'typeOsc' ? parameter = 'type' : parameter;
        store.commit('setAudioParameter', {
          audio,
          device,
          parameter,
          value
        })
        store.commit('setUserAttemptParameters', {
          device,
          parameter,
          value
        })
        return setCallback ? setCallback(value) : value
      }
    }
  }
}

export const vuexSyncGenBpm = (parameter, setCallback) => {
  return {
    [parameter]: {
      get: () => store.state[parameter],
      set: (value) => {
        store.commit('setBpm', {
          parameter,
          value
        })
        return setCallback ? setCallback(value) : value
      }
    }
  }
}

export const mapValueToRange = (val, max, newMax) => {
  if (val > max) return newMax
  return round((val / max) * newMax)
}
