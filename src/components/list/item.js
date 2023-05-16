import { h, defineComponent, provide, ref } from 'vue'

export default defineComponent({
  name: 'Item',
  setup(props, ctx) {
    return () => {
      return h('div', null, [ctx.slots.default?.()])
    }
  }
})