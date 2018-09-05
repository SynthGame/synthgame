import round from 'lodash/round'
import debounce from 'lodash/debounce'
import store from '@/store'

export const vuexSyncGen = (device, parameter, setCallback, debounceInput = true) => {
  const setter = value => {
    store.commit('setAudioParameter', {
      device,
      parameter,
      value
    })
    return setCallback ? setCallback(value) : value
  }
  const debouncedSetter = debounce(setter, 30)
  return {
    [parameter]: {
      get: () => store.state.audioParameters[device][parameter],
      set: (val) => debounceInput ? debouncedSetter(val) : setter(val)
    }
  }
}

export const mapValueToRange = (val, max, newRange) => {
  if (val > max) return max
  return round((val / max) * newRange)
}
