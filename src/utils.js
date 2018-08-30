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

export const mapValueToRange = (val, max, newRange) => {
  if (val > max) return max
  return round((val / max) * newRange)
}
