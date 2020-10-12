import { defineComponent } from 'vue'
import { onFontReady } from '../index'
import { mount } from './utils'

describe('# onFontReady', () => {
  let fonts: any
  beforeEach(() => {
    fonts = (document as any).fonts
    ;(document as any).fonts = {
      ready: undefined
    }
  })
  afterEach(() => {
    (document as any).fonts = fonts
  })
  it('should do nothing when documnt does not support fonts.ready', (done) => {
    const fn = jest.fn()
    const wrapper = mount(defineComponent({
      setup () {
        onFontReady(fn)
      }
    }))
    setTimeout(() => {
      expect(fn).not.toHaveBeenCalled()
      wrapper.unmount()
      done()
    }, 0)
  })
  it('should been called when documnt does not support fonts.ready', (done) => {
    const fn = jest.fn()
    ;(document as any).fonts = {
      ready: Promise.resolve()
    }
    const wrapper = mount(defineComponent({
      setup () {
        onFontReady(fn)
      }
    }))
    setTimeout(() => {
      expect(fn).toHaveBeenCalled()
      wrapper.unmount()
      done()
    }, 0)
  })
  it('should not be called when comoponent is unmounted', () => {
    const fn = jest.fn()
    let res: any
    ;(document as any).fonts = {
      ready: new Promise(resolve => { res = resolve })
    }
    const wrapper = mount(defineComponent({
      setup () {
        onFontReady(fn)
      }
    }))
    wrapper.unmount()
    res()
    setTimeout(() => {
      expect(fn).not.toHaveBeenCalled()
    }, 0)
  })
})