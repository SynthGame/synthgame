import round from 'lodash/round'
import store from '@/store'

export const vuexSyncGen = (device, parameter, setCallback) => {
  return {
    [parameter]: {
      get: () => store.state.audioParameters[device][parameter],
      set: (value) => {
        store.commit('setAudioParameter', {
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
