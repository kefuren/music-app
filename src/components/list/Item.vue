<template>
  <div class="list-item"
	 	:class="classes"
		@click="onClick"
	>
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from "vue"

const emit = defineEmits(['click']);

const props = defineProps({
	active: {
		type: Boolean,
		default: null
	},

	tabindex: [ String, Number ],
	to: [ String, Object ]
})

const classes = computed(() => 
	props.active === true 
	? ` w-item--active${ props.activeClass !== void 0 ? ` ${ props.activeClass }` : '' }`
	: ''
)

const onClick = (e) => {
	emit('click', e);
}

</script>

<style lang="scss" scoped>
.list-item {
  height: 35px;
  line-height: 35px;
  padding: 0 16px;
  margin-right: 8px;
  font-size: 13px;
  user-select: none;
  &:hover {
    background: #e6e6e6;
  }
}
.w {
	&-item--active {
		color: #C85A50;
		background: #e1e1e1;
	}
}
</style>